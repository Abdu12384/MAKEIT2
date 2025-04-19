
import  {  VendorLoginPage } from "@/components/vendor/login/Login"
import { SignupPage } from "@/components/vendor/signup/Signup"
import { Routes, Route } from "react-router-dom"


export const VendorRoute = () =>{

      return(
        <Routes>

         <Route path="/login" element={<VendorLoginPage/>}/>
         <Route path="/signup" element={<SignupPage/>}/>

        </Routes>
      )
}