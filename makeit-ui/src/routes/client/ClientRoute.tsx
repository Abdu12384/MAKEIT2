import { LoginComponent } from "@/components/client/login/Login"
import ClientBookings from "@/components/client/profail/bookings"
import { ClientProfile } from "@/components/client/profail/ClientProfail"
import { SignupComponent } from "@/components/client/signup/Signup"
import ClientHome from "@/pages/client/home-page"
import ClientProfailLayout from "@/pages/client/profail-page"
import { BookingPage } from "@/pages/client/service-details-page"
import { ServiceListings } from "@/pages/client/service-listing-page"
import { ProtectedRoute } from "@/utils/protected/ProtectedRoute"
import { NoAuthRoute } from "@/utils/protected/PublicRoute"
import { Routes, Route } from "react-router-dom"


 export const ClientRoutes = () =>{
   
     return (
        <Routes> 
          <Route path="/" element={<ClientHome/>}/>
           
          <Route path="/signup" element={<NoAuthRoute element={<SignupComponent />} />} />
          <Route path="/login" element={<NoAuthRoute element={<LoginComponent />} />} />



            <Route path="/services" element={
                       <ProtectedRoute allowedRoles={["client"]} element={<ServiceListings />} />
                       } />
            <Route path="/services/details/:id" element={
                       <ProtectedRoute allowedRoles={["client"]} element={<BookingPage />} />
                       } />

          <Route path="/client" element={ 
                      <ProtectedRoute  allowedRoles={["client"]}  element={<ClientProfailLayout/>} />}>
                       <Route index element={<ClientProfile/>}/>
                       <Route path="profile" element={<ClientProfile/>}/>
                       <Route path="bookings" element={<ClientBookings/>}/>
                     </Route>
          

        </Routes>
            
           
            
        
     )
}