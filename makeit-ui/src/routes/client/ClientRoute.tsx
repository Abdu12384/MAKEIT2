import { LoginComponent } from "@/components/client/login/Login"
import { SignupComponent } from "@/components/client/signup/Signup"
import ClientHome from "@/pages/client/home-page"
import { Routes, Route } from "react-router-dom"


 export const ClientRoutes = () =>{
   
     return (
        <Routes> 
           
          <Route path="/signup" element={<SignupComponent/>}/>
          <Route path="/login" element={<LoginComponent/>}/>
          
          <Route path="/" element={<ClientHome/>}/>
        </Routes>
            
           
            
        
     )
}