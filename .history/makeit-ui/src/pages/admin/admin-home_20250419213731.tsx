"use client"

import type React from "react"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Sidebar } from "lucide-react"
import { Dashboard } from "@/components/admin/dashboard/Dashboard"
import { UserManagement } from "@/components/admin/userManagement/UserMangement"
import { VendorManagement } from "@/components/admin/vendorMangement/VendorMangement"
import { CategoryManagement } from "@/components/admin/categoryManagement/CategoryManagement"
import { Wallet } from "lucide-react"

export const AdminHome: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900 text-white">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
            <Dashboard />
            <UserManagement />
            <VendorManagement />
            <CategoryManagement


        </main>
      </div>
    </Router>
  )
}


