"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const equipmentImages = [
  {
    id: 1,
    name: "Modern Tractor",
    image: "/modern-red-tractor-in-green-agricultural-field.jpg",
  },
  {
    id: 2,
    name: "Harvester",
    image: "/large-yellow-harvester-machine-harvesting-wheat-cr.jpg",
  },
  {
    id: 3,
    name: "Seeding Equipment",
    image: "/agricultural-seeding-equipment-planting-crops-in-f.jpg",
  },
  {
    id: 4,
    name: "Irrigation System",
    image: "/modern-irrigation-sprinkler-system-watering-farm-f.jpg",
  },
  {
    id: 5,
    name: "Plowing Equipment",
    image: "/tractor-with-plow-equipment-working-in-agricultura.jpg",
  },
]

export default function HeroEquipmentCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % equipmentImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev + 1) % equipmentImages.length)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev - 1 + equipmentImages.length) % equipmentImages.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentSlide(index)
  }

  return (
    <div
      className="relative h-96 md:h-96 lg:h-[28rem] bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Images */}
      <div className="relative w-full h-full">
        {equipmentImages.map((equipment, index) => (
          <div
            key={equipment.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
            }`}
          >
            <img
              src={equipment.image || "/placeholder.svg"}
              alt={equipment.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div
              className={`absolute bottom-20 left-6 md:left-10 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-sm font-bold text-primary">{equipment.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center text-white animate-slide-up">
          <p className="text-sm md:text-base font-semibold tracking-widest uppercase mb-4 opacity-90">
            Welcome to Agro Rent
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Smart Agricultural
            <br />
            Solutions
          </h1>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className={`absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-primary rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className={`absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-primary rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {equipmentImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide ? "w-8 h-2.5 bg-white shadow-lg" : "w-2.5 h-2.5 bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / equipmentImages.length) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}
