import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  Users,
  FileBarChart2,
  Home,
  PlusCircle,
  UserCircle,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useLogoutClient } from "@/hooks/ClientCustomHooks"
import { useDispatch } from "react-redux"
import { clientLogout } from "@/store/slices/client.slice"
import toast from "react-hot-toast"




interface NavbarProps {
  user?: {
    name: string
    email: string
    avatar?: string
  }
  onLogin: () => void
  onLogout: () => void
}

export const Navbar: React.FC = () => {
  
  const { isLoggedIn, client } = useSelector((state: RootState) => state.client)
  const dispatch = useDispatch()
  
  const { mutate: logout, isLoading } = useLogoutClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (data) => {
          dispatch(clientLogout());
          setTimeout(() => {
          }, 2000);
          toast.success(data.message);
          // navigate("/admin");
        },
        onError: (err: any) => {
          toast.error(err.response.data.message);
        },
      });
    };
  const navigate  = useNavigate()

  return (
    <nav className="">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg
                className="h-8 w-8 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="ml-2 text-xl font-bold">
              <span className="text-white">Make</span>
              <span className="text-red-500">It</span>
            </span>           
             </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink active={true} icon={<Home size={18} />}>Home</NavLink>
            <NavLink icon={<CalendarCheck size={18} />}>Events</NavLink>
            <NavLink icon={<Users size={18} />}>Vendors</NavLink>

          </div>

          {/* User Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <UserCircle size={24} />
                <span>{client?.name || "User"}</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                // onClick={onLogin}
                onClick={()=>navigate('/login')}
                className="px-4 py-2 text-white hover:cursor-pointer rounded text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
        <MobileNavLink active={true} icon={<LayoutDashboard size={18} />}>Dashboard</MobileNavLink>
        <MobileNavLink icon={<CalendarCheck size={18} />}>Events</MobileNavLink>
        <MobileNavLink icon={<CalendarDays size={18} />}>Calendar</MobileNavLink>
        <MobileNavLink icon={<Users size={18} />}>Vendors</MobileNavLink>

        {/* Mobile Add Button */}
        {isLoggedIn && (
          <MobileNavLink icon={<PlusCircle size={18} />}>Add</MobileNavLink>
        )}

        {/* Mobile Auth Section */}
        {isLoggedIn ? (
          <div className="flex items-center space-x-2 px-3 py-2 text-white">
            <UserCircle size={22} />
            <span>{client?.name || "User"}</span>
            <button
              // onClick={onLogout}
              className="ml-auto text-sm bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={()=>navigate('/login')}
            className="w-full text-left px-3 py-2 text-white bg-i-600 hover:bg-indigo-700 rounded"
          >
            Login 
          </button>
        )}
      </div>
    </nav>
  )
}

interface NavLinkProps {
  children: React.ReactNode
  active?: boolean
  icon?: React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = ({ children, active = false, icon }) => {
  return (
    <a
      href="#"
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white transition"
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </a>
  )
}

const MobileNavLink: React.FC<NavLinkProps> = ({ children, active = false, icon }) => {
  return (
    <a
      href="#"
      className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
        active
          ? "bg-gray-900 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white transition"
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </a>
  )
}
