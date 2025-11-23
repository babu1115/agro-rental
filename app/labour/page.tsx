"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/dashboard-header"
import { labourList } from "@/lib/equipment-data"
import { AlertCircle, MapPin, Star, X } from "lucide-react"

interface LabourBookingForm {
  labourId: string
  labourName: string
  startDate: string
  endDate: string
  daysRequired: number
}

export default function LabourPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedLabour, setSelectedLabour] = useState<any>(null)
  const [skillFilter, setSkillFilter] = useState("")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [bookingForm, setBookingForm] = useState<LabourBookingForm>({
    labourId: "",
    labourName: "",
    startDate: "",
    endDate: "",
    daysRequired: 0,
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

  // Get unique skills
  const skills = ["", ...Array.from(new Set(labourList.map((l) => l.skill)))]

  const filteredLabour = labourList.filter((item) => {
    const matchesSkill = !skillFilter || item.skill === skillFilter
    const matchesAvailability = availabilityFilter === "all" || item.availability === availabilityFilter
    return matchesSkill && matchesAvailability
  })

  const handleHireLabour = (labour: any) => {
    setSelectedLabour(labour)
    setBookingForm({
      labourId: labour.id,
      labourName: labour.name,
      startDate: "",
      endDate: "",
      daysRequired: 0,
    })
    setShowBookingForm(true)
    setBookingError("")
    setBookingSuccess("")
  }

  const calculateDays = (): number => {
    if (!bookingForm.startDate || !bookingForm.endDate) return 0
    const start = new Date(bookingForm.startDate)
    const end = new Date(bookingForm.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  const calculateCost = (): number => {
    if (!selectedLabour) return 0
    return calculateDays() * selectedLabour.dailyCharge
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

      const daysRequired = calculateDays()

      const response = await fetch("/api/bookings/create-labour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          labourId: bookingForm.labourId,
          labourName: bookingForm.labourName,
          startDate: bookingForm.startDate,
          endDate: bookingForm.endDate,
          daysRequired,
          totalAmount: calculateCost(),
        }),
      })

      if (!response.ok) {
        throw new Error("Booking failed")
      }

      setBookingSuccess("Labour booked successfully!")
      setBookingForm({
        labourId: "",
        labourName: "",
        startDate: "",
        endDate: "",
        daysRequired: 0,
      })
      setSelectedLabour(null)
      setShowBookingForm(false)

      setTimeout(() => {
        router.push("/bookings")
      }, 2000)
    } catch (err) {
      setBookingError("Error creating booking. Please try again.")
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2 text-foreground">Explore Labour</h1>
        <p className="text-lg text-muted-foreground mb-8">Find and hire skilled agricultural workers</p>

        {/* Filters */}
        <Card className="p-6 mb-8 border-border/50 hover:shadow-lg transition-shadow duration-300 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Filter by Skill</label>
              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 bg-card text-foreground focus:ring-2 focus:ring-primary/50 transition-all btn-interactive"
              >
                {skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill ? skill : "All Skills"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Filter by Availability</label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 bg-card text-foreground focus:ring-2 focus:ring-primary/50 transition-all btn-interactive"
              >
                <option value="all">All</option>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">Results</label>
              <div className="flex items-center px-3 py-2 bg-muted rounded-lg border border-border/50">
                <p className="text-sm">
                  Found <strong>{filteredLabour.length}</strong> workers
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Labour Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-fade-in">
          {filteredLabour.map((labour, idx) => (
            <Card
              key={labour.id}
              className="p-6 hover:shadow-xl transition-all duration-300 border border-border/50 card-hover group overflow-hidden animate-scale-in"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="mb-4 relative h-40 rounded-lg overflow-hidden bg-gradient-to-br from-secondary/20 to-accent/20">
                <img
                  src={labour.image || "/placeholder.svg"}
                  alt={labour.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 right-2 bg-secondary/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Star className="w-3 h-3" fill="currentColor" /> Expert
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2 text-foreground group-hover:text-secondary transition-colors">
                  {labour.name}
                </h2>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <p className="text-sm font-semibold text-secondary">{labour.skill}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-semibold text-foreground">{labour.experience} years</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground truncate">{labour.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Daily Rate:</span>
                  <span className="font-bold text-secondary text-lg">₹{labour.dailyCharge}</span>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground mb-1 font-semibold">Availability Status</p>
                <span
                  className={`text-sm font-bold inline-flex items-center gap-1 ${
                    labour.availability === "Available"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${labour.availability === "Available" ? "bg-emerald-600 dark:bg-emerald-400" : "bg-amber-600 dark:bg-amber-400"}`}
                  />
                  {labour.availability}
                </span>
              </div>

              <Button
                onClick={() => handleHireLabour(labour)}
                className="w-full bg-gradient-to-r from-secondary to-accent hover:shadow-lg font-semibold btn-interactive group-hover:scale-105 transition-transform"
                disabled={labour.availability === "Booked"}
              >
                {labour.availability === "Booked" ? "Not Available" : "Hire Now"}
              </Button>
            </Card>
          ))}
        </div>

        {filteredLabour.length === 0 && (
          <Card className="p-8 text-center border-border/50">
            <p className="text-muted-foreground">No labour found with the selected filters.</p>
          </Card>
        )}
      </main>

      {/* Booking Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Hire {selectedLabour?.name}</h2>
                <p className="text-sm text-muted-foreground font-medium">{selectedLabour?.skill} Expert</p>
              </div>
              <button
                onClick={() => setShowBookingForm(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors btn-interactive"
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
                <label className="block text-sm font-semibold mb-2 text-foreground">Start Date</label>
                <input
                  type="date"
                  value={bookingForm.startDate}
                  onChange={(e) => setBookingForm({ ...bookingForm, startDate: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:border-input cursor-pointer transition-all"
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
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:border-input cursor-pointer transition-all"
                  style={{ colorScheme: "light" }}
                />
              </div>

              {bookingForm.startDate && bookingForm.endDate && (
                <>
                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2 font-medium">Days Required</p>
                    <p className="text-2xl font-bold text-foreground">{calculateDays()} days</p>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2 font-medium">Total Cost</p>
                    <p className="text-3xl font-bold text-foreground">₹{calculateCost().toLocaleString()}</p>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 btn-interactive border-border/50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-foreground text-background hover:bg-foreground/90 hover:shadow-lg font-semibold btn-interactive"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Confirm Hire"}
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
