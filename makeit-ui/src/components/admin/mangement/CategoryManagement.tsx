// import { useEffect, useState } from "react"
// import type React from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Search, FolderPlus, Filter, MoreVertical, Check, AlertCircle } from "lucide-react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { useCreateCategoryMutation, useGetAllCategoriesQuery, useUpdateCategoryStatusMutation } from "@/hooks/AdminCustomHooks"
// import toast from "react-hot-toast"

// interface Category {
//   title: string
//   description: string
// }

// export const CategoryManagement: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>([])

//   const [isAddModalOpen, setIsAddModalOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [newCategory, setNewCategory] = useState({ title: "", description: "" })
//   const [errors, setErrors] = useState({ title: "", description: "" })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [showSuccess, setShowSuccess] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)
//   const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)


//   const  createCategoryMutation = useCreateCategoryMutation()
//   const updateCategoryStatusMutation = useUpdateCategoryStatusMutation()

//   const filteredCategories = categories.filter(
//     (category) =>
//       category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       category.description.toLowerCase().includes(searchQuery.toLowerCase()),
//   )
//   console.log('categories',categories)

// const [currentPage, setCurrentPage] = useState(1);
// const limit = 10;

// const { data, isLoading, isError } = useGetAllCategoriesQuery({
//   search: searchQuery,
//   page:currentPage,
//   limit,
// });


// useEffect(() => {
//   if(data){
//     console.log('data',data)
//     setCategories(data.categories.items)
//     setCurrentPage(data.currentPage)
//   }
//  }, [data]);

 

//   const validateForm = () => {
//     const newErrors = { title: "", description: "" }
//     let isValid = true

//     if (!newCategory.title.trim()) {
//       newErrors.title = "Category title is required"
//       isValid = false
//     }

//     if (!newCategory.description.trim()) {
//       newErrors.description = "Description is required"
//       isValid = false
//     } else if (newCategory.description.length < 10) {
//       newErrors.description = "Description must be at least 10 characters"
//       isValid = false
//     }

//     setErrors(newErrors)
//     return isValid
//   }







//   const handleAddCategory = () => {
//     if (!validateForm()) return;
  
//     setIsSubmitting(true);
  
//     createCategoryMutation.mutate(
//       {
//         title: newCategory.title,
//         description: newCategory.description,
//       },
//       {
//         onSuccess: (response: any) => {
//           const newId = Math.max(...categories.map((c) => c.categoryId)) + 1;
//           const categoryToAdd = {
//             id: newId,
//             title: newCategory.title,
//             description: newCategory.description,
//             events: 0,
//             status: "Active" as const,
//           };
//           toast.success(response.message)
//           setCategories([...categories, categoryToAdd]);
//           setShowSuccess(true);
//           setIsSubmitting(false);
  
//           setTimeout(() => {
//             setNewCategory({ title: "", description: "" });
//             setShowSuccess(false);
//             setIsAddModalOpen(false);
//           }, 1500);
//         },
//         onError: (error: any) => {
//           console.error("Failed to create category:", error);
//           toast.error(error?.response?.data?.message)
//           setIsSubmitting(false);
//         },
//       }
//     );
//   };







//   const handleStatusChange = (id: string, newStatus: "active" | "inactive") => {
//     updateCategoryStatusMutation.mutate(
//       {
//         id,
//         status: newStatus,
//       },
//       {
//         onSuccess: (response: any) => {
//           setCategories(categories.map((category) => (category.categoryId === id ? { ...category, status: newStatus } : category)))
//           toast.success(response.message)
//         },
//         onError: (error: any) => {
//           console.log('error',error)
//           toast.error(error?.response?.data?.message)
//         }
//       }
//     )
    
//   }




//   return (
//     <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Category Management</h1>
//         <Button
//           onClick={() => setIsAddModalOpen(true)}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center"
//         >
//           <FolderPlus size={16} className="mr-2" />
//           Add Category
//         </Button>
//       </div>

