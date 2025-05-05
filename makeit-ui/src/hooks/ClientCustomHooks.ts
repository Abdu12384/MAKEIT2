import { useMutation } from '@tanstack/react-query';
import { clientCreateAccount, clientGetAllServices, clientGetServiceById, clientGoogleLogin, clientLogin, clientProfileEdit, clientResendOtp, clientSignup, logoutClient } from '@/services/client/clientService';
import { ILoginData } from '@/types/User';
import { emit } from 'process';


type LoginProps = {
  email: string;
  password: string;
};

interface FormValues {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

type loginData = {
  credential: string
  client_id: string,
  role : string
}



export const useClientSignupMutation = () =>{
  return useMutation({
    mutationFn: (values: FormValues) => clientSignup(values),
  })
}


export const useCreateAccountMutation = () => {
  return useMutation({
      mutationFn: ({ formdata, otpString }: { formdata: Record<string, string | boolean | number>; otpString: string }) => clientCreateAccount({ formdata, otpString })

  })
}



export const useClientLoginMutation = () =>{
   return useMutation({
     mutationFn: (user:ILoginData) => clientLogin(user)
   })
}




export const useClientGoogleLoginMutation = () =>{
  return useMutation({
    mutationFn: (loginData:loginData) => clientGoogleLogin(loginData)
  })
}



export const useResendOtpClientMutaion = () => {
   return useMutation({
     mutationFn: (email: string) => clientResendOtp(email)
   })
}





export const useClientGetAllServicesMutation = () => {
  return useMutation({
    mutationFn: clientGetAllServices
  })
}     



export const useClientProfileEditMutation = () => {
  return useMutation({
    mutationFn:(data:Record<string, string|number|boolean>) => clientProfileEdit(data)
  })
}



export const useClientGetServiceByIdMutation = () => {
  return useMutation({
    mutationFn: (id:string) => clientGetServiceById(id)
  })
}




export const useLogoutClient = () => {
  return useMutation({
    mutationFn: logoutClient,
  });
};