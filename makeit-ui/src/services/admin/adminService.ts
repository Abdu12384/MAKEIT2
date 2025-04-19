import authAxiosInstance from "@/api/auth.axios";
import { ILoginData } from "@/type/User";


interface Login {
   email: string;
   password: string
}


export const adminLogin = async (user:ILoginData) => {
  try {
     const response = await authAxiosInstance.post('/login',user)
     return response?.data
  } catch (error) {
    console.log('error while admin login')
    throw error
  }
}


