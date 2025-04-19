"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Sideb } from "./components/Sidebar"
import { Dashboard } from "./components/Dashboard"
import { UserManagement } from "./components/UserManagement"
import { VendorManagement } from "./components/VendorManagement"
import { CategoryManagement } from "./components/CategoryManagement"
import { Wallet } from "./components/Wallet"

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "users":
        return <UserManagement />
      case "vendors":
        return <VendorManagement />
      case "categories":
        return <CategoryManagement />
      case "wallet":
        return <Wallet />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <motion.main 
        className="flex-1 overflow-y-auto"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.main>
    </div>
  )
}

export default App
