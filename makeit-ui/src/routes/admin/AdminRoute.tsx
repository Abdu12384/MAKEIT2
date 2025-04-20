import { CategoryManagement } from "@/components/admin/categoryManagement/CategoryManagement"
import { Dashboard } from "@/components/admin/dashboard/Dashboard"
import { AdminLoginPage } from "@/components/admin/login/Login"
import { AdminLayout } from "@/pages/admin/admin-home"
import { AdminClientManagementPage } from "@/pages/admin/managementPage/AdminClientManagenemtPage"
import { AdminVendorManagementPage } from "@/pages/admin/managementPage/AdminVendorManagementPage"
import { Wallet } from "lucide-react"
import { Routes, Route, Navigate } from "react-router-dom"




export const  AdminRoutes = () =>{
   
  return (
     <Routes> 
       <Route path="/login" element={<AdminLoginPage/>}/>
      
         <Route path="/" element={<AdminLayout/>}>
             <Route index element={<Dashboard/>}/>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<AdminClientManagementPage />} />
            <Route path="vendors" element={<AdminVendorManagementPage />} />
            <Route path="categories" element={<CategoryManagement />} />
            {/* <Route path="/wallet" element={<Wallet />} /> */}
       </Route>

     </Routes>
         
        
         
     
  )
}