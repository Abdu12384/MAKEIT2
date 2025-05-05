
import VendorProfile from "@/components/vendor/layout/VendorProfile"
import  {  VendorLoginPage } from "@/components/vendor/login/Login"
import { ServiceListingPage } from "@/components/vendor/service/ServiceComponent"
import { SignupPage } from "@/components/vendor/signup/Signup"
import { CircularSidebar } from "@/components/vendor/vendorProfile/Profile-sidebar"
import {ProfileForm} from "@/components/vendor/vendorProfile/VendorProfileForm"
import VendorHomePage from "@/pages/vendor/home-page-vendor"
import { VendorProfilePage } from "@/pages/vendor/VendorProfilePage"
import { ProtectedRoute } from "@/utils/protected/ProtectedRoute"
import { NoAuthRoute } from "@/utils/protected/PublicRoute"
import { Routes, Route } from "react-router-dom"


export const VendorRoute = () =>{

      return(
        <Routes>


          <Route path="/login" element={<NoAuthRoute element={<VendorLoginPage />} />} />
          <Route path="/signup" element={<NoAuthRoute element={<SignupPage />} />} />

          
           {/* ProtectRoute */}
            {/* <Route path="/profile" element={
            <ProtectedRoute allowedRoles={["vendor"]} element={<VendorProfile />} />
             } />          */}

            <Route path="/home" element={
            <ProtectedRoute allowedRoles={["vendor"]} element={<VendorHomePage />} />
            } />

          <Route path="/" element={ 
            <ProtectedRoute  allowedRoles={["vendor"]}  element={<VendorProfilePage/>} />}>
             <Route index element={<ProfileForm/>}/>
              <Route path="/profile" element={<ProfileForm />} />
              <Route path="/services" element={<ServiceListingPage />} />

           </Route>
        </Routes>
      )
}