//       <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
//         <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
//           <div className="flex items-center bg-gray-700/50 rounded-lg px-3 py-2 flex-1 border border-gray-700 focus-within:border-indigo-500 transition-colors">
//             <Search size={18} className="text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search categories..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="bg-transparent border-none w-full ml-2 focus:outline-none text-gray-200"
//             />
//           </div>
//           <Button variant="outline" className="bg-gray-700/50 hover:bg-gray-700 border-gray-700">
//             <Filter size={16} className="mr-2" />
//             Filter
//           </Button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
//                 <th className="pb-3 font-medium">Name</th>
//                 <th className="pb-3 font-medium">Description</th>
//                 <th className="pb-3 font-medium">Status</th>
//                 <th className="pb-3 font-medium">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="text-sm">
//               {filteredCategories.map((category) => (
//                 <tr key={category._id} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
//                   <td className="py-3 font-medium text-gray-200">{category.title}</td>
//                   <td className="py-3 text-gray-300">{category.description}</td>
//                   <td className="py-3">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs ${
//                         category.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
//                       }`}
//                     >
//                       {category.status}
//                     </span>
//                   </td>
//                   <td className="py-3">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-200">
//                           <MoreVertical size={16} />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-gray-200">
//                         <DropdownMenuItem
//                               className="hover:bg-gray-700 cursor-pointer"
//                               onClick={() => {
//                                 setIsEditing(true)
//                                 setEditingCategoryId(category._id)
//                                 setNewCategory({ title: category.title, description: category.description })
//                                 setIsAddModalOpen(true)
//                               }}
//                             >
//                               Edit
//                         </DropdownMenuItem>                       
//                        {category.status === "active" ? (
//                           <DropdownMenuItem
//                             className="text-red-400 hover:bg-gray-700 cursor-pointer"
//                             onClick={() => handleStatusChange(category.categoryId, "inactive")}
//                           >
//                             Deactivate
//                           </DropdownMenuItem>
//                         ) : (
//                           <DropdownMenuItem
//                             className="text-green-400 hover:bg-gray-700 cursor-pointer"
//                             onClick={() => handleStatusChange(category.categoryId, "active")}
//                           >
//                             Activate
//                           </DropdownMenuItem>
//                         )}
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {filteredCategories.length === 0 && (
//           <div className="text-center py-8 text-gray-400">
//             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
//               No categories found matching your search.
//             </motion.div>
//           </div>
//         )}

//         <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400">
//           <span>
//             Showing {filteredCategories.length} of {categories.length} categories
//           </span>
//           <div className="flex mt-4 md:mt-0">
//             <Button
//               variant="outline"
//               size="sm"
//               className="mr-2 bg-gray-700/50 border-gray-700 text-gray-300 opacity-50 cursor-not-allowed"
//               disabled
//             >
//               Previous
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               className="bg-gray-700/50 border-gray-700 text-gray-300 opacity-50 cursor-not-allowed"
//               disabled
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Add Category Modal */}
//       <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//         <DialogContent className="bg-gray-800 text-gray-200 border-gray-700 sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-xl text-gray-100">Add New Category</DialogTitle>
//             <DialogDescription className="text-gray-400">
//               Create a new category for organizing events.
//             </DialogDescription>
//           </DialogHeader>

//           <AnimatePresence>
//             {showSuccess ? (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="bg-green-900/20 border border-green-700 rounded-lg p-4 flex items-center text-green-400 my-4"
//               >
//                 <Check className="h-5 w-5 mr-2 flex-shrink-0" />
//                 <span>Category added successfully!</span>
//               </motion.div>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="space-y-4 py-2"
//               >
//                 <div className="space-y-2">
//                   <Label htmlFor="title" className="text-gray-200">
//                     Category Name
//                   </Label>
//                   <Input
//                     id="title"
//                     value={newCategory.title}
//                     onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
//                     placeholder="e.g. Workshops"
//                     className={`bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500 ${
//                       errors.title ? "border-red-500" : ""
//                     }`}
//                   />
//                   {errors.title && (
//                     <motion.p
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="text-red-400 text-sm flex items-center mt-1"
//                     >
//                       <AlertCircle className="h-3 w-3 mr-1" />
//                       {errors.title}
//                     </motion.p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="description" className="text-gray-200">
//                     Description
//                   </Label>
//                   <Textarea
//                     id="description"
//                     value={newCategory.description}
//                     onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
//                     placeholder="Describe what this category is about..."
//                     rows={4}
//                     className={`bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500 ${
//                       errors.description ? "border-red-500" : ""
//                     }`}
//                   />
//                   {errors.description && (
//                     <motion.p
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="text-red-400 text-sm flex items-center mt-1"
//                     >
//                       <AlertCircle className="h-3 w-3 mr-1" />
//                       {errors.description}
//                     </motion.p>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <div className="flex justify-end gap-3 mt-2">
//             <Button
//               variant="outline"
//               onClick={() => setIsAddModalOpen(false)}
//               className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-gray-100"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleAddCategory}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white"
//               disabled={isSubmitting || showSuccess}
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Adding...
//                 </div>
//               ) : (
//                  isEditing ? "Update Category" : "Add Category"
//               )}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </motion.div>
//   )
// }







import { useEffect, useState } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, FolderPlus, Filter, MoreVertical, Check, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCreateCategoryMutation, useGetAllCategoriesQuery, useUpdateCategoryStatusMutation, useEditCategoryMutation } from "@/hooks/AdminCustomHooks"
import toast from "react-hot-toast"

