'use strict';
const express = require('express');
const cors = require('cors');
const path = require('path');
const { getDb, get, all, run, persist, initDb } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ── USERS ──────────────────────────────────────────────────
app.get('/api/users', async (req,res) => {
  const db = await getDb();
  res.json(all(db, 'SELECT id,username,avatar_color,created_at FROM users ORDER BY username'));
});

app.post('/api/users/login', async (req,res) => {
  const { username, avatar_color } = req.body;
  if (!username?.trim()) return res.status(400).json({error:'Username required'});
  const name = username.trim().slice(0,30);
  const db = await getDb();
  let user = get(db, 'SELECT * FROM users WHERE LOWER(username)=LOWER(?)', [name]);
  if (!user) {
    run(db, 'INSERT INTO users (username,avatar_color) VALUES (?,?)', [name, avatar_color||'#e63946']);
    user = get(db, 'SELECT * FROM users WHERE LOWER(username)=LOWER(?)', [name]);
    run(db, "INSERT INTO activity (user_id,action,detail) VALUES (?,?,?)", [user.id,'joined',`${user.username} joined the group!`]);
    persist();
  }
  res.json(user);
});

// ── STICKERS ──────────────────────────────────────────────
app.get('/api/stickers', async (req,res) => {
  const { userId } = req.query;
  const db = await getDb();
  const rows = userId
    ? all(db, `SELECT s.*,COALESCE(c.status,'missing') as status FROM stickers s LEFT JOIN collection c ON c.sticker_id=s.id AND c.user_id=? ORDER BY s.number`, [userId])
    : all(db, `SELECT *,'missing' as status FROM stickers ORDER BY number`);
  res.json(rows);
});

app.patch('/api/collection/:userId/:stickerId', async (req,res) => {
  const { userId, stickerId } = req.params;
  const { status } = req.body;
  const db = await getDb();
  if (status === 'missing') {
    run(db, 'DELETE FROM collection WHERE user_id=? AND sticker_id=?', [userId, stickerId]);
  } else {
    const existing = get(db, 'SELECT id FROM collection WHERE user_id=? AND sticker_id=?', [userId, stickerId]);
    if (existing) run(db, 'UPDATE collection SET status=?,updated_at=datetime("now") WHERE user_id=? AND sticker_id=?', [status, userId, stickerId]);
    else run(db, 'INSERT INTO collection (user_id,sticker_id,status) VALUES (?,?,?)', [userId, stickerId, status]);
  }
  const sticker = get(db, 'SELECT * FROM stickers WHERE id=?', [stickerId]);
  const user = get(db, 'SELECT * FROM users WHERE id=?', [userId]);
  if (sticker && user) {
    const verb = status==='missing'?'removed':status==='duplicate'?'marked duplicate':'added';
    run(db, "INSERT INTO activity (user_id,action,detail) VALUES (?,?,?)", [userId,'sticker',`${user.username} ${verb} #${sticker.number} ${sticker.player}`]);
  }
  persist();
  res.json({ok:true});
});

app.post('/api/collection/:userId/bulk', async (req,res) => {
  const { userId } = req.params;
  const { numbers, status='owned' } = req.body;
  if (!Array.isArray(numbers)) return res.status(400).json({error:'numbers must be array'});
  const db = await getDb();
  let count = 0;
  for (const num of numbers) {
    const s = get(db, 'SELECT id FROM stickers WHERE number=?', [Number(num)]);
    if (s) {
      const ex = get(db,'SELECT id FROM collection WHERE user_id=? AND sticker_id=?',[userId,s.id]);
      if (ex) run(db,'UPDATE collection SET status=? WHERE user_id=? AND sticker_id=?',[status,userId,s.id]);
      else run(db,'INSERT INTO collection (user_id,sticker_id,status) VALUES (?,?,?)',[userId,s.id,status]);
      count++;
    }
  }
  const user = get(db,'SELECT * FROM users WHERE id=?',[userId]);
  if (user) run(db,"INSERT INTO activity (user_id,action,detail) VALUES (?,?,?)",[userId,'bulk',`${user.username} bulk-added ${count} stickers`]);
  persist();
  res.json({ok:true,count});
});

// ── STATS ─────────────────────────────────────────────────
app.get('/api/stats/leaderboard', async (req,res) => {
  const db = await getDb();
  const total = get(db,'SELECT COUNT(*) as n FROM stickers').n;
  const users = all(db,'SELECT id,username,avatar_color FROM users');
  const board = users.map(u => {
    const owned = get(db,"SELECT COUNT(*) as n FROM collection WHERE user_id=? AND status IN ('owned','duplicate')",[u.id]).n;
    const dupes = get(db,"SELECT COUNT(*) as n FROM collection WHERE user_id=? AND status='duplicate'",[u.id]).n;
    return {...u, owned, duplicates:dupes, total, pct:Math.round(owned/total*100)};
  }).sort((a,b)=>b.pct-a.pct);
  res.json(board);
});

