import { CategoryManagement } from "@/components/admin/mangement/CategoryManagement"
import { Dashboard } from "@/components/admin/dashboard/Dashboard"
import { AdminLoginPage } from "@/components/admin/login/Login"
import { AdminLayout } from "@/pages/admin/admin-home"
import { AdminVendorApplicationPage } from "@/pages/admin/applications/AdminVendorApplicationPage"
import { AdminClientManagementPage } from "@/pages/admin/managementPage/AdminClientManagenemtPage"
import { AdminVendorManagementPage } from "@/pages/admin/managementPage/AdminVendorManagementPage"
import { ProtectedRoute } from "@/utils/protected/ProtectedRoute"
import { NoAuthRoute } from "@/utils/protected/PublicRoute"
import { Wallet } from "lucide-react"
import { Routes, Route } from "react-router-dom"




export const  AdminRoutes = () =>{
   
  return (
     <Routes> 
       <Route path="/login" element={<NoAuthRoute element={<AdminLoginPage/>} />}/>
            
            <Route path="/" element={ 
            <ProtectedRoute  allowedRoles={["admin"]}  element={<AdminLayout/>} />}>
            <Route index element={<Dashboard/>}/>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<AdminClientManagementPage />} />
            <Route path="vendors" element={<AdminVendorManagementPage />} />
            <Route path="categories" element={<CategoryManagement />} />
            <Route path="application" element={<AdminVendorApplicationPage/>}/>
            {/* <Route path="/wallet" element={<Wallet />} /> */}
           </Route>

     </Routes>
         
        
         
     
  )
}