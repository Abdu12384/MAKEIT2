"use client"

import React from "react"
import { NavLink } from "react-router-dom"
import { 
  Home,
  Users, 
  ShoppingBag, 
  List, 
  Wallet, 
  LogOut 
} from "lucide-react"

export const AdminSidebar: React.FC = () => {
  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Users", path: "/admin/users", icon: <Users className="w-5 h-5" /> },
    { name: "Vendors", path: "/admin/vendors", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "Categories", path: "/admin/categories", icon: <List className="w-5 h-5" /> },
    // { name: "Wallet", path: "/admin/wallet", icon: <Wallet className="w-5 h-5" /> },
  ]

  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 p-3 rounded-lg transition-colors
                  ${isActive ? "bg-indigo-600" : "hover:bg-gray-700"}
                `}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto">
        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}