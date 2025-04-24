import { adminLogin, logoutAdmin, updateUserStatus, updateVendorStatusById } from "@/services/admin/adminService";
import { FetchVendorParams, ForType, ILoginData } from "@/types/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, UserQueryParams } from "@/services/admin/adminService";
import { string } from "yup";
import { IAllVendorResponse, IAxiosResponse } from "@/types/response";
import { getAllVendors } from "@/services/admin/adminService";// update the path as needed





export const useAdminLoginMutation = () =>{
      return useMutation({
        mutationFn:(user:ILoginData) => adminLogin(user)
      })
}




export const useGetAllUsers = <T>(params: UserQueryParams) => {
  return useQuery({
    queryKey: ['users', params.page, params.limit, params.search, params.userType],
    queryFn: () => getAllUsers(params)
  });
};



export const useUpdateUserStatusMutaiion = <T = IAxiosResponse>() =>{
     const  queryClient = useQueryClient()

     return useMutation<T, Error, {userType: string; userId: string}>({
         mutationFn: updateUserStatus as (data: {userType: string; userId:string}) => Promise<T>,
         onSuccess:()=>{
          queryClient.invalidateQueries({queryKey: ['users']})
         }
     })
}







export const useAllVendorQueryMutation = (
	queryFunc: (params: FetchVendorParams) => Promise<IAllVendorResponse>,
	page: number,
	limit: number,
	search: string,
	forType: ForType
) => {
	return useQuery<IAllVendorResponse>({
		queryKey: ["vendor", forType, page, limit, search],
		queryFn: () =>
			queryFunc({
				page,
				limit,
				search,
				forType,
			}),
	});
};







export const useUpdateVendorStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IAxiosResponse, Error, { vendorId: string; status: string; message?: string }>({
    mutationFn: ({ vendorId, status, message }) => updateVendorStatusById({ id: vendorId, status, message }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
};




export const useLogoutAdmin = () => {
  return useMutation({
    mutationFn: logoutAdmin,
  });
};