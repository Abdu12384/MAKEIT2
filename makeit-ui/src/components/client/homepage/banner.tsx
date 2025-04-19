
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    title: "CONNECT",
    subtitle: "AND DISCOVER",
    description: "Find the perfect vendor for your next event with our curated marketplace",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    title: "CREATE",
    subtitle: "AND CELEBRATE",
    description: "Browse through upcoming events and secure your spot today",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    title: "EXPLORE",
    subtitle: "AND EXPERIENCE",
    description: "Access top-tier vendors and service providers all in one place",
    image: "/placeholder.svg?height=600&width=1200",
  },
]

export default function Banner() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [current, isAnimating])

  return (
    <section ref={bannerRef} className="relative h-[80vh] overflow-hidden bg-[#124E66]">
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={index}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(rgba(18, 78, 102, 0.7), rgba(18, 78, 102, 0.7)), url(${slide.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    y: backgroundY,
                    opacity,
                  }}
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 5, ease: "easeInOut" }}
                />
                <div className="container px-4 md:px-6 text-center relative z-10">
                  <motion.div
                    className="max-w-3xl mx-auto"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <motion.h1
                      className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.h2
                      className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {slide.subtitle}
                    </motion.h2>
                    <motion.p
                      className="text-xl md:text-2xl text-white/80 mb-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      {slide.description}
                    </motion.p>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-[#124E66] hover:bg-[#0e3e52] text-white rounded-full px-8 py-6 text-lg border-2 border-white">
                        START NOW
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ),
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === current ? "bg-white w-6" : "bg-white/50"}`}
            onClick={() => {
              setIsAnimating(true)
              setCurrent(index)
              setTimeout(() => setIsAnimating(false), 500)
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute bottom-6 right-6 flex space-x-2 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
