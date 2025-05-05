// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Clock, DollarSign, Star, ChevronRight, Search, Filter, IndianRupee } from 'lucide-react';
// import { Link } from "react-router-dom";
// import { useClientGetAllServicesMutation } from "@/hooks/ClientCustomHooks";

// // Define the Service type based on the fields you mentioned
// interface Service {
//   id: string;
//   serviceTitle: string;
//   serviceDescription: string;
//   servicePrice: number;
//   serviceDuration: string;
//   yearsOfExperience: number;
//   additionalHourFee: number;
//   cancellationPolicy: string;
//   termsAndCondition: string;
//   imageUrl: string;
//   rating: number;
//   reviewCount: number;
//   category: string;
// }



// // Categories for filtering
// const categories = ["All", "Photography", "Development", "Design", "Fitness", "Legal"];

// export const ServiceListings = () => {
//   const [services, setServices] = useState<Service[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1)
//   const [limit, setLimit] = useState(6)

//   const clientGetAllServicesMutation = useClientGetAllServicesMutation()  


//   useEffect(() => {
    
//     clientGetAllServicesMutation.mutate(
//       {
//         page: currentPage,
//         limit,
//         search: searchTerm,
//         sortOrder: "asc"
//       },
//       {
//         onSuccess: (data) => {
//           console.log(data)
//           setServices(data.services.services)
//           setIsLoading(false)
//         },
//         onError: (error) => {
//           console.log(error)
//         }
//       }
//     )
//   }, [currentPage, limit, searchTerm])

//   // Simulate loading
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, [currentPage, limit, searchTerm]);

//   // Filter services based on search term and category
//   useEffect(() => {
//     let filtered = services;
    
//     if (searchTerm) {
//       filtered = filtered.filter(service => 
//         service.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         service.serviceDescription.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     if (selectedCategory !== "All") {
//       filtered = filtered.filter(service => service.category === selectedCategory);
//     }
    
//     setServices(filtered);
//   }, [searchTerm, selectedCategory]);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100
//       }
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       {/* Header */}
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="mb-12 text-center"
//       >
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">Discover Professional Services</h1>
//         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//           Browse through our curated selection of top-rated professional services tailored to meet your needs.
//         </p>
//       </motion.div>

//       {/* Search and Filter */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="mb-10"
//       >
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-md">
//           <div className="relative w-full md:w-1/2">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search services..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//           <div className="flex items-center gap-2 w-full md:w-auto">
//             <Filter size={20} className="text-gray-600" />
//             <div className="flex flex-wrap gap-2">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => setSelectedCategory(category)}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                     selectedCategory === category
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Service Cards */}
//       {isLoading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {[1, 2, 3, 4, 5, 6].map((i) => (
//             <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden h-96 animate-pulse">
//               <div className="h-48 bg-gray-200"></div>
//               <div className="p-5 space-y-4">
//                 <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//                 <div className="h-10 bg-gray-200 rounded w-1/3"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//         >
//           {services.length > 0 ? (
//             services.map((service) => (
//               <motion.div
//                 key={service._id}
//                 variants={itemVariants}
//                 whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                 className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:shadow-xl"
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={service.imageUrl || "/placeholder.svg"}
//                     alt={service.serviceTitle}
//                     className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                   />
//                   <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700 shadow-md">
//                     {service.category}
//                   </div>
//                 </div>
//                 <div className="p-6 flex-grow flex flex-col">
//                   <div className="flex items-center mb-2">
//                     <div className="flex items-center text-yellow-500">
//                       <Star className="h-4 w-4 fill-current" />
//                       <span className="ml-1 text-sm font-medium">{service.rating}</span>
//                     </div>
//                     <span className="mx-2 text-gray-400">•</span>
//                     <span className="text-sm text-gray-500">{service.reviewCount} reviews</span>
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-800 mb-2">{service.serviceTitle}</h3>
//                   <p className="text-gray-600 mb-4 line-clamp-2">{service.serviceDescription}</p>
//                   <div className="mt-auto space-y-3">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center text-gray-600">
//                         <Clock className="h-4 w-4 mr-1" />
//                         <span className="text-sm">{service.serviceDuration}</span>
//                       </div>
//                       <div className="flex items-center text-gray-600">
//                         <span className="text-sm">{service.yearsOfExperience} years exp.</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                       <div className="flex items-center">
//                         <IndianRupee className="h-5 w-5 text-blue-500" />
//                         <span className="text-xl font-bold text-gray-800">₹{service.servicePrice}</span>
//                       </div>
//                       <Link to={`/services/details/${service?.serviceId}`}>
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className="flex items-center text-blue-500 font-medium"
//                         >
//                           View Details
//                           <ChevronRight className="h-4 w-4 ml-1" />
//                         </motion.button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="col-span-full text-center py-16"
//             >
//               <div className="text-gray-500 text-lg">No services found matching your criteria</div>
//               <button
//                 onClick={() => {
//                   setSearchTerm("");
//                   setSelectedCategory("All");
//                 }}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//               >
//                 Clear Filters
//               </button>
//             </motion.div>
//           )}
//         </motion.div>
//       )}
//     </div>
//   );
// };



