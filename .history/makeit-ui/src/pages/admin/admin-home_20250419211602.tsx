"use client"

import { motion } from "framer-motion"
import { Routes, Route, Navigate } from "react-router-dom"
import { AdminSidebar } from "@/components/admin/sidebar/Sidebar"
import { Dashboard } from "@/components/admin/dashboard/Dashboard"
import { UserManagement } from "@/components/admin/userManagement/UserMangement"
import { VendorManagement } from "@/components/admin/vendorMangement/VendorMangement"
import { CategoryManagement } from "@/components/admin/categoryManagement/CategoryManagement"

export const AdminHome: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <AdminSideb />
      <motion.main 
        className="flex-1 overflow-y-auto p-4"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.3 }}
      >
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="vendors" element={<VendorManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </motion.main>
    </div>
  )
}
