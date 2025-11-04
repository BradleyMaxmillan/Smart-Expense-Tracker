import React from 'react'
import { NavLink } from 'react-router-dom'

const Item = ({to, children})=> <NavLink to={to} className={({isActive})=> isActive ? 'block px-4 py-2 bg-[color:var(--accent-blue)] text-white rounded':'block px-4 py-2 text-gray-700 rounded hover:bg-gray-100'}>{children}</NavLink>

export default function Sidebar(){
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 font-bold">Menu</div>
      <nav className="p-4 space-y-2">
        <Item to="/dashboard">Dashboard</Item>
        <Item to="/add">Add Transaction</Item>
        <Item to="/analytics">Analytics</Item>
        <Item to="/settings">Settings</Item>
      </nav>
    </aside>
  )
}
