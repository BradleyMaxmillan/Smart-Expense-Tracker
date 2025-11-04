import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Settings(){
  const { user, logout } = useAuth()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="card">
        <h3 className="font-semibold">Profile</h3>
        <p className="mt-2">Email: <strong>{user?.email || 'Guest'}</strong></p>
        <div className="mt-4">
          {user ? <button onClick={logout} className="px-3 py-2 bg-red-500 text-white rounded">Logout</button> : <p className="text-sm text-gray-500">Not logged in</p>}
        </div>
      </div>
    </div>
  )
}