app.get('/api/stats/teams/:userId', async (req,res) => {
  const db = await getDb();
  res.json(all(db,`SELECT s.team,s.team_name,s.grp,COUNT(*) as total,SUM(CASE WHEN c.status IN ('owned','duplicate') THEN 1 ELSE 0 END) as owned FROM stickers s LEFT JOIN collection c ON c.sticker_id=s.id AND c.user_id=? GROUP BY s.team ORDER BY s.grp,s.team_name`,[req.params.userId]));
});

// ── TRADES ────────────────────────────────────────────────
app.get('/api/trades/:userId', async (req,res) => {
  const { userId } = req.params;
  const db = await getDb();
  const friends = all(db,'SELECT id,username,avatar_color FROM users WHERE id!=?',[userId]);
  const myMissing = all(db,`SELECT s.id,s.number,s.team,s.team_name,s.player,s.type,s.foil FROM stickers s WHERE s.id NOT IN (SELECT sticker_id FROM collection WHERE user_id=? AND status IN ('owned','duplicate'))`,[userId]);
  const myDupes = all(db,`SELECT s.id,s.number,s.team,s.team_name,s.player,s.type,s.foil FROM stickers s JOIN collection c ON c.sticker_id=s.id WHERE c.user_id=? AND c.status='duplicate'`,[userId]);
  const trades = friends.map(friend => {
    const theyCanGive = myMissing.length
      ? all(db,`SELECT s.id,s.number,s.team,s.team_name,s.player,s.foil FROM stickers s JOIN collection c ON c.sticker_id=s.id WHERE c.user_id=? AND c.status='duplicate' AND s.id IN (${myMissing.map(()=>'?').join(',')||'NULL'})`,[friend.id,...myMissing.map(s=>s.id)])
      : [];
    const iCanGive = myDupes.length
      ? all(db,`SELECT s.id,s.number,s.team,s.team_name,s.player,s.foil FROM stickers s WHERE s.id IN (${myDupes.map(()=>'?').join(',')||'NULL'}) AND s.id NOT IN (SELECT sticker_id FROM collection WHERE user_id=? AND status IN ('owned','duplicate'))`,[...myDupes.map(s=>s.id),friend.id])
      : [];
    return {friend, theyCanGive, iCanGive, isHotTrade: theyCanGive.length>0 && iCanGive.length>0};
  });
  res.json(trades);
});

// ── ACTIVITY ──────────────────────────────────────────────
app.get('/api/activity', async (req,res) => {
  const db = await getDb();
  res.json(all(db,`SELECT a.*,u.username,u.avatar_color FROM activity a JOIN users u ON u.id=a.user_id ORDER BY a.created_at DESC LIMIT 30`));
});

// ── EXPORT/IMPORT ─────────────────────────────────────────
app.get('/api/export/:userId', async (req,res) => {
  const db = await getDb();
  const user = get(db,'SELECT * FROM users WHERE id=?',[req.params.userId]);
  const collection = all(db,`SELECT s.number,s.team,s.player,c.status FROM collection c JOIN stickers s ON s.id=c.sticker_id WHERE c.user_id=? ORDER BY s.number`,[req.params.userId]);
  res.json({user:{username:user.username},collection,exported_at:new Date().toISOString()});
});

app.post('/api/import/:userId', async (req,res) => {
  const { collection } = req.body;
  if (!Array.isArray(collection)) return res.status(400).json({error:'Invalid format'});
  const db = await getDb(); let n=0;
  for (const item of collection) {
    const s = get(db,'SELECT id FROM stickers WHERE number=?',[item.number]);
    if (s) {
      const ex = get(db,'SELECT id FROM collection WHERE user_id=? AND sticker_id=?',[req.params.userId,s.id]);
      if (ex) run(db,'UPDATE collection SET status=? WHERE id=?',[item.status||'owned',ex.id]);
      else run(db,'INSERT INTO collection (user_id,sticker_id,status) VALUES (?,?,?)',[req.params.userId,s.id,item.status||'owned']);
      n++;
    }
  }
  persist();
  res.json({ok:true,count:n});
});

// ── SERVE REACT APP ───────────────────────────────────────
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

const PORT = process.env.PORT || 3001;
initDb().then(() => {
  app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
});
