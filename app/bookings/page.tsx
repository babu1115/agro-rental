"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/dashboard-header"
import { Calendar, Package, Briefcase, X, Phone, Mail, CreditCard } from "lucide-react"

interface Booking {
  id: string
  type: "Equipment" | "Labour"
  name: string
  startDate: string
  endDate: string
  totalAmount: number
  status: string
}

export default function BookingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const userRole = localStorage.getItem("userRole")

    if (!userData || userRole !== "user") {
      router.push("/")
      return
    }

    setUser(JSON.parse(userData))
    fetchBookings(JSON.parse(userData).id)
  }, [router])

  const fetchBookings = async (userId: string) => {
    try {
      const response = await fetch(`/api/bookings/get-active?userId=${userId}`)

      if (!response.ok) {
        const text = await response.text()
        console.error("[v0] API Error Response:", response.status, text)
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      setBookings(data.bookings || [])
    } catch (err) {
      console.error("[v0] Failed to fetch bookings:", err)
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "text-green-600 bg-green-50"
      case "pending":
        return "text-orange-600 bg-orange-50"
      case "completed":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <DashboardHeader user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fadeIn">
        <div className="mb-8 sm:mb-12 animate-slideUp">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-black dark:text-white">
            Current Bookings
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
            View and manage your active equipment and labour bookings
          </p>
        </div>

        {loading ? (
          <Card className="p-8 sm:p-12 text-center shadow-xl border-2 animate-pulse">
            <div className="w-12 h-12 border-4 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground text-sm sm:text-base">Loading bookings...</p>
          </Card>
        ) : bookings.length === 0 ? (
          <Card className="p-8 sm:p-12 lg:p-16 text-center shadow-xl border-2 hover:shadow-2xl transition-all duration-300 animate-slideUp">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6 animate-float">
              <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-700" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">No active bookings yet</h3>
            <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base max-w-md mx-auto">
              Start exploring our premium equipment and skilled labour to boost your farm productivity
            </p>
            <Button
              onClick={() => router.push("/equipments")}
              className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Booking Equipment
            </Button>
          </Card>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {bookings.map((booking, index) => (
              <Card
                key={booking.id}
                className="p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-gray-300 animate-slideUp group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 items-start lg:items-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`p-2 rounded-lg ${booking.type === "Equipment" ? "bg-gray-100" : "bg-gray-200"} group-hover:scale-110 transition-transform duration-300`}
                      >
                        {booking.type === "Equipment" ? (
                          <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                        ) : (
                          <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                        )}
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {booking.type}
                      </span>
                    </div>
                    <h3 className="font-bold text-base sm:text-lg lg:text-xl group-hover:text-gray-700 transition-colors duration-300">
                      {booking.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-mono bg-gray-50 px-2 py-1 rounded inline-block">
                      {booking.id}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Duration</p>
                    <div className="flex items-start sm:items-center gap-2 text-sm sm:text-base font-medium">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 flex-shrink-0 mt-0.5 sm:mt-0 group-hover:animate-bounce" />
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span className="text-xs sm:text-sm">{formatDate(booking.startDate)}</span>
                        <span className="hidden sm:inline text-muted-foreground">-</span>
                        <span className="text-xs sm:text-sm">{formatDate(booking.endDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Amount</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-black dark:text-white">
                      ₹{booking.totalAmount.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</p>
                    <span
                      className={`inline-flex items-center text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${getStatusColor(booking.status)} shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse"></span>
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex gap-2 lg:justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedBooking(booking)}
                      className="w-full sm:w-auto border-2 hover:border-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {selectedBooking && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={() => setSelectedBooking(null)}
        >
          <Card
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 flex justify-between items-center rounded-t-lg z-10">
              <div>
                <h2 className="text-2xl font-bold">Booking Details</h2>
                <p className="text-gray-300 text-sm mt-1">Complete booking information</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200">
                <div
                  className={`p-3 rounded-lg ${selectedBooking.type === "Equipment" ? "bg-gray-800" : "bg-orange-600"}`}
                >
                  {selectedBooking.type === "Equipment" ? (
                    <Package className="w-6 h-6 text-white" />
                  ) : (
                    <Briefcase className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {selectedBooking.type} Booking
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedBooking.name}</h3>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Booking ID
                </label>
                <p className="font-mono text-sm bg-gray-100 px-4 py-3 rounded-lg border">{selectedBooking.id}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Start Date
                  </label>
                  <p className="text-lg font-semibold bg-gray-50 px-4 py-3 rounded-lg border">
                    {formatDate(selectedBooking.startDate)}
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    End Date
                  </label>
                  <p className="text-lg font-semibold bg-gray-50 px-4 py-3 rounded-lg border">
                    {formatDate(selectedBooking.endDate)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Total Amount
                </label>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border-2 border-gray-200">
                  <p className="text-4xl font-bold text-gray-900">₹{selectedBooking.totalAmount.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Booking Status
                </label>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center text-sm font-semibold px-6 py-3 rounded-full ${getStatusColor(selectedBooking.status)} shadow-md`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-current mr-2 animate-pulse"></span>
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-bold text-gray-800">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">agrorentofficial@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">+91 8409602811</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => setSelectedBooking(null)}
                  variant="outline"
                  className="flex-1 border-2 hover:border-gray-400 transition-all duration-300"
                >
                  Close
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Contact Support
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <footer className="border-t border-border bg-gradient-to-r from-gray-50 to-green-50/30 py-6 sm:py-8 mt-12 sm:mt-16 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
            Built by Saurabh Kumar, Anubhav Raj, Nancy, Kuldeep Kumar for the fulfillment of the major project in the
            final year.
          </p>
        </div>
      </footer>
    </div>
  )
}
