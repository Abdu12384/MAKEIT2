import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Truck, EyeOff, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import Img1 from '@/assets/images/singupImg.jpeg'
import {  UserRoles } from "@/type/User"
import toast from "react-hot-toast"
import { setTimeout } from "timers/promises"
import { useVendorLoginMutation } from "@/hooks/VendorCustomHooks"
import { useAdminLoginMutation } from "@/hooks/AdminCustomHooks"


interface FormData {
  email: string
  password: string
  role: UserRoles
}

interface FormErrors {
  email?: string
  password?: string
}

const initialValues = {
  email: "",
  password: "",
  role:' as UserRoles
}

export function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>(initialValues)
  const navigate = useNavigate()
  const loginMutation = useAdminLoginMutation()
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value }

      // // const error = validateSingleField(name as "email" | "password", value)
      // setFormErrors((prevErrors) => ({
      //   ...prevErrors,
      //   [name]: error,
      // }))

      return updatedData
    })
  }





  async function handleSubmit(e: React.FormEvent){     
    e.preventDefault()  
    setIsLoading(true)
    try {
     console.log('user data',formData)
    loginMutation.mutate(formData,{
       onSuccess:(data) =>{
        console.log(data)
        window.setTimeout(() => {
          navigate('/_a/',{replace:true})
        }, 2000);
       },
       onError:(error:any)=>{
        toast.error(error?.response?.data?.message)
        setIsLoading(false)
       }

    })
    } catch (error) {
      console.error("Login failed", error)
      setIsLoading(false)
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center h-[90vh]">
      <div className="w-full h-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left side - Image (reversed from signup) */}
          <motion.div
            className="hidden md:block md:w-1/2 bg-[#a8b5a8] relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${Img1})` }}
            ></div>
            <div className="absolute inset-0 flex flex-col justify-end p-12 text-white bg-gradient-to-t from-black/60 to-transparent">
              <motion.h2
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                Welcome Back to
                <br />
                Your Event Journey
                </motion.h2>
              <motion.p
                className="mb-8 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Plan, manage, and celebrate your moments seamlessly.
                <br />
                Let’s make your next event unforgettable!
              </motion.p>
              <motion.div
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
                  <Check className="h-5 w-5" />
                  <span>100% Event Satisfaction</span>
                </div>
                <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>On-time Setup & Support</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="w-full max-w-md">
              <motion.div variants={itemVariants} className="mb-8 flex justify-center">
                {/* Logo placeholder */}
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded-md border-2 border-black flex items-center justify-center">
                    <div className="h-2 w-2 bg-black rounded-sm transform rotate-45"></div>
                  </div>
                  <span className="font-bold text-lg">CORALS</span>
                </div>
              </motion.div>

              <div className="text-center mb-8">
                <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-2">
                  Welcome back
                </motion.h1>
                <motion.p variants={itemVariants} className="text-gray-500">
                  Please enter your details to sign in
                </motion.p>
              </div>

              <motion.div variants={itemVariants}>
                <Button
                  variant="outline"
                  className="w-full mb-6 flex items-center justify-center rounded-3xl gap-2 h-12"
                >
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

              <motion.div variants={itemVariants} className="relative flex items-center justify-center mb-6">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="mx-4 text-sm text-gray-400">or</span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </motion.div>

              <motion.form onSubmit={handleSubmit} className="space-y-4">
                <motion.div variants={itemVariants}>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email<span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-10 rounded-3xl shadow-sm"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
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
                      className="w-full h-10 rounded-3xl shadow-sm"
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

                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {/* <Checkbox id="rememberMe" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} /> */}
                    <Label htmlFor="rememberMe" className="text-sm font-normal">
                      Remember me
                    </Label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white h-12 mt-6 rounded-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-4 w-4 rounded-full border-2 border-transparent border-t-white animate-spin" />
                        Signing in...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center text-sm mt-6">
                  Don't have an account?{" "}
                  <a onClick={()=>navigate('/_v/signup')} className="text-blue-600 hover:underline">
                    Sign up
                  </a>
                </motion.div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
