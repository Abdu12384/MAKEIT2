import { updateUserStatus } from "@/services/admin/adminService";
import { clientBookingService, clientGoogleLogin } from "@/services/client/clientService";
import { createService, getAllCategories, getAllServicesByVendorId, logoutVendor, updateService, updateVendorProfile, uploadImageCloudinary, vendorCreateAccount, VendorLogin, vendorSignup } from "@/services/vendor/vendorService";
import { ServiceFormValues } from "@/types/service";
import { ILoginData } from "@/types/User";
import { useMutation } from "@tanstack/react-query";



type Client = {
  email: string;
  googleVerified: boolean;
  name: string;
  profileImage: string
}



interface FormValues{
    name: string
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    idProof: string;
}


export const useUploadeImageToCloudinaryMutation = () => {
  return useMutation({
      mutationFn: async (formData: FormData) => {
          return await uploadImageCloudinary(formData)

      },

  })
}



export const useVendorSignupMutation = () =>{
   return useMutation({
     mutationFn: async (formData: FormValues) =>{
        return await vendorSignup(formData)
     }
   })
}



export const useCreateAccountMutation = () => {
  return useMutation({
      mutationFn: ({ formdata, otpString }: { formdata: Record<string, string | boolean | number>; otpString: string }) => vendorCreateAccount({ formdata, otpString })

  })
}


export const useVendorLoginMutation = () =>{
   return useMutation({
     mutationFn: (user:ILoginData) => VendorLogin(user)
   })
}






export const useUpdateVendorProfileMutation = () =>{
   return useMutation({
     mutationFn: ({data}:{data:Record<string, string|number|boolean>})=>
      updateVendorProfile({data})
   })
}





export const useCreateServiceMutation = () => {
   return useMutation({
     mutationFn:(data: ServiceFormValues) => createService(data)
   })
}


export const useGetAllServicesByVendorIdMutation = () => {
  return useMutation({
    mutationFn: (params: {
      page: number;
      limit: number;
      search?: string;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    }) => getAllServicesByVendorId(params), 
  });
}




export const useUpdateServiceMutation = () => {
  return useMutation({
    mutationFn: ({serviceId,data}: {serviceId:string,data:ServiceFormValues}) => updateService({serviceId,data}),
  });
}





export const useGetAllCategoriesMutation = () => {
  return useMutation({
    mutationFn: getAllCategories,
  });
};



export const useBookingServiceMutation = () => {
  return useMutation({
    mutationFn: ({id,bookingData}: {id:string,bookingData:Record<string, string|number|boolean>}) => clientBookingService(id,bookingData),
  });
}




export const useLogoutVendor = () => {
  return useMutation({
    mutationFn: logoutVendor,
  });
};





