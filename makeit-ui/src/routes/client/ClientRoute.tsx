import { LoginComponent } from "@/components/client/login/Login"
import { SignupComponent } from "@/components/client/signup/Signup"
import ClientHome from "@/pages/client/home-page"
import { NoAuthRoute } from "@/utils/protected/PublicRoute"
import { Routes, Route } from "react-router-dom"


 export const ClientRoutes = () =>{
   
     return (
        <Routes> 
          <Route path="/" element={<ClientHome/>}/>
           
          <Route path="/signup" element={<NoAuthRoute element={<SignupComponent />} />} />
          <Route path="/login" element={<NoAuthRoute element={<LoginComponent />} />} />

          
          

        </Routes>
            
           
            
        
     )
}