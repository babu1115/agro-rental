"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { equipmentList } from "@/lib/equipment-data"
import { useRouter } from "next/navigation"

export default function EquipmentCarousel() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2)
      } else {
        setItemsPerSlide(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 4000)

    return () => clearInterval(interval)
  }, [itemsPerSlide])

  const totalSlides = Math.ceil(equipmentList.length / itemsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const startIdx = currentSlide * itemsPerSlide
  const visibleItems = equipmentList.slice(startIdx, startIdx + itemsPerSlide)

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleItems.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 group cursor-pointer hover:-translate-y-3 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => router.push(`/equipments?id=${item.id}`)}
          >
            <div className="relative h-56 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
              <img
                src={
                  item.image ||
                  `/placeholder.svg?height=300&width=400&query=modern ${item.name} agricultural equipment in field`
                }
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-xs font-bold text-primary">Featured</span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300 text-balance">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{item.description}</p>

              <div className="relative overflow-hidden rounded-lg p-3 mb-4 bg-gradient-to-r from-primary/5 to-secondary/5 group-hover:from-primary/10 group-hover:to-secondary/10 transition-all duration-300">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-primary">₹{item.dailyPrice}/day</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-secondary">₹{item.weeklyPrice}/week</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-accent">₹{item.monthlyPrice}/month</span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-md group-hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                size="lg"
              >
                <span className="flex items-center justify-center gap-2">
                  Rent Now
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {totalSlides > 1 && (
        <div className="flex items-center justify-center gap-6 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full h-12 w-12 border-2 border-primary/20 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg bg-transparent"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "w-8 bg-gradient-to-r from-primary to-secondary shadow-md"
                    : "w-2.5 bg-border hover:bg-primary/50"
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full h-12 w-12 border-2 border-primary/20 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg bg-transparent"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  )
}
