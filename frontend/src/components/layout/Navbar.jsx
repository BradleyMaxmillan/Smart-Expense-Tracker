import React from "react";
import { NavLink } from "react-router-dom";
import { User, Plus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md border-b flex justify-between items-center px-6 py-3 z-50">
      {/* Left side: navigation links */}
      <div className="flex space-x-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-sm font-medium ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-600"
            } hover:text-blue-600`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `text-sm font-medium ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-600"
            } hover:text-blue-600`
          }
        >
          Analytics
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `text-sm font-medium flex items-center space-x-1 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-600"
            } hover:text-blue-600`
          }
        >
          <User className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </div>

      {/* Right side: Add Transaction */}
      <NavLink
        to="/add"
        className="p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
      >
        <Plus className="w-5 h-5" />
      </NavLink>
    </nav>
  );
}
