import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar(){
  const { user, logout } = useAuth()
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[color:var(--accent-green)] flex items-center justify-center text-white font-bold">E</div>
          <div className="font-bold text-xl">Expensio</div>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="header-link">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="header-link">Dashboard</Link>
              <button onClick={logout} className="btn-ghost">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-primary">Login</Link>
              <Link to="/register" className="btn-ghost">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
