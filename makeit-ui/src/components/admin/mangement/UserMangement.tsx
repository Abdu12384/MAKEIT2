import { useState } from "react"
import { useGetAllUsers } from "@/hooks/AdminCustomHooks"
import type React from "react"
import { motion } from "framer-motion"
import { Search, UserPlus, Filter, MoreVertical } from 'lucide-react'
import { Pagination1 } from "@/components/common/paginations/Pagination"
import { IClient } from "@/types/User"


interface ClientManagementProps {
  clients: IClient[];
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  isError: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPageChange: (page: number) => void;
  // onStatusUpdate: (userId: string) => Promise<void>;
}
export const ClientManagementComponent: React.FC<ClientManagementProps> = ({
  clients,
  totalPages,
  currentPage,
  isLoading,
  isError,
  searchQuery,
  onSearchChange,
  onPageChange,
  // onStatusUpdate,
}) => {
  console.log(clients)
  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center text-sm transition-colors">
          <UserPlus size={16} className="mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex items-center bg-gray-700/50 rounded-lg px-3 py-2 flex-1">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
               value={searchQuery}
               onChange={(e)=> onSearchChange(e.target.value)}
              placeholder="Search users..." 
              className="bg-transparent border-none w-full ml-2 focus:outline-none"
            />
          </div>
          <button className="flex items-center bg-gray-700/50 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
        </div>
       
       {isLoading ? (
         <p className="text-white">Loading...</p>
       ): isError ? (
         <p className="text-red-500">Error loading users</p>
       ) : (
          
         <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Role</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Events</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {clients.map((user) => (
                <tr key={user?.userId} className="border-b border-gray-700">
                  <td className="py-3">{user.name}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">{user.role}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "active" 
                      ? "bg-green-500/10 text-green-500" 
                      : "bg-red-500/10 text-red-500"
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3">{user.events}</td>
                  <td className="py-3">
                    <button className="p-1 hover:bg-gray-700 rounded-md transition-colors">
                      <MoreVertical size={16} />
                    </button>
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
    </motion.div>
  )
}
