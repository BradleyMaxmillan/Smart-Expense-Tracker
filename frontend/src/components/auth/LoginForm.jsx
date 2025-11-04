import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginForm(){
  const [email, setEmail] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    login(email)
    nav('/dashboard')
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
      <p className="text-sm text-gray-500 mb-4">Sign in to continue to Expensio</p>
      <form onSubmit={submit} className="space-y-3">
        <input required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 border rounded" />
        <input required type="password" placeholder="Password" className="w-full p-3 border rounded" />
        <div className="flex items-center justify-between">
          <Link to="/register" className="text-sm text-gray-500">Don't have an account?</Link>
          <button className="px-4 py-2 bg-[color:var(--accent-blue)] text-white rounded">Login</button>
        </div>
      </form>
    </div>
  )
}
