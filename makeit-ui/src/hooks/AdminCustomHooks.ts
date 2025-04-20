import { adminLogin } from "@/services/admin/adminService";
import { ILoginData } from "@/types/User";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers, UserQueryParams } from "@/services/admin/adminService";





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