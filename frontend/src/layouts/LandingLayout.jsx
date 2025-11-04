import React from 'react'
import Navbar from '../components/layout/Navbar'

export default function LandingLayout({ children }){
  return (
    <div>
      <Navbar />
      <main className="container py-8">{children}</main>
      <footer className="text-center py-6 text-sm text-gray-500">© Expensio</footer>
    </div>
  )
}