interface Category {
  title: string
  description: string
}

export const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [newCategory, setNewCategory] = useState({ title: "", description: "" })
  const [errors, setErrors] = useState({ title: "", description: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)


  const createCategoryMutation = useCreateCategoryMutation()
  const updateCategoryStatusMutation = useUpdateCategoryStatusMutation()
  const editCategoryMutation = useEditCategoryMutation()

  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  console.log('categories',categories)

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetAllCategoriesQuery({
    search: searchQuery,
    page: currentPage,
    limit,
  });

  useEffect(() => {
    if(data){
      console.log('data',data)
      setCategories(data.categories.items)
      setCurrentPage(data.currentPage)
    }
  }, [data]);

  // Reset form state when modal is closed
  const handleModalOpenChange = (open: boolean) => {
    setIsAddModalOpen(open);
    if (!open) {
      resetFormState();
    }
  };

  // Reset all form-related state
  const resetFormState = () => {
    setNewCategory({ title: "", description: "" });
    setErrors({ title: "", description: "" });
    setIsEditing(false);
    setEditingCategoryId(null);
    setShowSuccess(false);
    setIsSubmitting(false);
  };

  const validateForm = () => {
    const newErrors = { title: "", description: "" }
    let isValid = true

    if (!newCategory.title.trim()) {
      newErrors.title = "Category title is required"
      isValid = false
    }

    if (!newCategory.description.trim()) {
      newErrors.description = "Description is required"
      isValid = false
    } else if (newCategory.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleAddOrUpdateCategory = () => {
    if (!validateForm()) return;
  
    setIsSubmitting(true);
    
    if (isEditing && editingCategoryId) {
      editCategoryMutation.mutate(
        {
          id: editingCategoryId,
          description: newCategory.description,
          title: newCategory.title,
        },
        {
          onSuccess: (response: any) => {
            toast.success(response.message)
            setShowSuccess(true);
            setIsSubmitting(false);
            
            setTimeout(() => {
              resetFormState();
              setIsAddModalOpen(false);
            }, 1500);
          },
          onError: (error: any) => {
            console.error("Failed to update category:", error);
            toast.error(error?.response?.data?.message || "Failed to update category")
            setIsSubmitting(false);
          },
        }
      )
    } else {
      // Handle adding new category
      createCategoryMutation.mutate(
        {
          title: newCategory.title,
          description: newCategory.description,
        },
        {
          onSuccess: (response: any) => {
            const newId = Math.max(...categories.map((c) => c.categoryId || 0)) + 1;
            const categoryToAdd = {
              categoryId: newId.toString(),
              _id: newId.toString(),
              title: newCategory.title,
              description: newCategory.description,
              events: 0,
              status: "active",
            };
            toast.success(response.message)
            setCategories([...categories, categoryToAdd]);
            setShowSuccess(true);
            setIsSubmitting(false);
      
            setTimeout(() => {
              resetFormState();
              setIsAddModalOpen(false);
            }, 1500);
          },
          onError: (error: any) => {
            console.error("Failed to create category:", error);
            toast.error(error?.response?.data?.message || "Failed to create category")
            setIsSubmitting(false);
          },
        }
      );
    }
  };



  const handleOpenAddModal = () => {
    resetFormState(); // Clear any previous state
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (category: any) => {
    setIsEditing(true);
    setEditingCategoryId(category._id);
    setNewCategory({ 
      title: category.title, 
      description: category.description 
    });
    setIsAddModalOpen(true);
  };



  const handleStatusChange = (id: string, newStatus: "active" | "inactive") => {
    updateCategoryStatusMutation.mutate(
      {
        id,
        status: newStatus,
      },
      {
        onSuccess: (response: any) => {
          setCategories(categories.map((category) => 
            (category.categoryId === id ? { ...category, status: newStatus } : category)
          ))
          toast.success(response.message)
        },
        onError: (error: any) => {
          console.log('error',error)
          toast.error(error?.response?.data?.message || "Failed to update status")
        }
      }
    )
  }

  return (
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Button
          onClick={handleOpenAddModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center"
        >
          <FolderPlus size={16} className="mr-2" />
          Add Category
        </Button>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex items-center bg-gray-700/50 rounded-lg px-3 py-2 flex-1 border border-gray-700 focus-within:border-indigo-500 transition-colors">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none w-full ml-2 focus:outline-none text-gray-200"
            />
          </div>
          <Button variant="outline" className="bg-gray-700/50 hover:bg-gray-700 border-gray-700">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredCategories.map((category) => (
                <tr key={category._id} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                  <td className="py-3 font-medium text-gray-200">{category.title}</td>
                  <td className="py-3 text-gray-300">{category.description}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        category.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {category.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-200">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-gray-200">
                        <DropdownMenuItem
                          className="hover:bg-gray-700 cursor-pointer"
                          onClick={() => handleOpenEditModal(category)}
                        >
                          Edit
                        </DropdownMenuItem>                       
                        {category.status === "active" ? (
                          <DropdownMenuItem
                            className="text-red-400 hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleStatusChange(category.categoryId, "inactive")}
                          >
                            Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="text-green-400 hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleStatusChange(category.categoryId, "active")}
                          >
                            Activate
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              No categories found matching your search.
            </motion.div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400">
          <span>
            Showing {filteredCategories.length} of {categories.length} categories
          </span>
          <div className="flex mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="mr-2 bg-gray-700/50 border-gray-700 text-gray-300 opacity-50 cursor-not-allowed"
              disabled
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-700/50 border-gray-700 text-gray-300 opacity-50 cursor-not-allowed"
              disabled
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogContent className="bg-gray-800 text-gray-200 border-gray-700 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-gray-100">
              {isEditing ? "Edit Category" : "Add New Category"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {isEditing ? "Update existing category details." : "Create a new category for organizing events."}
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence>
            {showSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-green-900/20 border border-green-700 rounded-lg p-4 flex items-center text-green-400 my-4"
              >
                <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{isEditing ? "Category updated successfully!" : "Category added successfully!"}</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 py-2"
              >
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-200">
                    Category Name
                  </Label>
                  <Input
                    id="title"
                    value={newCategory.title}
                    onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                    placeholder="e.g. Workshops"
                    className={`bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500 ${
                      errors.title ? "border-red-500" : ""
                    }`}
                  />
                  {errors.title && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm flex items-center mt-1"
                    >
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.title}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-200">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    placeholder="Describe what this category is about..."
                    rows={4}
                    className={`bg-gray-700 border-gray-600 text-gray-200 focus:border-indigo-500 ${
                      errors.description ? "border-red-500" : ""
                    }`}
                  />
                  {errors.description && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm flex items-center mt-1"
                    >
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.description}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-end gap-3 mt-2">
            <Button
              variant="outline"
              onClick={() => handleModalOpenChange(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-gray-100"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddOrUpdateCategory}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={isSubmitting || showSuccess}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {isEditing ? "Updating..." : "Adding..."}
                </div>
              ) : (
                isEditing ? "Update Category" : "Add Category"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}