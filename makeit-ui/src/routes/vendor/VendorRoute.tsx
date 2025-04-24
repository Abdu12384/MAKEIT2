
import VendorProfile from "@/components/vendor/layout/VendorProfile"
import  {  VendorLoginPage } from "@/components/vendor/login/Login"
import { SignupPage } from "@/components/vendor/signup/Signup"
import { ProtectedRoute } from "@/utils/protected/ProtectedRoute"
import { NoAuthRoute } from "@/utils/protected/PublicRoute"
import { Routes, Route } from "react-router-dom"


export const VendorRoute = () =>{

      return(
        <Routes>


          <Route path="/login" element={<NoAuthRoute element={<VendorLoginPage />} />} />
         <Route path="/signup" element={<NoAuthRoute element={<SignupPage />} />} />

          
         <Route path="/profile" element={
        <ProtectedRoute allowedRoles={["vendor"]} element={<VendorProfile />} />
      } />         
        </Routes>
      )
}