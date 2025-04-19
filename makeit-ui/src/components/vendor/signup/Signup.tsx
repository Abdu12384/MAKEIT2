import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Truck, EyeOff, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { toast } from "react-hot-toast" 
import { isAxiosError } from "axios" 
import { useCreateAccountMutation, useUploadeImageToCloudinaryMutation, useVendorSignupMutation } from "@/hooks/VendorCustomHooks"
import { OTPModal } from "@/components/otp-modal/OtpModal"
import { useResendOtpClientMutaion } from "@/hooks/ClientCustomHooks"
import { useNavigate } from "react-router-dom"
// import { OTPModal } from "./otp-modal"
// import { Logo } from "./logo"

// Define your interface types
interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: string;
  document: File | null;
}

interface VendorData {
  name: string;
  email: string;
  idProof: string;
  password: string;
  phone: string;  
  role: string;
  confirmPassword: string;
}

// Define validation schema using Yup
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Please enter a valid email").required("Email is required"),
  phone: Yup.string().matches(/^\+?[0-9\s-]{10,15}$/, "Please enter a valid phone number"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
  document: Yup.mixed().required("Document is required")
})

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  role: "vendor",
  document: null,
}

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [showCropper, setShowCropper] = useState<boolean>(false)
  const [croppedImage, setCroppedImage] = useState<File | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<VendorData>()

 const uploadImageCloudinaryAPI = useUploadeImageToCloudinaryMutation()
 const vendorSignupAPI = useVendorSignupMutation()
 const vendorCreateAccount = useCreateAccountMutation()
 const vendorResendOtp = useResendOtpClientMutaion()
 const navigate = useNavigate()
 


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

  const handleSubmit = async (values: FormValues) => {
    const fileToUpload = croppedImage || values.document;
    if (!fileToUpload) {
      toast.error('Please select an ID Proof')
      throw new Error("No file selected")
    }

    const formdata = new FormData()
    formdata.append('file', fileToUpload)
    formdata.append('upload_preset', 'vendor_id')
    
    try {
      const response = await uploadImageCloudinaryAPI.mutateAsync(formdata)
      console.log('clodinary data',response)
      const documentUrl = response.secure_url
      console.log('this is the documenturl', documentUrl)
      
      const vendor: VendorData = {
        name: values.name,
        email: values.email,
        idProof: documentUrl,
        password: values.password,
        phone: values.phone,
        role:'vendor',
        confirmPassword: values.confirmPassword
      }
      
      setData(vendor)
      console.log(vendor)
      
      // Call the vendor signup API
     const mutation = vendorSignupAPI.mutate(vendor, {
        onSuccess: () => {
          setIsOpen(true)
        },
        onError: (error:any) => {
          console.log('the error06465',error)
          toast.error(error?.response?.data?.message)
        }
      })

    } catch (error) {
        console.log(error)
    }
  }

  
  const handleSuccess = () => {
        setIsOpen(false)
        toast.success('Account created')
        setTimeout(() => {
          navigate("/_v/login")
        }, 3000);
        
    }



