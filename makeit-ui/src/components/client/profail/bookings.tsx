import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, User, Search, Filter, ChevronDown } from "lucide-react"

type Booking = {
  id: string
  title: string
  date: string
  time: string
  location: string
  client: string
  status: "upcoming" | "completed" | "cancelled"
}

export default function ClientBookings() {
  const [filter, setFilter] = useState<string>("all")

  const bookings: Booking[] = [
    {
      id: "1",
      title: "Website Consultation",
      date: "May 10, 2025",
      time: "10:00 AM - 11:30 AM",
      location: "Virtual Meeting",
      client: "Acme Inc.",
      status: "upcoming",
    },
    {
      id: "2",
      title: "Project Review",
      date: "May 12, 2025",
      time: "2:00 PM - 3:00 PM",
      location: "Office - Room 302",
      client: "TechStart LLC",
      status: "upcoming",
    },
    {
      id: "3",
      title: "Design Workshop",
      date: "May 15, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Creative Space",
      client: "Design Partners",
      status: "upcoming",
    },
    {
      id: "4",
      title: "Client Onboarding",
      date: "May 5, 2025",
      time: "11:00 AM - 12:00 PM",
      location: "Virtual Meeting",
      client: "New Ventures",
      status: "completed",
    },
    {
      id: "5",
      title: "Strategy Session",
      date: "May 3, 2025",
      time: "3:30 PM - 5:00 PM",
      location: "Conference Room A",
      client: "Global Solutions",
      status: "completed",
    },
    {
      id: "6",
      title: "Product Demo",
      date: "May 8, 2025",
      time: "10:00 AM - 11:00 AM",
      location: "Client Office",
      client: "Innovate Corp",
      status: "cancelled",
    },
  ]

  const filteredBookings = filter === "all" ? bookings : bookings.filter((booking) => booking.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold dark:text-white">Bookings</h1>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>
          <div className="relative">
            <button className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>
                  {filter === "all"
                    ? "All Bookings"
                    : filter === "upcoming"
                      ? "Upcoming"
                      : filter === "completed"
                        ? "Completed"
                        : "Cancelled"}
                </span>
              </div>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute right-0 z-10 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="py-1">
                <button
                  onClick={() => setFilter("all")}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  All Bookings
                </button>
                <button
                  onClick={() => setFilter("upcoming")}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilter("cancelled")}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancelled
                </button>
              </div>
            </div>
          </div>
          <button className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
            New Booking
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex flex-col p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold dark:text-white">{booking.title}</h3>
                  <span
                    className={`ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(booking.status)}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2 text-sm text-gray-500 dark:text-gray-400 sm:grid-cols-2">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {booking.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {booking.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    {booking.location}
                  </div>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {booking.client}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                {booking.status === "upcoming" && (
                  <>
                    <button className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-gray-600">
                      Reschedule
                    </button>
                    <button className="rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700">
                      View Details
                    </button>
                  </>
                )}
                {booking.status === "completed" && (
                  <button className="rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700">
                    View Summary
                  </button>
                )}
                {booking.status === "cancelled" && (
                  <button className="rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700">
                    Reschedule
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
