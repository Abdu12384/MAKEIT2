import { adminLogin } from "@/services/admin/adminService";
import { ILoginData } from "@/type/User";
import { useMutation } from "@tanstack/react-query";





export const useAdminLoginMutation = () =>{
      return useMutation({
        mutationFn:(user:ILoginData) => adminLogin(user)
      })
}

