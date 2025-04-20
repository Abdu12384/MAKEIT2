import adminAxiosInstance from "@/api/admin.axios";
import authAxiosInstance from "@/api/auth.axios";
import { ILoginData } from "@/types/User";


interface Login {
   email: string;
   password: string
}


export interface UserQueryParams {
  page: number;
  limit: number;
  search: string;
  userType: string;
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







export const getAllUsers = async ({ page, limit, search, userType }: UserQueryParams) => {
  try {
    const response = await adminAxiosInstance.get('/users', {
      params: {
        page,
        limit,
        search,
        userType
      }
    });
    return response?.data;
  } catch (error) {
    console.log('error while fetching users');
    throw error;
  }
};



