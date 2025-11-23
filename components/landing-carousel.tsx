"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { equipmentList } from "@/lib/equipment-data"

export default function LandingCarousel() {
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
        {visibleItems.map((item, idx) => (
          <div key={item.id} className="equipment-card">
            <div className="relative overflow-hidden h-48 bg-muted">
              <img
                src={item.image || "/placeholder.svg?height=200&width=300&query=agricultural equipment"}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2 text-foreground">{item.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              <div className="text-sm font-semibold text-primary mb-4 flex flex-wrap gap-2">
                <span className="bg-primary/10 rounded-lg px-3 py-1">₹{item.dailyPrice}/day</span>
                <span className="bg-secondary/10 rounded-lg px-3 py-1">₹{item.weeklyPrice}/week</span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg font-semibold btn-interactive"
                size="sm"
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      {totalSlides > 1 && (
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full bg-card hover:bg-primary/10 border-primary/30 hover:border-primary transition-all duration-300 btn-interactive"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </Button>
          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "bg-primary w-8" : "bg-border w-3 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full bg-card hover:bg-primary/10 border-primary/30 hover:border-primary transition-all duration-300 btn-interactive"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </Button>
        </div>
      )}
    </div>
  )
}
