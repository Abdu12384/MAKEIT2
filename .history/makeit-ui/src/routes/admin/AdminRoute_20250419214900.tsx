import { CategoryManagement } from "@/components/admin/categoryManagement/CategoryManagement"
import { Dashboard } from "@/components/admin/dashboard/Dashboard"
import { AdminLoginPage } from "@/components/admin/login/Login"
import { UserManagement } from "@/components/admin/userManagement/UserMangement"
import { VendorManagement } from "@/components/admin/vendorMangement/VendorMangement"
import { AdminHome, AdminLayout } from "@/pages/admin/admin-home"
import { Wallet } from "lucide-react"
import { Routes, Route, Navigate } from "react-router-dom"




export const  AdminRoutes = () =>{
   
  return (
     <Routes> 
       <Route path="/login" element={<AdminLoginPage/>}/>
      
       <Route path="/home" element={<AdminLayout/>}>
       </Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/vendors" element={<VendorManagement />} />
            <Route path="/categories" element={<CategoryManagement />} />
            {/* <Route path="/wallet" element={<Wallet />} /> */}

     </Routes>
         
        
         
     
  )
}