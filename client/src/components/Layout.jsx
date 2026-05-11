import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../App'
import './Layout.css'

export default function Layout() {
  const { user, logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="brand-icon">⚽</span>
          <span className="brand-text">WC <strong>2026</strong></span>
        </div>

        <div className="navbar-links">
          <NavLink to="/" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            🏆 Home
          </NavLink>
          <NavLink to="/collection" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            📖 Collection
          </NavLink>
          <NavLink to="/trades" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            🔄 Trades
          </NavLink>
        </div>

        <div className="navbar-right">
          <div className="user-pill" style={{ '--user-color': user.color }}>
            <span className="user-dot" />
            <span className="user-name">@{user.username}</span>
          </div>
          <button className="btn btn-ghost btn-sm hide-mobile" onClick={handleLogout}>Sign out</button>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
