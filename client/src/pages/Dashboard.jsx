import { useState, useEffect } from 'react'
import { api } from '../lib/api.js'
import './Dashboard.css'

function timeAgo(dt) {
  const d = new Date(dt + (dt.includes('Z') ? '' : 'Z'))
  const s = Math.floor((Date.now() - d) / 1000)
  if (s < 60) return `${s}s ago`
  if (s < 3600) return `${Math.floor(s/60)}m ago`
  if (s < 86400) return `${Math.floor(s/3600)}h ago`
  return `${Math.floor(s/86400)}d ago`
}

export default function Dashboard({ user, stickers, onNavigate }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [activity, setActivity] = useState([])
  const [hotTrades, setHotTrades] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getLeaderboard(),
      api.getActivity(),
      api.getTrades(user.id),
    ]).then(([lb, act, trades]) => {
      setLeaderboard(lb)
      setActivity(act)
      setHotTrades(trades.filter(t => t.isHotTrade))
    }).catch(console.error).finally(() => setLoading(false))
  }, [user.id])

  const myEntry = leaderboard.find(u => u.id === user.id)
  const total = stickers.length
  const owned = stickers.filter(s => s.status === 'owned' || s.status === 'duplicate').length
  const dupes = stickers.filter(s => s.status === 'duplicate').length
  const pct = total ? Math.round(owned/total*100) : 0

  if (loading) return <div className="page"><div className="loading-pulse">Loading...</div></div>

  return (
    <div className="page fade-in">
      {/* Hero stats */}
      <div className="dash-hero">
        <div className="dash-welcome">
          <div className="dash-av" style={{background: user.avatar_color}}>{user.username[0].toUpperCase()}</div>
          <div>
            <div className="dash-hi">Hey, {user.username}! 👋</div>
            <div className="dash-sub">WC 2026 sticker collection</div>
          </div>
        </div>
        <div className="dash-stats">
          <div className="dstat">
            <div className="dstat-num" style={{color:'var(--gold)'}}>{pct}%</div>
            <div className="dstat-lbl">Complete</div>
          </div>
          <div className="dstat">
            <div className="dstat-num" style={{color:'var(--green)'}}>{owned}</div>
            <div className="dstat-lbl">Owned</div>
          </div>
          <div className="dstat">
            <div className="dstat-num" style={{color:'var(--blue2)'}}>{dupes}</div>
            <div className="dstat-lbl">Duplicates</div>
          </div>
          <div className="dstat">
            <div className="dstat-num">{total - owned}</div>
            <div className="dstat-lbl">Missing</div>
          </div>
        </div>
        <div className="dash-progress-wrap">
          <div className="dash-progress-fill" style={{width: pct+'%'}} />
        </div>
        <div className="dash-actions">
          <button className="btn btn-primary" onClick={()=>onNavigate('collection')}>📖 Open album</button>
          <button className="btn btn-blue" onClick={()=>onNavigate('trades')}>🔄 Find trades</button>
        </div>
      </div>

      <div className="dash-grid">
        {/* Leaderboard */}
        <div>
          <div className="section-title">🏆 Leaderboard</div>
          <div className="lb-list">
            {leaderboard.map((u, i) => (
              <div key={u.id} className={'lb-row' + (u.id === user.id ? ' me' : '')}>
                <div className="lb-rank">{['🥇','🥈','🥉'][i] || i+1}</div>
                <div className="lb-av" style={{background:u.avatar_color}}>{u.username[0].toUpperCase()}</div>
                <div className="lb-info">
                  <div className="lb-name">{u.username}{u.id===user.id&&<span className="you-tag">YOU</span>}</div>
                  <div className="lb-bar-wrap">
                    <div className="lb-bar" style={{width:u.pct+'%', background: u.id===user.id?'var(--red)':'var(--blue2)'}} />
                  </div>
                </div>
                <div className="lb-pct">{u.pct}%</div>
              </div>
            ))}
            {leaderboard.length === 0 && <div className="empty-msg">No collectors yet</div>}
          </div>
        </div>

        <div>
          {/* Hot trades */}
          {hotTrades.length > 0 && <>
            <div className="section-title">🔥 Hot trades available</div>
            <div className="hot-trades">
              {hotTrades.map(t => (
                <div key={t.friend.id} className="hot-trade-card" onClick={()=>onNavigate('trades')}>
                  <div className="ht-avatars">
                    <div className="ht-av" style={{background:user.avatar_color}}>{user.username[0].toUpperCase()}</div>
                    <div className="ht-arrow">⇄</div>
                    <div className="ht-av" style={{background:t.friend.avatar_color}}>{t.friend.username[0].toUpperCase()}</div>
                  </div>
                  <div className="ht-info">
                    <div className="ht-name">{user.username} ↔ {t.friend.username}</div>
                    <div className="ht-detail">
                      You give {t.iCanGive.length} · Get {t.theyCanGive.length}
                    </div>
                  </div>
                  <span className="tag tag-gold">Trade!</span>
                </div>
              ))}
            </div>
          </>}

          {/* Activity */}
          <div className="section-title">📡 Recent activity</div>
          <div className="activity-list">
            {activity.slice(0,10).map(a => (
              <div key={a.id} className="activity-row">
                <div className="act-av" style={{background:a.avatar_color}}>{a.username[0].toUpperCase()}</div>
                <div className="act-info">
                  <div className="act-detail">{a.detail}</div>
                  <div className="act-time">{timeAgo(a.created_at)}</div>
                </div>
              </div>
            ))}
            {activity.length === 0 && <div className="empty-msg">No activity yet</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
