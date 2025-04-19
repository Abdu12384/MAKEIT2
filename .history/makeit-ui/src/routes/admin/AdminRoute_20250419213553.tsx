import { Dashboard } from "@/components/admin/dashboard/Dashboard"
import { AdminLoginPage } from "@/components/admin/login/Login"
import { UserManagement } from "@/components/admin/userManagement/UserMangement"
import { AdminHome } from "@/pages/admin/admin-home"
import { Routes, Route, Navigate } from "react-router-dom"




export const  AdminRoutes = () =>{
   
  return (
     <Routes> 
       <Route path="/login" element={<AdminLoginPage/>}/>
       <Route path="/home" element={<AdminHome/>}/>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/vendors" element={<VendorManagement />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/wallet" element={<Wallet />} />

     </Routes>
         
        
         
     
  )
}