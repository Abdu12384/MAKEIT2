import { clientGoogleLogin } from "@/services/client/clientService";
import { uploadImageCloudinary, vendorCreateAccount, VendorLogin, vendorSignup } from "@/services/vendor/vendorService";
import { ILoginData } from "@/type/User";
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









