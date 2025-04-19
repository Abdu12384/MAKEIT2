"use client"

import type React from "react"

import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import { LayoutDashboard, Users, Store, FolderTree, Wallet, ChevronDown, Search } from "lucide-react"

export const Sidebar: React.FC = () => {
  const menuItems = [
    { id: "dashboard", path: "/_a/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "users", path: "/_a/users", label: "User Management", icon: <Users size={20} /> },
    { id: "vendors", path: "/_a/vendors", label: "Vendor Management", icon: <Store size={20} /> },
    { id: "categories", path: "/_a/categories", label: "Category Management", icon: <FolderTree size={20} /> },
    { id: "wallet", path: "/_a/wallet", label: "Wallet", icon: <Wallet size={20} /> },
  ]

  return (
    <div className="w-72 bg-gray-950 border-r border-gray-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-gray-800">
        <motion.div
          className="flex items-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex mr-3">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mr-1"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 mr-1"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
          </div>
          <NavLink
            to="/dashboard"
            className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent"
          >
            
          </NavLink>
        </motion.div>
      </div>

      <div className="mx-4 mt-4">
        <div className="flex items-center bg-gray-800/50 rounded-md px-3 py-2">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none w-full ml-2 focus:outline-none text-sm"
          />
        </div>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center w-full px-3 py-2.5 text-sm rounded-md transition-colors relative
                  ${
                    isActive
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-500 rounded-l-md"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      ></motion.span>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
            JD
          </div>
          <div className="ml-3 flex-1">
            <h4 className="text-sm font-medium">John Doe</h4>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
          <button className="text-gray-400 hover:text-gray-200">
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
