"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DashboardHeader from "@/components/dashboard-header"
import { equipmentList } from "@/lib/equipment-data"
import { AlertCircle, Search, X } from "lucide-react"

interface EquipmentBookingForm {
  equipmentId: string
  equipmentName: string
  startDate: string
  endDate: string
  durationType: "daily" | "weekly" | "monthly"
}

export default function EquipmentPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [bookingForm, setBookingForm] = useState<EquipmentBookingForm>({
    equipmentId: "",
    equipmentName: "",
    startDate: "",
    endDate: "",
    durationType: "daily",
  })
  const [bookingError, setBookingError] = useState("")
  const [bookingSuccess, setBookingSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const userRole = localStorage.getItem("userRole")

    if (!userData || userRole !== "user") {
      router.push("/")
      return
    }

    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const filteredEquipment = equipmentList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleBookEquipment = (equipment: any) => {
    setSelectedEquipment(equipment)
    setBookingForm({
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      startDate: "",
      endDate: "",
      durationType: "daily",
    })
    setShowBookingForm(true)
    setBookingError("")
    setBookingSuccess("")
  }

  const calculateCost = (): number => {
    if (!bookingForm.startDate || !bookingForm.endDate || !selectedEquipment) return 0

    const start = new Date(bookingForm.startDate)
    const end = new Date(bookingForm.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

    if (bookingForm.durationType === "daily") {
      return diffDays * selectedEquipment.dailyPrice
    } else if (bookingForm.durationType === "weekly") {
      const weeks = Math.ceil(diffDays / 7)
      return weeks * selectedEquipment.weeklyPrice
    } else {
      const months = Math.ceil(diffDays / 30)
      return months * selectedEquipment.monthlyPrice
    }
  }

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setBookingError("")
    setLoading(true)

    try {
      if (!bookingForm.startDate || !bookingForm.endDate) {
        setBookingError("Please select both start and end dates")
        setLoading(false)
        return
      }

      const bookingData = {
        userId: user.id,
        equipmentId: bookingForm.equipmentId,
        equipmentName: bookingForm.equipmentName,
        startDate: bookingForm.startDate,
        endDate: bookingForm.endDate,
        durationType: bookingForm.durationType,
        totalAmount: calculateCost(),
      }

      const response = await fetch("/api/bookings/create-equipment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Booking failed")
      }

      setBookingSuccess("Equipment booked successfully! Redirecting to bookings page...")
      setBookingForm({
        equipmentId: "",
        equipmentName: "",
        startDate: "",
        endDate: "",
        durationType: "daily",
      })

      setTimeout(() => {
        setShowBookingForm(false)
        setSelectedEquipment(null)
        router.push("/bookings")
      }, 1500)
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : "Error creating booking. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Explore Equipment</h1>
          <p className="text-lg text-muted-foreground">Browse and book premium agricultural equipment</p>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search equipment by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border/50 focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Showing <span className="font-semibold text-foreground">{filteredEquipment.length}</span> equipment
          </p>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-fade-in">
          {filteredEquipment.map((equipment, idx) => (
            <Card
              key={equipment.id}
              className="equipment-card animate-scale-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden group">
                <img
                  src={
                    equipment.image ||
                    `/placeholder.svg?height=200&width=300&query=professional ${equipment.name.toLowerCase() || "/placeholder.svg"} farm equipment machinery for agriculture`
                  }
                  alt={equipment.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Premium
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
                  {equipment.name}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">{equipment.description}</p>

                {/* Specs and Location */}
                <div className="mb-4 space-y-2">
                  <p className="text-xs font-medium text-foreground">
                    <span className="text-muted-foreground">Specs:</span> {equipment.specs}
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    <span className="text-muted-foreground">Location:</span> {equipment.location}
                  </p>
                </div>

                {/* Pricing Table */}
                <div className="mb-6 border border-border/50 rounded-lg overflow-hidden bg-muted/50">
                  <div className="grid grid-cols-3 bg-primary/10">
                    <div className="p-2 text-center font-semibold text-xs border-r border-border/50">Daily</div>
                    <div className="p-2 text-center font-semibold text-xs border-r border-border/50">Weekly</div>
                    <div className="p-2 text-center font-semibold text-xs">Monthly</div>
                  </div>
                  <div className="grid grid-cols-3 bg-card">
                    <div className="p-3 text-center text-sm font-bold text-primary border-r border-border/50">
                      ₹{equipment.dailyPrice}
                    </div>
                    <div className="p-3 text-center text-sm font-bold text-primary border-r border-border/50">
                      ₹{equipment.weeklyPrice}
                    </div>
                    <div className="p-3 text-center text-sm font-bold text-primary">₹{equipment.monthlyPrice}</div>
                  </div>
                </div>

                <Button
                  onClick={() => handleBookEquipment(equipment)}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg font-semibold group-hover:scale-105 transition-transform"
                >
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <Card className="p-12 text-center border-border/50">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">No equipment found matching your search</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search terms</p>
          </Card>
        )}
      </main>

      {/* Booking Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Book {selectedEquipment?.name}</h2>
              <button
                onClick={() => setShowBookingForm(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingError && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg flex gap-2 items-start">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 dark:text-red-300">{bookingError}</p>
              </div>
            )}

            {bookingSuccess && (
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-300">{bookingSuccess}</p>
              </div>
            )}

            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Duration Type</label>
                <select
                  value={bookingForm.durationType}
                  onChange={(e) => setBookingForm({ ...bookingForm, durationType: e.target.value as any })}
                  className="w-full border border-border rounded-lg px-4 py-2 bg-card text-foreground focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">Start Date</label>
                <input
                  type="date"
                  value={bookingForm.startDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, startDate: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full border border-border rounded-lg px-4 py-2.5 bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none cursor-pointer hover:border-primary/50"
                  style={{ colorScheme: "light" }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">End Date</label>
                <input
                  type="date"
                  value={bookingForm.endDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, endDate: e.target.value })}
                  min={bookingForm.startDate || new Date().toISOString().split("T")[0]}
                  required
                  className="w-full border border-border rounded-lg px-4 py-2.5 bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none cursor-pointer hover:border-primary/50"
                  style={{ colorScheme: "light" }}
                />
              </div>

              {bookingForm.startDate && bookingForm.endDate && (
                <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Cost</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ₹{calculateCost().toLocaleString()}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 border-border/50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-lg font-semibold text-white"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-lg py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-muted-foreground text-center font-medium">
            Built by Saurabh Kumar, Anubhav Raj, Nancy, Kuldeep Kumar for the fulfillment of the major project in the
            final year.
          </p>
        </div>
      </footer>
    </div>
  )
}
