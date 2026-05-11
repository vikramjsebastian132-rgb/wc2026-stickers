import { useState, useEffect, useCallback } from 'react'
import { api } from './lib/api.js'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Collection from './pages/Collection.jsx'
import Trades from './pages/Trades.jsx'
import './App.css'

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wc2026_user')) } catch { return null }
  })
  const [page, setPage] = useState('dashboard')
  const [stickers, setStickers] = useState([])
  const [loading, setLoading] = useState(false)

  const loadStickers = useCallback(async (uid) => {
    if (!uid) return
    setLoading(true)
    try {
      const data = await api.getStickers(uid)
      setStickers(data)
    } catch(e) { console.error(e) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    if (user) loadStickers(user.id)
  }, [user, loadStickers])

  const handleLogin = (u) => {
    localStorage.setItem('wc2026_user', JSON.stringify(u))
    setUser(u)
  }
  const handleLogout = () => {
    localStorage.removeItem('wc2026_user')
    setUser(null)
    setStickers([])
    setPage('dashboard')
  }

  const handleStickerToggle = async (stickerId, currentStatus) => {
    const next = currentStatus === 'missing' ? 'owned' : currentStatus === 'owned' ? 'duplicate' : 'missing'
    // Optimistic update
    setStickers(prev => prev.map(s => s.id === stickerId ? { ...s, status: next } : s))
    try {
      await api.setStatus(user.id, stickerId, next)
    } catch(e) {
      // Revert
      setStickers(prev => prev.map(s => s.id === stickerId ? { ...s, status: currentStatus } : s))
    }
  }

  if (!user) return <Login onLogin={handleLogin} />

  return (
    <div className="app">
      <nav className="topnav">
        <div className="nav-brand">⚽ WC <span>2026</span></div>
        <div className="nav-tabs">
          <button className={page==='dashboard'?'active':''} onClick={()=>setPage('dashboard')}>🏠 Home</button>
          <button className={page==='collection'?'active':''} onClick={()=>setPage('collection')}>📖 Album</button>
          <button className={page==='trades'?'active':''} onClick={()=>setPage('trades')}>🔄 Trades</button>
        </div>
        <div className="nav-user">
          <div className="nav-avatar" style={{background:user.avatar_color}}>{user.username[0].toUpperCase()}</div>
          <span className="nav-username">{user.username}</span>
          <button className="logout-btn" onClick={handleLogout} title="Switch user">↩</button>
        </div>
      </nav>
      <main className="main-content">
        {page === 'dashboard' && <Dashboard user={user} stickers={stickers} onNavigate={setPage} />}
        {page === 'collection' && <Collection user={user} stickers={stickers} loading={loading} onToggle={handleStickerToggle} onBulkAdd={(nums)=>api.bulkAdd(user.id,nums).then(()=>loadStickers(user.id))} />}
        {page === 'trades' && <Trades user={user} />}
      </main>
    </div>
  )
}
