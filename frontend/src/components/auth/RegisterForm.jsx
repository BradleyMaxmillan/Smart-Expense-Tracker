import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterForm(){
  const [email, setEmail] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    // quick register -> log in
    login(email)
    nav('/dashboard')
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-2">Create an account</h2>
      <p className="text-sm text-gray-500 mb-4">Start tracking your expenses</p>
      <form onSubmit={submit} className="space-y-3">
        <input required placeholder="Full name" className="w-full p-3 border rounded" />
        <input required placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 border rounded" />
        <input required type="password" placeholder="Password" className="w-full p-3 border rounded" />
        <div className="flex items-center justify-between">
          <Link to="/login" className="text-sm text-gray-500">Already have an account?</Link>
          <button className="px-4 py-2 bg-[color:var(--accent-green)] text-white rounded">Register</button>
        </div>
      </form>
    </div>
  )
}
