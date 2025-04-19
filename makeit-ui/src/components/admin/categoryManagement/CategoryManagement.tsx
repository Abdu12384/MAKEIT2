"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Search, FolderPlus, Filter, MoreVertical } from 'lucide-react'

export const CategoryManagement: React.FC = () => {
  const categories = [
    {
      id: 1,
      name: "Conferences",
      description: "Professional gatherings for networking and learning",
      events: 15,
      status: "Active",
    },
    { id: 2, name: "Concerts", description: "Live music performances", events: 23, status: "Active" },
    { id: 3, name: "Workshops", description: "Interactive learning sessions", events: 12, status: "Active" },
    {
      id: 4,
      name: "Exhibitions",
      description: "Display of products, services, or artwork",
      events: 8,
      status: "Active",
    },
    { id: 5, name: "Corporate Events", description: "Business-related gatherings", events: 19, status: "Active" },
    { id: 6, name: "Weddings", description: "Celebration of marriage", events: 0, status: "Inactive" },
  ]

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center text-sm transition-colors">
          <FolderPlus size={16} className="mr-2" />
          Add Category
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex items-center bg-gray-700/50 rounded-lg px-3 py-2 flex-1">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search categories..." 
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
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium">Events</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-gray-700">
                  <td className="py-3">{category.name}</td>
                  <td className="py-3">{category.description}</td>
                  <td className="py-3">{category.events}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      category.status === "Active" 
                        ? "bg-green-500/10 text-green-500" 
                        : "bg-red-500/10 text-red-500"
                    }`}>
                      {category.status}
                    </span>
                  </td>
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
          <span>Showing 1-6 of 6 categories</span>
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
