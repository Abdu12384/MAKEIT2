import authAxiosInstance from "@/api/auth.axios";
import { clientAxiosInstance } from "@/api/client.axios";
import { IAuthResponse, IAxiosResponse } from "@/types/response";
import { GetAllServicesParams } from "@/types/service";
import { ILoginData } from "@/types/User";
import axios, { isAxiosError } from "axios";
import { LogIn } from "lucide-react";

interface SignupPayload{
  name: string,
  email: string,
  password: string,
  confirmPassword:string,
  phone?: string
}

interface SingupResponse {
  message: string,
  data?: any
}

type CreateAccountParams = {
  formdata: Record<string, string | number | boolean>
  otpString: string
}


type Client = {
  email: string;
  googleVerified: boolean;
  name: string;
  profileImage: string
}


export const refreshClientSession = async (): Promise<IAuthResponse> => {
  const response = await clientAxiosInstance.get<IAuthResponse>(
    "/client/refresh-session"
  );
  return response.data;
};



export const clientSignup = async (values: SignupPayload): Promise<SingupResponse> =>{
   try {
     console.log('serverci file data',values)
     const response = await authAxiosInstance.post('/send-otp',values)
     console.log('send otp',response)
     return response.data
   } catch (error) {
     console.error('Signup failed',error)
     throw error
   }
}



export const clientCreateAccount = async ({formdata, otpString}:CreateAccountParams): Promise<any> =>{
   try {
     const response = await authAxiosInstance.post('/signup',{
      formdata,
      otpString
     })   
     return response.data
   } catch (error) {
     console.error('Create account failed',error)
     throw error
   }
}


export const clientResendOtp = async (email: string) =>{
     try {
       const response = await authAxiosInstance.post('/send-otp',{email})
       return response.data
     } catch (error) {
       console.log('error while client resend otp',error)
       throw error
     }
}





export const clientLogin = async (user:ILoginData)=>{
   try {
     const response = await authAxiosInstance.post('/login',user)
     return response.data
   } catch (error) {
       console.log('error while client login', error)
       throw error
   }
}





export const clientGoogleLogin = async ({
  credential,
  client_id,
  role,
}:{
  credential: string,
  client_id: string,
  role: string
}) => {
  try {
    const response = await authAxiosInstance.post(
      '/google-auth',
      {
        credential,
        client_id,
        role
      })
      return response.data
    } catch (error) {
      console.log('error while client google login',error)
      throw error
    }
  }
  
  
  
  export const clientProfileEdit = async (data:Record<string, string|number|boolean>) => {
    try {
       const response = await clientAxiosInstance.put('/client/profile',data)
      return response.data
    } catch (error) {
      console.log('error while client profile edit',error)
      throw error
    }
  }







export const clientGetAllServices = async ({
  page = 1,
  limit = 10,
  search = "",
  sortOrder = "asc"
}: GetAllServicesParams) => {
  try {
    const response = await clientAxiosInstance.get('/client/services', {
      params: {
        page,
        limit,
        search,
        sortOrder
      }
    })
    return response.data
  } catch (error) {
    console.log('error while client get all services',error)
    throw error
  }
}




export const clientGetServiceById = async (id:string) => {
  try {
    const response = await clientAxiosInstance.get(`/client/services/${id}`)
    return response.data
  } catch (error) {
    console.log('error while client get service by id',error)
    throw error
  }
}




export const clientBookingService = async (id:string,bookingData:Record<string, string|number|boolean>) => {
  try {
    console.log('client booking service',id,bookingData)
    const response = await clientAxiosInstance.post(`/client/services/${id}/book`,bookingData)
    return response.data
  } catch (error) {
    console.log('error while client booking service',error)
    throw error
  }
}


  
  


  export const logoutClient = async (): Promise<IAxiosResponse> => {
    const response = await clientAxiosInstance.post("/client/logout");
    return response.data;
  };
  
