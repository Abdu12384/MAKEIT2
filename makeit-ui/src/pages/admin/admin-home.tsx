

import type React from "react"
import { motion } from "framer-motion"
import { Outlet } from "react-router-dom"
import { Sidebar } from "@/components/admin/sidebar/Sidebar"

export const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <motion.main
        className="flex-1 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
    </div>
  )
}