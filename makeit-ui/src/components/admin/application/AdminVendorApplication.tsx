import { motion } from "framer-motion"
import { Search, Filter, Store, CheckCircle, XCircle, Eye } from "lucide-react"
import { Pagination1 } from "@/components/common/paginations/Pagination"
import { Button } from "@/components/ui/button"
import type React from "react"
import type { IVendor } from "@/types/User"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/common/textArea/TextArea"
import { ConfirmationButton } from "@/components/common/customButtons/ConfirmButton"
import { VendorView } from "./ViewApplication"
// import { Textarea } from "@/components/ui/textarea"

interface VendorApplicationListProps {
  vendor: IVendor[]
  totalPages: number
  currentPage: number
  isLoading: boolean
  isError: boolean
  searchQuery: string
  onSearchChange: (query: string) => void
  onPageChange: (page: number) => void
  onUpdateStatus: (vendorId: string, status: string, reason?: string) => void
  onViewVendor?: (vendorId: string) => void
}

export const VendorApplicationList: React.FC<VendorApplicationListProps> = ({
  vendor,
  totalPages,
  currentPage,
  searchQuery,
  isLoading,
  isError,
  onSearchChange,
  onPageChange,
  onUpdateStatus,
  onViewVendor,
}) => {
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null)
  const [selectedVendorView, setSelectedVendorView]= useState<IVendor | undefined>()
 
  const handleRejectClick = (vendorId: string) => {
    setSelectedVendorId(vendorId)
    setIsRejectDialogOpen(true)
  }

  const handleConfirmReject = () => {
    if (selectedVendorId) {
      onUpdateStatus(selectedVendorId, "pending", rejectionReason)
      setIsRejectDialogOpen(false)
      setRejectionReason("")
      setSelectedVendorId(null)
    }
  }

 


  const handleViewVendor = (vendorI: IVendor) => {
    setSelectedVendorView(vendorI); // Set the ID to render VendorDetails
  };


  return (
    <>
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vendor Applications</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center text-sm transition-colors">
          <Store size={16} className="mr-2" />
          Add Vendor
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex items-center bg-gray-700/50 rounded-lg px-3 py-2 flex-1">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent border-none w-full ml-2 focus:outline-none"
            />
          </div>
          <button className="flex items-center bg-gray-700/50 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
        </div>

        {isLoading ? (
          <p className="text-gray-400 text-sm">Loading applications...</p>
        ) : isError ? (
          <p className="text-red-500 text-sm">Failed to load applications. Please try again.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Online Status</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {vendor.map((vendor) => (
                  <tr key={vendor?.userId} className="border-b border-gray-700">
                    <td className="py-3">{vendor.name}</td>
                    <td className="py-3">{vendor?.category}</td>
                    <td className="py-3">{vendor?.email}</td>
                    <td className="py-3">{vendor?.onlineStatus}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          vendor?.status === "active"
                            ? "bg-green-500/10 text-green-500"
                            : vendor?.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {vendor.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer border-blue-200 flex items-center"
                          onClick={() => handleViewVendor(vendor as IVendor)}
                        >
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>

                        {vendor.status === "pending" ? (
                          <>
                           <ConfirmationButton
                                buttonText="Approve"
                                buttonIcon={<CheckCircle size={14} className="mr-1" />}
                                buttonType="success"
                                confirmTitle="Confirm Approval"
                                confirmMessage={`Are you sure you want to approve ${vendor.name}?`}
                                confirmText="Approve"
                                onConfirm={() => onUpdateStatus(vendor.userId as string, "active")}
                              />
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer border-red-200 flex items-center"
                              onClick={() => handleRejectClick(vendor.userId as string)}
                            >
                              <XCircle size={14} className="mr-1" />
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className={
                              vendor.status === "active"
                                ? "bg-green-50 text-green-600 hover:bg-green-100 cursor-pointer border-green-200"
                                : "bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer border-red-200"
                            }
                          >
                            {vendor.status === "active" ? "Approved" : "Rejected"}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex justify-center items-center">
          <Pagination1
            currentPage={currentPage}
            totalPages={totalPages}
            onPageNext={() => onPageChange(currentPage + 1)}
            onPagePrev={() => onPageChange(currentPage - 1)}
          />
        </div>
      </div>

      {/* Rejection Reason Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Reject Vendor Application</DialogTitle>
            <DialogDescription className="text-gray-400">
              Please provide a reason for rejecting this vendor application.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
              className="bg-transparent text-white border-gray-600 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmReject} className="bg-red-600 hover:bg-red-700 text-white">
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
    {selectedVendorView && (
        <div className="mt-6">
          <VendorView vendor={selectedVendorView} onBack={()=> setSelectedVendorView()}/>
        </div>
      )}
    </>
  )
}
