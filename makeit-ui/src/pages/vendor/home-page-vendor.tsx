import { useState, useEffect } from "react"
import { PenTool, Utensils, Camera, Music, Mic, Truck } from "lucide-react"
import { Header } from "@/components/vendor/vendor-homePage-component/header"
import { BannerCarousel } from "@/components/vendor/vendor-homePage-component/banner"
import { ServicesSection } from "@/components/vendor/vendor-homePage-component/service-section"
import { WelcomeStats } from "@/components/vendor/vendor-homePage-component/welcome-stats"
import { EventsSection } from "@/components/vendor/vendor-homePage-component/event-section"
import { CalendarSection } from "@/components/vendor/vendor-homePage-component/calender"
import { NotificationsSection } from "@/components/vendor/vendor-homePage-component/notifcation"

import { Sidebar } from "@/components/vendor/vendor-homePage-component/sidebar"
import { Footer } from "@/components/vendor/vendor-homePage-component/footer"

// Import components

// Sample data
const bannerImages = [
  {
    id: 1,
    url: "/placeholder.svg?height=600&width=1200",
    title: "Premium Event Services",
    subtitle: "Create unforgettable experiences",
  },
  {
    id: 2,
    url: "/placeholder.svg?height=600&width=1200",
    title: "Seamless Event Management",
    subtitle: "From planning to execution",
  },
  {
    id: 3,
    url: "/placeholder.svg?height=600&width=1200",
    title: "Grow Your Business",
    subtitle: "Connect with more clients",
  },
]

const services = [
  {
    id: 1,
    name: "Venue Decoration",
    icon: PenTool,
    description: "Transform spaces into stunning event venues with our decoration services",
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: 2,
    name: "Catering Services",
    icon: Utensils,
    description: "Delicious food options for all types of events and dietary requirements",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 3,
    name: "Photography",
    icon: Camera,
    description: "Capture your special moments with our professional photography services",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    name: "Live Music",
    icon: Music,
    description: "Enhance your event with live music performances tailored to your taste",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 5,
    name: "Sound System",
    icon: Mic,
    description: "High-quality sound systems for speeches, music, and announcements",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 6,
    name: "Transportation",
    icon: Truck,
    description: "Reliable transportation services for guests and equipment",
    color: "bg-purple-100 text-purple-600",
  },
]

const upcomingEvents = [
  {
    id: 1,
    name: "Wedding Expo 2023",
    date: "Nov 15, 2023",
    location: "Grand Plaza",
    status: "Confirmed",
    attendees: 500,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    name: "Corporate Summit",
    date: "Nov 22, 2023",
    location: "Business Center",
    status: "Pending",
    attendees: 250,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    name: "Tech Conference",
    date: "Dec 05, 2023",
    location: "Innovation Hub",
    status: "Confirmed",
    attendees: 800,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    name: "Holiday Gala",
    date: "Dec 18, 2023",
    location: "Luxury Hotel",
    status: "Confirmed",
    attendees: 350,
    image: "/placeholder.svg?height=300&width=400",
  },
]

const notifications = [
  { id: 1, message: "New booking request for Corporate Summit", time: "2 hours ago", isNew: true },
  { id: 2, message: "Payment received for Wedding Expo", time: "Yesterday", isNew: true },
  { id: 3, message: "Client message: Need to discuss catering options", time: "2 days ago", isNew: false },
  { id: 4, message: "Reminder: Update your availability calendar", time: "3 days ago", isNew: false },
]

const VendorHomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeNotifications, setActiveNotifications] = useState(2)
  const [isLiveIndicatorVisible, setIsLiveIndicatorVisible] = useState(true)

  // Update time every minute to simulate real-time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    // Simulate real-time notifications
    const notificationTimer = setInterval(() => {
      // Randomly toggle the live indicator to simulate activity
      setIsLiveIndicatorVisible((prev) => !prev)
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(notificationTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 relative overflow-x-hidden">
      {/* Header */}
      <Header
        currentTime={currentTime}
        isLiveIndicatorVisible={isLiveIndicatorVisible}
        activeNotifications={activeNotifications}
        openSidebar={() => setIsSidebarOpen(true)}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Banner Carousel */}
        <BannerCarousel images={bannerImages} />

        {/* Services Section */}
        <ServicesSection services={services} />

        {/* Welcome Stats */}
        <WelcomeStats />

        {/* Upcoming Events */}
        <EventsSection events={upcomingEvents} />

        {/* Bottom Section: Calendar and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Preview */}
          <CalendarSection />

          {/* Notifications */}
          <NotificationsSection notifications={notifications} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  )
}

export default VendorHomePage
