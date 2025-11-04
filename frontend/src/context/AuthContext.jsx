import React, { createContext, useContext, useState, useEffect } from 'react'
import { storage, bootstrapDefaults } from '../api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  useEffect(() => { bootstrapDefaults() }, [])

  const [user, setUser] = useState(() => storage.getUser() || null)

  const login = (email) => {
    const u = { email }
    storage.saveUser(u)
    setUser(u)
  }

  const logout = () => {
    storage.removeUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
