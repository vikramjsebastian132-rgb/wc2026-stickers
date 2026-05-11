'use strict';
const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');
const { buildStickers } = require('./stickerData');

const DATA_DIR = path.join(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const DB_PATH = path.join(DATA_DIR, 'wc2026.db');

let _db = null;

async function getDb() {
  if (_db) return _db;
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    _db = new SQL.Database(fs.readFileSync(DB_PATH));
  } else {
    _db = new SQL.Database();
  }
  return _db;
}

function persist() {
  if (_db) fs.writeFileSync(DB_PATH, Buffer.from(_db.export()));
}

// Helper: run a statement
function run(db, sql, params=[]) {
  db.run(sql, params);
}

// Helper: get one row
function get(db, sql, params=[]) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  if (stmt.step()) { const r = stmt.getAsObject(); stmt.free(); return r; }
  stmt.free(); return null;
}

// Helper: get all rows
function all(db, sql, params=[]) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

async function initDb() {
  const db = await getDb();

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    avatar_color TEXT NOT NULL DEFAULT '#e63946',
    created_at TEXT DEFAULT (datetime('now'))
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS stickers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number INTEGER UNIQUE NOT NULL,
    team TEXT NOT NULL,
    team_name TEXT NOT NULL,
    grp TEXT NOT NULL,
    player TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'normal',
    foil INTEGER NOT NULL DEFAULT 0
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS collection (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    sticker_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'owned',
    updated_at TEXT DEFAULT (datetime('now')),
    UNIQUE(user_id, sticker_id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    action TEXT NOT NULL,
    detail TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  // Seed stickers
  const count = get(db, 'SELECT COUNT(*) as n FROM stickers').n;
  if (count === 0) {
    const stickers = buildStickers();
    for (const s of stickers) {
      run(db, 'INSERT INTO stickers (number,team,team_name,grp,player,type,foil) VALUES (?,?,?,?,?,?,?)',
        [s.number, s.team, s.teamName, s.group, s.player, s.type, s.foil ? 1 : 0]);
    }
    console.log(`Seeded ${stickers.length} stickers`);
  }

  // Demo user
  let demo = get(db, "SELECT * FROM users WHERE username='demo'");
  if (!demo) {
    run(db, "INSERT INTO users (username,avatar_color) VALUES ('demo','#e63946')");
    demo = get(db, "SELECT * FROM users WHERE username='demo'");
    const allStickers = all(db, 'SELECT id FROM stickers');
    const shuffled = allStickers.sort(()=>Math.random()-.5);
    const ownCount = Math.floor(allStickers.length * 0.25);
    const dupCount  = Math.floor(allStickers.length * 0.05);
    for (const s of shuffled.slice(0, ownCount)) run(db, 'INSERT INTO collection (user_id,sticker_id,status) VALUES (?,?,?)', [demo.id,''+s.id,'owned']);
    for (const s of shuffled.slice(ownCount, ownCount+dupCount)) run(db, 'INSERT INTO collection (user_id,sticker_id,status) VALUES (?,?,?)', [demo.id,''+s.id,'duplicate']);
    run(db, "INSERT INTO activity (user_id,action,detail) VALUES (?,?,?)", [demo.id,'joined','demo joined the group!']);
    console.log('Demo user created with ~30% collection');
  }

  persist();
  console.log('DB ready');
}

module.exports = { getDb, get, all, run, persist, initDb };
