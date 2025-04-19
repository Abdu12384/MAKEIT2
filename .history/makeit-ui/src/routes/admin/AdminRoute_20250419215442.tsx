import { CategoryManagement } from "@/components/admin/categoryManagement/CategoryManagement"
import { Dashboard } from "@/components/admin/dashboard/Dashboard"
import { AdminLoginPage } from "@/components/admin/login/Login"
import { UserManagement } from "@/components/admin/userManagement/UserMangement"
import { VendorManagement } from "@/components/admin/vendorMangement/VendorMangement"
// import { Wallet } from "@/components/admin/wallet/Wallet" // Uncomment when you have this component
import { AdminLayout } from "@/pages/admin/admin-home"
import { Routes, Route, Navigate } from "react-router-dom"

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage />} />
      
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="vendors" element={<VendorManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        {/* <Route path="wallet" element={<Wallet />} /> */}
        
        {/* Redirect any other paths to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
      
      {/* Redirect from the root to admin dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}