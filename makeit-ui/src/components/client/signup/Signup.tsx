import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Truck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import  {FormData,FormErrors, validateSingleField} from "@/utils/validationForms/validationForms"
import { useClientSignupMutation, useCreateAccountMutation, useResendOtpClientMutaion } from "@/hooks/ClientCustomHooks"
import { EyeOff, Eye } from "lucide-react"
import { OTPModal } from "@/components/otp-modal/OtpModal"
import { useNavigate } from "react-router-dom"
import { isAxiosError } from "axios"
import toast from "react-hot-toast"
import { GoogleLogin } from "@react-oauth/google"



const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  role: "client" 

}



export function SignupComponent() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<FormData>(initialValues)

  const [formData, setFormData] = useState<FormData>(initialValues)
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const signupMutation =  useClientSignupMutation()
  const mutationCreateAccount = useCreateAccountMutation()
  const resendOtpMutaion = useResendOtpClientMutaion()



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
  
      // Live validation
      const error = validateSingleField(name as keyof FormData, value, updatedData);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
  
      return updatedData;
    });
    
  }





  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setData(formData)
    try {
    
     signupMutation.mutate(formData,{
       onSuccess:()=> {
         setIsOpen(true)
       },
       onError:(error:any)=>{
         toast.error(error?.response?.data?.message)
         setIsOpen(false)
       }
     })

    } catch (error) {
      console.error('erreer',error)
    }

  }


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }


  const navigate = useNavigate()
 
  const handleMutationSuccess = () =>{
    setTimeout(() => {
      navigate("/login",{replace:true})
    }, 3000);
  }

  const handleMutationError = (error:unknown) =>{
    let message = "An unexpected error occured"
    if(isAxiosError(error)){
      console.log(error)
      message = error.response?.data.message || "An error eccurred"
    }
    
  }


  return (
    <>
      {/* Left side - Form */}
      <div className="min-h-screen   bg-gray-100 flex items-center justify-center h-[90vh]">
      <div className="w-full h-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
      <motion.div
        className="w-full md:w-1/2 p-8 md:p-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-6">
          {/* <CoralsLogo /> */}
        </motion.div>
       <div className="flex  flex-col justify-center items-center">

        <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-2">
          Create your account
        </motion.h1>
        <motion.p variants={itemVariants} className="text-gray-500 mb-1">
          Let&apos;s get started with your 30 days free trial
        </motion.p>

        <motion.div variants={itemVariants}>
          <Button variant="outline" className="w-[400px] mb-2 flex items-center justify-center rounded-3xl gap-2 h-12">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Login with Google
          </Button>
        </motion.div>
        </div>
        <motion.div variants={itemVariants} className="relative flex items-center justify-center">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="mx-4 text-sm text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </motion.div>

        <div className="w-full max-w-sm mx-auto bg-white p-2 rounded-x flex justify-center items-center">
        <motion.form onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={itemVariants}>
            <Label htmlFor="name" className="text-sm font-medium">
              Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              className="w-[350px] h-10 rounded-3xl shadow-sm"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label htmlFor="email" className="text-sm font-medium">
              Email<span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-[350px] h-10 rounded-3xl shadow-sm "
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="w-[350px] h-10 rounded-3xl shadow-sm "
              value={formData.phone}
              onChange={handleChange}
            />
          {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>} 
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label htmlFor="password" className="text-sm font-medium">
              Password<span className="text-red-500">*</span>
            </Label>
            <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-[350px] h-10 rounded-3xl shadow-sm "
              value={formData.password}
              onChange={handleChange}
            />
           <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
           </button>
        </div>
         {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>} 
          </motion.div>

          <motion.div variants={itemVariants}>
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password<span className="text-red-500">*</span>
            </Label>
            <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-[350px] h-10 rounded-3xl shadow-sm "
              value={formData.confirmPassword}
              onChange={handleChange}
            />
           <button
             type="button"
             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
             tabIndex={-1}
             >
             {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          </div>
          {formErrors.confirmPassword && <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>} 
          </motion.div>


          <motion.div variants={itemVariants}>
            <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white h-12 mt-6 rounded-full">
              Sign Up
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center text-sm mt-6">
            Already have an account?{" "}
            <a onClick={()=>navigate('/login')} className="text-blue-600 hover:underline">
              Log in
            </a>
          </motion.div>
        </motion.form>
        </div>
      </motion.div>

      {/* Right side - Image */}
      <motion.div
        className="hidden md:block md:w-1/2 bg-[#a8b5a8] relative overflow-hidden"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=800&width=600')" }}
        ></div>
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white bg-gradient-to-t from-black/60 to-transparent">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Discovering the Best
            <br />
            Furniture for Your Home
          </motion.h2>
          <motion.p
            className="mb-8 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Our practice is Designing Complete Environments exceptional
            <br />
            buildings communities and place in special situations
          </motion.p>
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
              <Check className="h-5 w-5" />
              <span>100% Guarantee</span>
            </div>
            <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
              <Truck className="h-5 w-5" />
              <span>Free delivery London area</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
      </div>
      </div>
      <OTPModal isOpen={isOpen} data={data} setIsOpen={setIsOpen} resendOtp={resendOtpMutaion} mutation={mutationCreateAccount} email={data?.email} handleError={handleMutationError}  handleSuccess={handleMutationSuccess}/>
    </div>
    </>
  )
}
