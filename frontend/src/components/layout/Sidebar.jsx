import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, BarChart3, Settings } from 'lucide-react'

const Item = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
      }`
    }
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </NavLink>
)

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r shadow-sm">
      {/* Header / Logo */}
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-blue-600 tracking-wide">SmartTrack</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Item to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <Item to="/add" icon={PlusCircle} label="Add Transaction" />
        <Item to="/analytics" icon={BarChart3} label="Analytics" />
        <Item to="/settings" icon={Settings} label="Settings" />
      </nav>

      {/* Footer / Version or small note */}
      <div className="p-4 border-t text-xs text-gray-400 text-center">
        © 2025 Smart Expense Tracker
      </div>
    </aside>
  )
}
