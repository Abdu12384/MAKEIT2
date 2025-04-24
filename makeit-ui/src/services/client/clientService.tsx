import authAxiosInstance from "@/api/auth.axios";
import { clientAxiosInstance } from "@/api/client.axios";
import { IAuthResponse, IAxiosResponse } from "@/types/response";
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






export const logoutClient = async (): Promise<IAxiosResponse> => {
  const response = await clientAxiosInstance.post("/client/logout");
  return response.data;
};







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


