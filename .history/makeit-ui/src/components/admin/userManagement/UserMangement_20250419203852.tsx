"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Search, UserPlus, Filter, MoreVertical } from 'lucide-react'

export const UserManagement: React.FC = () => {
  const users = [
    { id: 1, name: "John Smith", email: "john.smith@example.com", role: "Attendee", status: "Active", events: 5 },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@example.com", role: "Organizer", status: "Active", events: 12 },
    { id: 3, name: "Michael Brown", email: "michael.b@example.com", role: "Attendee", status: "Inactive", events: 3 },
    { id: 4, name: "Emily Davis", email: "emily.d@example.com", role: "Attendee", status: "Active", events: 8 },
    { id: 5, name: "Robert Wilson", email: "robert.w@example.com", role: "Organizer", status: "Active", events: 15 },
    { id: 6, name: "Jennifer Lee", email: "jennifer.l@example.com", role: "Attendee", status: "Inactive", events: 2 },
    { id: 7, name: "David Martinez", email: "david.m@example.com", role: "Attendee", status: "Active", events: 7 },
  ]

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
              placeholder="Search users..." 
              className="bg-transparent border-none w-full ml-2 focus:outline-none"
            />
          </div>
          <button className="flex items-center bg-gray-700/50 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition-colors">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
        </div>

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
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-700">
                  <td className="py-3">{user.name}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">{user.role}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "Active" 
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

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400">
          <span>Showing 1-7 of 7 users</span>
          <div className="flex mt-4 md:mt-0">
            <button className="px-3 py-1 rounded-md bg-gray-700/50 text-gray-300 mr-2 opacity-50 cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 rounded-md bg-gray-700/50 text-gray-300 opacity-50 cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