const handleError = (error: unknown) => {
        console.log(error)
        if (error instanceof Error) {
            toast.error(error.message)
        }
    }





  // Uncomment this when you implement the image cropper
  /*
  const handleCrop = (croppedFile) => {
    setCroppedImage(croppedFile)
    setShowCropper(false)
  }
  */

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="w-full  overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="flex h-full flex-col md:flex-row">
          <motion.div
            className="w-full p-8 md:w-1/2 md:p-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-6">
              {/* <Logo /> */}
            </motion.div>

            <div className="flex flex-col items-center justify-center">
              <motion.h1 variants={itemVariants} className="mb-2 text-3xl font-bold">
                Create your account
              </motion.h1>
              <motion.p variants={itemVariants} className="mb-6 text-muted-foreground">
                Let&apos;s get started with your 30 days free trial
              </motion.p>

              <motion.div variants={itemVariants} className="w-full max-w-md">
                <Button
                  variant="outline"
                  className="mb-6 flex h-12 w-full items-center justify-center gap-2 rounded-full"
                  type="button"
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
                  Sign up with Google
                </Button>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="relative mb-6 flex items-center justify-center">
              <div className="h-px flex-grow bg-gray-200"></div>
              <span className="mx-4 text-sm text-muted-foreground">or</span>
              <div className="h-px flex-grow bg-gray-200"></div>
            </motion.div>

            <div className="mx-auto flex w-full max-w-md justify-center">
              <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values, setFieldValue, isSubmitting }) => (
                  <Form className="w-full space-y-4">
                    <motion.div variants={itemVariants}>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Name<span className="text-red-500">*</span>
                      </Label>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        className="mt-1 h-11 rounded-full"
                      />
                      <ErrorMessage name="name" component="p" className="mt-1 text-sm text-red-500" />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email<span className="text-red-500">*</span>
                      </Label>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="mt-1 h-11 rounded-full"
                      />
                      <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-500" />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone
                      </Label>
                      <Field
                        as={Input}
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        className="mt-1 h-11 rounded-full"
                      />
                      <ErrorMessage name="phone" component="p" className="mt-1 text-sm text-red-500" />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password<span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="h-11 rounded-full pr-10"
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
                      <ErrorMessage name="password" component="p" className="mt-1 text-sm text-red-500" />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirm Password<span className="text-red-500">*</span>
                      </Label>
                      <div className="relative mt-1">
                        <Field
                          as={Input}
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="h-11 rounded-full pr-10"
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
                      <ErrorMessage name="confirmPassword" component="p" className="mt-1 text-sm text-red-500" />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <Label htmlFor="document" className="text-sm font-medium">
                        Upload Document<span className="text-red-500">*</span>
                      </Label>
                      <input
                        id="document"
                        name="document"
                        type="file"
                        accept="image/jpeg, image/png, application/pdf"
                        className="mt-1 h-11 w-full rounded-full border px-3 py-2"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            setFieldValue("document", file);
                            setCroppedImage(file); // Set cropped image to the original file for now

                            const fileType = file.type;
                            if (fileType.startsWith("image/")) {
                              setSelectedImage(URL.createObjectURL(file));
                              // setShowCropper(true); // Uncomment if you want to implement cropper
                            } else {
                              setSelectedImage("");
                              setShowCropper(false);
                            }
                          }
                        }}
                      />
                      <ErrorMessage name="document" component="p" className="mt-1 text-sm text-red-500" />

                      {selectedImage && (
                        <div className="mt-3">
                          <img
                            src={selectedImage}
                            alt="Preview"
                            className="h-32 w-32 rounded-md object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Uncomment and implement if you want image cropping
                      {showCropper && selectedImage && (
                        <div className="mt-4">
                          <h4 className="mb-2 text-sm font-medium">Crop Image</h4>
                          <ImageCropper
                            image={selectedImage}
                            onCrop={handleCrop}
                            onCancel={() => setShowCropper(false)}
                          />
                        </div>
                      )}
                      */}
                    </motion.div>
                     
                    <motion.div variants={itemVariants}>
                      <Button
                        type="submit"
                        className="mt-6 h-12 w-full rounded-full bg-purple-600 text-white hover:bg-purple-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                      </Button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-6 text-center text-sm">
                      Already have an account?{" "}
                      <a href="/_v/login" className="font-medium text-purple-600 hover:underline">
                        Log in
                      </a>
                    </motion.div>
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            className="hidden bg-purple-600 md:block md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/placeholder.svg?height=800&width=600')" }}
              ></div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-12 text-white">
                <motion.h2
                  className="mb-4 text-4xl font-bold"
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
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <div className="flex items-center space-x-2 rounded-full bg-black/30 px-4 py-2 backdrop-blur-sm">
                    <Check className="h-5 w-5" />
                    <span>100% Guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2 rounded-full bg-black/30 px-4 py-2 backdrop-blur-sm">
                    <Truck className="h-5 w-5" />
                    <span>Free delivery London area</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <OTPModal isOpen={isOpen} data={data}   handleError={handleError} resendOtp={vendorResendOtp} mutation={vendorCreateAccount} email={data?.email} handleSuccess={handleSuccess} setIsOpen={setIsOpen}  />
    </div>
  )
}