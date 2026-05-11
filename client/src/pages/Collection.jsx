import { useState, useMemo, useRef } from 'react'
import './Collection.css'

const FILTERS = ['all','owned','duplicate','missing']
const STATUS_CYCLE = { missing:'owned', owned:'duplicate', duplicate:'missing' }
const STATUS_LABEL = { owned:'✓ Owned', duplicate:'★ Dupe', missing:'— Missing' }
const STATUS_COLOR = { owned:'var(--green)', duplicate:'var(--gold)', missing:'var(--muted)' }

export default function Collection({ user, stickers, loading, onToggle, onBulkAdd }) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [groupFilter, setGroupFilter] = useState('all')
  const [bulkText, setBulkText] = useState('')
  const [bulkOpen, setBulkOpen] = useState(false)
  const [bulkLoading, setBulkLoading] = useState(false)
  const [bulkResult, setBulkResult] = useState(null)
  const [quickNum, setQuickNum] = useState('')
  const quickRef = useRef()

  // Group stickers by team
  const byTeam = useMemo(() => {
    const groups = {}
    for (const s of stickers) {
      const key = s.team
      if (!groups[key]) groups[key] = { team: s.team, teamName: s.team_name, group: s.grp, stickers: [] }
      groups[key].stickers.push(s)
    }
    return Object.values(groups).sort((a,b) => {
      if (a.group === 'intro') return -1
      if (b.group === 'intro') return 1
      return a.group.localeCompare(b.group) || a.teamName.localeCompare(b.teamName)
    })
  }, [stickers])

  const groups = useMemo(() => [...new Set(byTeam.filter(t=>t.group!=='intro').map(t=>t.group))].sort(), [byTeam])

  const filteredTeams = useMemo(() => {
    return byTeam.filter(t => {
      if (groupFilter !== 'all' && t.group !== groupFilter && !(groupFilter==='intro'&&t.group==='intro')) return false
      if (search && !t.teamName.toLowerCase().includes(search.toLowerCase()) && !t.team.toLowerCase().includes(search.toLowerCase())) return false
      if (filter === 'all') return true
      return t.stickers.some(s => s.status === filter || (filter==='owned' && s.status==='duplicate'))
    })
  }, [byTeam, filter, search, groupFilter])

  const totalOwned = stickers.filter(s=>s.status==='owned'||s.status==='duplicate').length
  const totalDupes = stickers.filter(s=>s.status==='duplicate').length

  const handleBulk = async () => {
    const nums = bulkText.split(/[\s,;\n]+/).map(n=>parseInt(n)).filter(n=>!isNaN(n)&&n>0)
    if (!nums.length) return
    setBulkLoading(true); setBulkResult(null)
    try {
      const r = await onBulkAdd(nums)
      setBulkResult(`Added ${nums.length} stickers!`)
      setBulkText('')
    } catch(e) { setBulkResult('Error adding stickers') }
    finally { setBulkLoading(false) }
  }

  const handleQuick = (e) => {
    if (e.key === 'Enter') {
      const n = parseInt(quickNum)
      if (!isNaN(n)) {
        const sticker = stickers.find(s => s.number === n)
        if (sticker) { onToggle(sticker.id, sticker.status); setQuickNum('') }
      }
    }
  }

  if (loading) return <div className="page"><div className="loading-pulse">Loading album...</div></div>

  return (
    <div className="page fade-in">
      {/* Stats bar */}
      <div className="coll-statsbar">
        <div className="cstat"><span className="cstat-num green">{totalOwned}</span><span className="cstat-lbl">Owned</span></div>
        <div className="cstat"><span className="cstat-num gold">{totalDupes}</span><span className="cstat-lbl">Dupes</span></div>
        <div className="cstat"><span className="cstat-num">{stickers.length - totalOwned}</span><span className="cstat-lbl">Missing</span></div>
        <div className="cstat"><span className="cstat-num blue">{stickers.length ? Math.round(totalOwned/stickers.length*100) : 0}%</span><span className="cstat-lbl">Complete</span></div>
      </div>

      {/* Controls */}
      <div className="coll-controls">
        <input className="coll-search" type="text" placeholder="Search team…" value={search} onChange={e=>setSearch(e.target.value)} />
        <select className="coll-select" value={groupFilter} onChange={e=>setGroupFilter(e.target.value)}>
          <option value="all">All groups</option>
          <option value="intro">Intro</option>
          {groups.map(g=><option key={g} value={g}>Group {g}</option>)}
        </select>
        <div className="filter-tabs">
          {FILTERS.map(f=><button key={f} className={'filter-tab'+(filter===f?' active':'')} onClick={()=>setFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>)}
        </div>
      </div>

      {/* Quick entry + bulk */}
      <div className="quick-row">
        <div className="quick-entry">
          <span className="quick-label"># Quick add</span>
          <input ref={quickRef} type="number" className="quick-input" placeholder="e.g. 42" value={quickNum}
            onChange={e=>setQuickNum(e.target.value)} onKeyDown={handleQuick} min={1} />
          <span className="quick-hint">↵ Enter</span>
        </div>
        <button className="btn btn-secondary" onClick={()=>setBulkOpen(!bulkOpen)}>📋 Bulk import</button>
      </div>

      {bulkOpen && (
        <div className="bulk-box card">
          <div className="bulk-title">Paste sticker numbers</div>
          <div className="bulk-sub">Separate by spaces, commas, or new lines. e.g. "1 5 23 47 88"</div>
          <textarea className="bulk-textarea" value={bulkText} onChange={e=>setBulkText(e.target.value)}
            placeholder="1 2 5 12 34 67 89 102..." rows={3} />
          {bulkResult && <div className="bulk-result">{bulkResult}</div>}
          <div className="bulk-actions">
            <button className="btn btn-primary" onClick={handleBulk} disabled={bulkLoading}>
              {bulkLoading ? 'Adding...' : `Add ${bulkText.split(/[\s,;\n]+/).filter(n=>n&&!isNaN(parseInt(n))).length} stickers`}
            </button>
            <button className="btn btn-secondary" onClick={()=>setBulkOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Album grid */}
      {filteredTeams.map(team => {
        const shown = filter === 'all' ? team.stickers
          : team.stickers.filter(s => filter==='owned' ? s.status==='owned'||s.status==='duplicate' : s.status===filter)
        if (!shown.length) return null
        const ownedCount = team.stickers.filter(s=>s.status==='owned'||s.status==='duplicate').length
        const pct = Math.round(ownedCount / team.stickers.length * 100)
        return (
          <div key={team.team} className="team-section">
            <div className="team-header">
              <div className="team-hname">{team.teamName}</div>
              {team.group !== 'intro' && <div className="team-hgroup">Group {team.group}</div>}
              <div className="team-hprog">
                <div className="team-hbar-wrap">
                  <div className="team-hbar" style={{width:pct+'%', background:pct===100?'var(--green)':pct>50?'var(--gold)':'var(--blue2)'}} />
                </div>
                <span className="team-hpct">{ownedCount}/{team.stickers.length}</span>
              </div>
            </div>
            <div className="sticker-grid">
              {shown.map(s => (
                <div key={s.id}
                  className={'sticker-card'+(s.status!=='missing'?' have':'')+(s.foil?' foil':'')+(s.status==='duplicate'?' dupe':'')}
                  onClick={()=>onToggle(s.id, s.status)}
                  title={`#${s.number} ${s.player} — click to toggle`}
                >
                  <div className="stk-num">#{s.number}</div>
                  {s.foil && <div className="stk-foil-badge">✦</div>}
                  <div className="stk-name">{s.player}</div>
                  <div className="stk-type">{s.type}</div>
                  <div className="stk-status" style={{color:STATUS_COLOR[s.status]||'var(--muted)'}}>
                    {STATUS_LABEL[s.status]||'—'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
      {filteredTeams.length === 0 && <div className="empty-msg" style={{padding:'40px',textAlign:'center',color:'var(--muted)'}}>No stickers match your filter</div>}
    </div>
  )
}
