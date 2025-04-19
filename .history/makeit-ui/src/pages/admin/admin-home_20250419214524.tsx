"use client"

import type React from "react"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Sidebar } from "lucide-react"
import { Dashboard } from "./components/Dashboard"
import { UserManagement } from "./components/UserManagement"
import { VendorManagement } from "./components/VendorManagement"
import { CategoryManagement } from "./components/CategoryManagement"
import { Wallet } from "./components/Wallet"

export const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900 text-white">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/vendors" element={<VendorManagement />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/wallet" element={<Wallet />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
