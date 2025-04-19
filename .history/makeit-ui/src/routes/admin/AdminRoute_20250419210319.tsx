import { AdminLoginPage } from "@/components/admin/login/Login"
import { AdminHome } from "@/pages/admin/admin-home"
import { Routes, Route } from "react-router-dom"




export const  AdminRoutes = () =>{
   
  return (
     <Routes> 
       <Route path="/login" element={<AdminLoginPage/>}/>
       <Route path="/home" element={<AdminHome/>}/>

     </Routes>
         
        
         
     
  )
}