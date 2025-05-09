import { adminAxiosInstance } from "@/api/admin.axios";
import authAxiosInstance from "@/api/auth.axios";
import { IAllVendorResponse, IAuthResponse, IAxiosResponse } from "@/types/response";
import {FetchVendorParams, ILoginData, IVendor } from "@/types/User";
import axios from "axios";
import { data } from "react-router-dom";


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

export interface Category {
	title: string;
	description: string;
}


export const refreshAdminSession = async (): Promise<IAuthResponse> => {
	const response = await adminAxiosInstance.get<IAuthResponse>(
		"/admin/refresh-session"
	);
	return response.data;
};



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
    const response = await adminAxiosInstance.get('/admin/users', {
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




export  const updateUserStatus = async (data:{userType: string; userId: string}): Promise<IAxiosResponse> =>{
    const response = await adminAxiosInstance.patch('/admin/user/status',
      {},
      {
      params:{
        userType: data.userType,
        userId: data.userId
      }
    })
    return response.data
}





export const getAllVendors = async ({
	forType = "non-active",
	page = 1,
	limit = 10,
	search = "",
}: FetchVendorParams): Promise<IAllVendorResponse> => {
	const response = await adminAxiosInstance.get("/admin/vendors", {
		params: { forType, page, limit, search },
	});
    console.log(response)
	return {
		vendor: response.data.vendor as IVendor[],
		totalPages: response.data.totalPages,
		currentPage: response.data.currentPage,
	};
	
};




export const updateVendorStatusById = async ({
	id,
	status,
	message,
}: {
	id: string;
	status: string;
	message?: string;
}): Promise<IAxiosResponse> => {
	const response = await adminAxiosInstance.put<IAxiosResponse>(
		`/admin/vendor/${id}`,
		{ status, message }
	);
	return response.data;
};



export const createCategory = async (data: Category) => {
	try {
		const response = await adminAxiosInstance.post("/admin/category", data);
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	  }
};


export const getAllCategories = async (params: { limit?: number; page?: number; search?: string }) => {
  const response = await adminAxiosInstance.get("/admin/category", { params });
  return response.data;
};



export const updateCategoryStatus = async (id: string, status: string) => {
  try {
	const response = await adminAxiosInstance.patch(`/admin/category/${id}`, { status });
	return response.data;
  } catch (error) {
    console.log('error while updating category status',error)
    throw error
  }
};


export const editCategory = async ({data,categoryId}: {data: Category,categoryId: string}) => {
	try {
		const response = await adminAxiosInstance.put(`/admin/category/${categoryId}`, data);
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};






export const logoutAdmin = async (): Promise<IAxiosResponse> => {
	const response = await adminAxiosInstance.post("/admin/logout");
	return response.data;
};
