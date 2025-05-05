"use client"
import { motion, AnimatePresence } from "framer-motion"
import { NavLink } from "react-router-dom"
import { User, Calendar, Settings, Home, CreditCard, BarChart3, HelpCircle, ChevronLeft } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navItems = [
    { icon: User, label: "Profile", path: "/client/profile" },
    { icon: Calendar, label: "Bookings", path: "/client/bookings" },
    { icon: CreditCard, label: "Payments", path: "/client/payments" },
    { icon: BarChart3, label: "Analytics", path: "/client/analytics" },
    { icon: Settings, label: "Settings", path: "/client/settings" },
    { icon: HelpCircle, label: "Help", path: "/client/help" },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 lg:static"
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
                <span className="text-xl font-semibold dark:text-white">ClientDash</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="User avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
