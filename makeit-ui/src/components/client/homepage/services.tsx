import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/media-query/use-media-query"
import bgIMG from '@/assets/images/servicebackround.jpg'
import bgIMG2 from '@/assets/images/servicebg.webp'
const services = [
  {
    title: "Event Planning",
    description: "Professional event planners to organize your perfect occasion",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Catering Services",
    description: "Delicious food and beverages for any type of event",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Entertainment",
    description: "Live music, DJs, and performers to elevate your event",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Photography",
    description: "Capture your special moments with our professional photographers",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Decoration",
    description: "Transform your venue with stunning decorations and themes",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Vendor Supplies",
    description: "Quality supplies and equipment for vendors and event organizers",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [cardsPerView, setCardsPerView] = useState(3)

  // Update cards per view based on screen size
  useEffect(() => {
    setCardsPerView(isMobile ? 1 : 3)
  }, [isMobile])

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Transform scale based on scroll position
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [5, 0, 0, 5])

  const nextSlide = () => {
    if (activeIndex < services.length - cardsPerView) {
      setActiveIndex(activeIndex + 1)
    } else {
      setActiveIndex(0)
    }
  }

  const prevSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    } else {
      setActiveIndex(services.length - cardsPerView)
    }
  }

  return (
    <motion.section
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background with zoom effect on scroll */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgIMG2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale,
          filter: `blur(${blur}px)`,
          opacity,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0  z-0"></div>

      <div className=" px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight text-[#212A31] mb-4"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h2>
          <motion.p
            className="text-[#2E3944] max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Connect with top vendors for all your event needs. We provide premium services to make your events
            memorable.
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full z-10 px-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-[#124E66] bg-white text-[#124E66] hover:bg-[#124E66] hover:text-white shadow-lg"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous</span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-[#124E66] bg-white text-[#124E66] hover:bg-[#124E66] hover:text-white shadow-lg"
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next</span>
              </Button>
            </motion.div>
          </div>

          <div className="overflow-hidden">
            <motion.div
              ref={carouselRef}
              className="flex"
              animate={{ x: `-${activeIndex * (100 / cardsPerView)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className={`${isMobile ? 'min-w-full' : 'min-w-[33.333%]'} px-4`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <Card className="bg-white border-none shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <motion.div
                      className="relative h-60 w-full overflow-hidden"
                      animate={{
                        scale: hoveredCard === index ? 1.05 : 1,
                        y: hoveredCard === index ? -5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="h-full w-full object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-[#124E66]/80 to-transparent"
                        animate={{
                          opacity: hoveredCard === index ? 0.9 : 0.7,
                        }}
                        transition={{ duration: 0.3 }}
                      ></motion.div>
                    </motion.div>
                    <CardContent className="p-6">
                      <motion.h3
                        className="text-xl font-bold text-[#212A31] mb-3"
                        animate={{
                          color: hoveredCard === index ? "#124E66" : "#212A31",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {service.title}
                      </motion.h3>
                      <p className="text-[#2E3944]">{service.description}</p>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0">
                      <motion.div
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          scale: hoveredCard === index ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Button className="bg-[#124E66] hover:bg-[#0e3e52] text-white rounded-full px-6">
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
