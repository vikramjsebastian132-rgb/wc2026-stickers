import { useState, useEffect } from 'react'
import { api } from '../lib/api.js'
import './Trades.css'

export default function Trades({ user }) {
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(null)
  const [exportMsg, setExportMsg] = useState('')

  useEffect(() => {
    api.getTrades(user.id)
      .then(setTrades)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user.id])

  const hotTrades = trades.filter(t => t.isHotTrade)
  const otherTrades = trades.filter(t => !t.isHotTrade)

  const generateTradeText = (trade) => {
    let txt = `⚽ WC 2026 Sticker Trade Proposal\n`
    txt += `${user.username} ↔ ${trade.friend.username}\n\n`
    if (trade.iCanGive.length) {
      txt += `📦 ${user.username} gives:\n`
      txt += trade.iCanGive.map(s=>`  #${s.number} ${s.player} (${s.team_name})`).join('\n')
      txt += '\n\n'
    }
    if (trade.theyCanGive.length) {
      txt += `📦 ${trade.friend.username} gives:\n`
      txt += trade.theyCanGive.map(s=>`  #${s.number} ${s.player} (${s.team_name})`).join('\n')
    }
    return txt
  }

  const copyTrade = async (trade) => {
    const txt = generateTradeText(trade)
    try {
      await navigator.clipboard.writeText(txt)
      setCopied(trade.friend.id)
      setTimeout(() => setCopied(null), 2000)
    } catch(e) {
      const ta = document.createElement('textarea')
      ta.value = txt
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta)
      setCopied(trade.friend.id); setTimeout(()=>setCopied(null), 2000)
    }
  }

  const handleExport = async () => {
    try {
      const data = await api.exportCollection(user.id)
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a'); a.href = url; a.download = `wc2026-${user.username}.json`
      a.click(); URL.revokeObjectURL(url)
      setExportMsg('✓ Exported!')
      setTimeout(() => setExportMsg(''), 2000)
    } catch(e) { setExportMsg('Error exporting') }
  }

  if (loading) return <div className="page"><div className="loading-pulse">Loading trades...</div></div>

  return (
    <div className="page fade-in">
      <div className="trades-header">
        <div>
          <h2 className="trades-title">🔄 Trade Hub</h2>
          <p className="trades-sub">Stickers you can swap with friends</p>
        </div>
        <button className="btn btn-secondary" onClick={handleExport}>
          {exportMsg || '⬇ Export my collection'}
        </button>
      </div>

      {trades.length === 0 && (
        <div className="trades-empty card">
          <div style={{fontSize:'48px'}}>👥</div>
          <div style={{fontSize:'16px',fontWeight:700,margin:'12px 0 6px'}}>No friends yet</div>
          <div style={{color:'var(--muted)',fontSize:'14px'}}>Other users will appear here once they sign up</div>
        </div>
      )}

      {hotTrades.length > 0 && (
        <>
          <div className="section-title">🔥 Hot trades — both sides benefit!</div>
          {hotTrades.map(t => <TradeCard key={t.friend.id} trade={t} user={user} onCopy={()=>copyTrade(t)} copied={copied===t.friend.id} />)}
        </>
      )}

      {otherTrades.length > 0 && (
        <>
          <div className="section-title">💬 Other friends</div>
          {otherTrades.map(t => <TradeCard key={t.friend.id} trade={t} user={user} onCopy={()=>copyTrade(t)} copied={copied===t.friend.id} />)}
        </>
      )}
    </div>
  )
}

function TradeCard({ trade, user, onCopy, copied }) {
  const { friend, theyCanGive, iCanGive, isHotTrade } = trade
  const [expanded, setExpanded] = useState(isHotTrade)

  return (
    <div className={'trade-card' + (isHotTrade ? ' hot' : '')}>
      <div className="tc-header" onClick={() => setExpanded(!expanded)}>
        <div className="tc-avatars">
          <div className="tc-av" style={{background:user.avatar_color}}>{user.username[0].toUpperCase()}</div>
          <div className="tc-arr">{isHotTrade?'🔥':'↔'}</div>
          <div className="tc-av" style={{background:friend.avatar_color}}>{friend.username[0].toUpperCase()}</div>
        </div>
        <div className="tc-info">
          <div className="tc-name">{friend.username}</div>
          <div className="tc-summary">
            {isHotTrade
              ? <>You give <strong>{iCanGive.length}</strong> · Get <strong>{theyCanGive.length}</strong></>
              : iCanGive.length && !theyCanGive.length
                ? `You can give ${iCanGive.length} (they have nothing you need)`
                : theyCanGive.length && !iCanGive.length
                  ? `They have ${theyCanGive.length} you need (you have nothing to offer yet)`
                  : 'No trades possible right now'
            }
          </div>
        </div>
        <div className="tc-badges">
          {isHotTrade && <span className="tag tag-gold">Trade!</span>}
          {theyCanGive.length>0&&<span className="tag tag-green">+{theyCanGive.length}</span>}
          <span className="tc-chevron">{expanded?'▲':'▼'}</span>
        </div>
      </div>

      {expanded && (
        <div className="tc-body">
          {iCanGive.length > 0 && (
            <div className="tc-section">
              <div className="tc-sec-label">📦 You give ({iCanGive.length} stickers)</div>
              <div className="tc-stickers">
                {iCanGive.map(s=>(
                  <div key={s.id} className={'tc-stk give'+(s.foil?' foil':'')}>
                    <span className="tc-snum">#{s.number}</span>
                    <span className="tc-sname">{s.player}</span>
                    <span className="tc-steam">{s.team_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {theyCanGive.length > 0 && (
            <div className="tc-section">
              <div className="tc-sec-label">🎁 You get ({theyCanGive.length} stickers)</div>
              <div className="tc-stickers">
                {theyCanGive.map(s=>(
                  <div key={s.id} className={'tc-stk get'+(s.foil?' foil':'')}>
                    <span className="tc-snum">#{s.number}</span>
                    <span className="tc-sname">{s.player}</span>
                    <span className="tc-steam">{s.team_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!iCanGive.length && !theyCanGive.length && (
            <div style={{color:'var(--muted)',fontSize:'13px',padding:'8px 0'}}>No possible trades with {friend.username} right now.</div>
          )}
          {(iCanGive.length > 0 || theyCanGive.length > 0) && (
            <button className="btn btn-primary copy-trade-btn" onClick={onCopy}>
              {copied ? '✓ Copied!' : '📋 Copy trade list for WhatsApp'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
