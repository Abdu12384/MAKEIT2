import authAxiosInstance from "@/api/auth.axios";
import { VendorAxiosInstance } from "@/api/vendor.axios";
import { IAuthResponse, IAxiosResponse } from "@/types/response";
import { GetAllServicesParams, ServiceFormValues } from "@/types/service";
import { ILoginData } from "@/types/User";
import clodAxios, { isAxiosError } from 'axios'
import { emit } from "process";


interface VendorData {
   name: string;
   email: string;
   phone: string;
   password: string;
   confirmPassword: string;
   idProof: string;
}



export const refreshVendorSession = async (): Promise<IAuthResponse> => {
   const response = await VendorAxiosInstance.get<IAuthResponse>(
     "/vendor/refresh-session"
   );
   return response.data;
 };




const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dujuwqvz5/image/upload";

export const uploadImageCloudinary = async (formdata: FormData) => {
  try {
      const response = await clodAxios.post(CLOUDINARY_URL, formdata)
      return response.data
  } catch (error) {
      console.log('error while uploding image', error)
      throw error
  }
}




export const vendorSignup  = async (formdata: VendorData) =>{
   try {
     const response = await authAxiosInstance.post('/send-otp',formdata)
    return  response.data
   } catch (error) {
     console.log('error wihle singup vendor', error)
     throw error
   }
}


export  const vendorCreateAccount = async ({formdata, otpString}:{formdata:Record<string, string | number | boolean>;otpString:string}) =>{
    try {
       const response = await authAxiosInstance.post('/signup',{formdata,otpString})
       return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
}


export const VendorLogin = async (user: ILoginData) =>{
    try {
       const response = await authAxiosInstance.post('/login',user)
      return  response.data
    } catch (error) {
       console.log(error)
       throw error
    }
}




export const updateVendorProfile = async ({data}:{data: Record<string, string | number | boolean>}) =>{
     try {
       const response = await VendorAxiosInstance.put("/vendor/details",data)
       return response
     } catch (error) {
        console.log(error)
        throw error
     }
}







export const createService = async (data:ServiceFormValues) => {
  try {
     const response = await VendorAxiosInstance.post("/vendor/service",data);
     return response.data
   
  } catch (error) {
       console.log(error)
       throw error
  }
}



export const getAllServicesByVendorId = async ({
   page = 1,
   limit = 10,
   search = "",
   sortBy = "serviceTitle",  
   sortOrder = "asc" 
 }: GetAllServicesParams) => {
   try {
     const response = await VendorAxiosInstance.get("/vendor/service", {
       params: {
         page,
         limit,
         search,
         sortBy,
         sortOrder
       }
     }); 
     return{
      services:response.data.services,
      currentPage:response.data.currentPage,
      totalPages:response.data.totalPages
     }
  } catch (error) {
    console.log(error);
    throw error;
  }
};



export const updateService = async ({serviceId,data}: {serviceId:string,data:ServiceFormValues}) => {
  try {
     const response = await VendorAxiosInstance.put(`/vendor/service/${serviceId}`,
      data
   );
     return response.data
   } catch (error) {
        console.log(error)
        throw error
   }
}




export const getAllCategories = async () => {
   try {
   const response = await VendorAxiosInstance.get("/vendor/categories");
   return response.data;
 } catch (error) {
   console.log(error)
   throw error
 }
}






export const logoutVendor = async (): Promise<IAxiosResponse> => {
   const response = await VendorAxiosInstance.post("/vendor/logout");
   return response.data;
};





