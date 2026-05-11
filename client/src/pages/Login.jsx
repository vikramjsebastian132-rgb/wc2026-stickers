import { useState } from 'react'
import { api } from '../lib/api.js'
import './Login.css'

const COLORS = [
  '#e63946','#f5c842','#1a6fd4','#00c878',
  '#ff6b35','#a566ff','#00b4d8','#ff4d8d',
]

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [existingUsers, setExistingUsers] = useState([])
  const [showExisting, setShowExisting] = useState(false)

  const loadExisting = async () => {
    try { setExistingUsers(await api.getUsers()); setShowExisting(true) } catch(e) {}
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim()) { setErr('Enter your name!'); return }
    setLoading(true); setErr('')
    try {
      const user = await api.login(username.trim(), color)
      onLogin(user)
    } catch(e) { setErr('Could not connect to server. Is it running?') }
    finally { setLoading(false) }
  }

  const quickLogin = async (u) => {
    setLoading(true)
    try { onLogin(await api.login(u.username, u.avatar_color)) }
    catch(e) { setErr('Error') }
    finally { setLoading(false) }
  }

  return (
    <div className="login-page">
      <div className="login-bg-stripes" />
      <div className="login-box">
        <div className="login-hero">
          <div className="login-trophy">🏆</div>
          <h1>WC 2026</h1>
          <p>Sticker Tracker</p>
          <div className="login-balls">⚽ ⚽ ⚽</div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>Your name</label>
          <input
            type="text" value={username} maxLength={30}
            onChange={e=>setUsername(e.target.value)}
            placeholder="e.g. Carlos" autoFocus autoComplete="off"
          />
          <label>Pick a color</label>
          <div className="color-picker">
            {COLORS.map(c => (
              <button key={c} type="button"
                className={'color-dot' + (c===color?' sel':'')}
                style={{background:c}}
                onClick={()=>setColor(c)}
              >
                {username ? username[0].toUpperCase() : '?'}
              </button>
            ))}
          </div>
          {err && <div className="login-err">⚠️ {err}</div>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Joining...' : 'Join the group ⚽'}
          </button>
        </form>

        <button className="switch-user-btn" onClick={loadExisting}>
          Switch user / rejoin
        </button>

        {showExisting && existingUsers.length > 0 && (
          <div className="existing-users">
            <div className="existing-label">Existing users</div>
            {existingUsers.map(u => (
              <button key={u.id} className="existing-user-btn" onClick={()=>quickLogin(u)}>
                <div className="eu-av" style={{background:u.avatar_color}}>{u.username[0].toUpperCase()}</div>
                <span>{u.username}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