import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, DollarSign, Star, ChevronRight, Search, Filter, IndianRupee, FileText, AlertCircle, Briefcase } from 'lucide-react';
import { Link } from "react-router-dom";
import { useClientGetAllServicesMutation } from "@/hooks/ClientCustomHooks";

// Define the Service type based on the fields you mentioned
interface Service {
  id: string;
  serviceTitle: string;
  serviceDescription: string;
  servicePrice: number;
  serviceDuration: string;
  yearsOfExperience: number;
  additionalHourFee: number;
  cancellationPolicy: string;
  termsAndCondition: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  category: string;
}

// Categories for filtering
const categories = ["All", "Photography", "Development", "Design", "Fitness", "Legal"];

export const ServiceListings = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(6)

  const clientGetAllServicesMutation = useClientGetAllServicesMutation()  

  useEffect(() => {
    const timer = setTimeout(() => {
      clientGetAllServicesMutation.mutate(
        {
          page: currentPage,
          limit,
          search: searchTerm,
        sortOrder: "asc"
      },
      {
        onSuccess: (data) => {
          console.log(data)
          setServices(data.services.services)
          setIsLoading(false)
        },
        onError: (error) => {
          console.log(error)
        }
      }
    )
  },1000)
 
  return () => clearTimeout(timer)

}, [currentPage, limit, searchTerm])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentPage, limit, searchTerm]);

  // Filter services based on search term and category
  useEffect(() => {
    let filtered = services;
    
    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.serviceDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }
    
    setServices(filtered);
  }, [searchTerm, selectedCategory]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Discover Professional Services</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Browse through our curated selection of top-rated professional services tailored to meet your needs.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-md">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter size={20} className="text-gray-600" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Service Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden h-[450px] animate-pulse">
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.length > 0 ? (
            services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-md overflow-hidden h-[450px] flex flex-col transform transition-all duration-300 hover:shadow-xl border border-gray-100"
              >
                <div className="p-6 flex-grow flex flex-col bg-gradient-to-b from-gray-50 to-white">
                  {/* Category Tag */}
                  <div className="mb-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium inline-block self-start">
                    {service.category}
                  </div>
                  
                  {/* Title and Rating */}
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{service.serviceTitle}</h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">{service.rating}</span>
                      <span className="ml-1 text-xs text-gray-500">({service.reviewCount})</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.serviceDescription}</p>

                  {/* Service Details Grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-xs">Duration: {service.serviceDuration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-xs">Experience: {service.yearsOfExperience} yrs</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-xs">Extra Hour: ₹{service.additionalHourFee}</span>
                    </div>
                  </div>

                  {/* Cancellation Policy */}
                  <div className="flex items-start text-gray-600 mb-3">
                    <AlertCircle className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                    <span className="text-xs line-clamp-2">
                      <strong>Cancellation:</strong> {service.cancellationPolicy}
                    </span>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start text-gray-600 mb-4">
                    <FileText className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                    <span className="text-xs line-clamp-2">
                      <strong>Terms:</strong> {service.termsAndCondition}
                    </span>
                  </div>

                  {/* Price and View Details Button */}
                  <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                      <IndianRupee className="h-5 w-5 text-blue-500" />
                      <span className="text-xl font-bold text-blue-600">₹{service.servicePrice}</span>
                    </div>
                    <Link to={`/services/details/${service?.serviceId}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center text-blue-500 font-medium hover:text-blue-600 text-sm"
                      >
                        Book Now
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16"
            >
              <div className="text-gray-500 text-lg">No services found matching your criteria</div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};