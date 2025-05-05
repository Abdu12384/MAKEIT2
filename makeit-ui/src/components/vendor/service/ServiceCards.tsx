import { motion } from "framer-motion"
import { Clock, DollarSign, Calendar, Award, MoreVertical, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ServiceCardProps {
  service: {
    _id: string
    serviceTitle: string
    serviceCategory: string
    yearsOfExperience: number
    servicePrice: number
    serviceDuration: number
    serviceDescription: string
  }
  onEdit: () => void
  onDelete: () => void
}

export const ServiceCard = ({ service, onEdit, onDelete }: ServiceCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <motion.div variants={cardVariants} whileHover="hover" layout>
      <Card className="h-full overflow-hidden border-gray-200">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3"></div>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{service.serviceTitle}</h3>
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                  {service.serviceCategory}
                </Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-gray-600 mt-3 line-clamp-2">{service.serviceDescription}</p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Award className="h-4 w-4 mr-2 text-indigo-500" />
                <span>{service.yearsOfExperience} years of experience</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                <span>{service.serviceDuration} hours duration</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2 text-indigo-500" />
                <span>₹{service.servicePrice}/hour</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-600 w-full">
            <Calendar className="h-4 w-4 mr-2 text-indigo-500 flex-shrink-0" />
            {/* <span className="truncate">
              {service.availableDates.length > 0
                ? `Available: ${new Date(service.availableDates[0]).toLocaleDateString()}`
                : "No available dates"}
            </span> */}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
