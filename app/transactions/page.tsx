"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/dashboard-header"
import { Calendar, Package, Briefcase, CheckCircle, XCircle, Receipt, TrendingUp } from "lucide-react"

interface Transaction {
  id: string
  type: "Equipment" | "Labour"
  name: string
  startDate: string
  endDate: string
  totalAmount: number
  status: string
  paymentStatus: string
}

export default function TransactionsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const userRole = localStorage.getItem("userRole")

    if (!userData || userRole !== "user") {
      router.push("/")
      return
    }

    setUser(JSON.parse(userData))
    fetchTransactions(JSON.parse(userData).id)
    setTimeout(() => setMounted(true), 100)
  }, [router])

  const fetchTransactions = async (userId: string) => {
    try {
      const response = await fetch(`/api/bookings/get-past?userId=${userId}`)

      if (!response.ok) {
        const text = await response.text()
        console.error("[v0] API Error Response:", response.status, text)
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      setTransactions(data.bookings || [])
    } catch (err) {
      console.error("[v0] Failed to fetch transactions:", err)
      setTransactions([])
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
      case "completed":
        return "text-green-600 bg-green-50"
      case "cancelled":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div
          className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-balance">Past Transactions</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
            View your booking history and completed transactions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card
            className={`p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-l-primary ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground font-medium">Total Transactions</p>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Receipt className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-bold">{transactions.length}</p>
          </Card>

          <Card
            className={`p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-l-green-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground font-medium">Total Spent</p>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-green-600">
              ₹{transactions.reduce((sum, t) => sum + t.totalAmount, 0).toLocaleString()}
            </p>
          </Card>

          <Card
            className={`p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-l-green-600 sm:col-span-2 lg:col-span-1 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground font-medium">Completed Bookings</p>
              <div className="p-3 bg-green-600/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-green-600">
              {transactions.filter((t) => t.status === "completed").length}
            </p>
          </Card>
        </div>

        {loading ? (
          <Card className="p-12 text-center animate-pulse">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground">Loading transactions...</p>
            </div>
          </Card>
        ) : transactions.length === 0 ? (
          <Card
            className={`p-8 sm:p-12 text-center transition-all duration-500 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="max-w-md mx-auto">
              <div className="relative mb-6">
                <Package className="w-20 h-20 sm:w-24 sm:h-24 text-muted-foreground mx-auto opacity-20 animate-pulse" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">No Past Transactions</h3>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                You haven't made any bookings yet. Start exploring our equipment and labour services!
              </p>
              <Button
                onClick={() => router.push("/dashboard")}
                className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                size="lg"
              >
                Go to Dashboard
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {transactions.map((transaction, index) => (
              <Card
                key={transaction.id}
                className={`p-4 sm:p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ${
                  mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-6 items-start lg:items-center">
                  <div className="lg:col-span-1">
                    <div className="flex items-center gap-2 mb-2">
                      {transaction.type === "Equipment" ? (
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Package className="w-5 h-5 text-primary" />
                        </div>
                      ) : (
                        <div className="p-2 bg-secondary/10 rounded-lg">
                          <Briefcase className="w-5 h-5 text-secondary" />
                        </div>
                      )}
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {transaction.type}
                      </span>
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-pretty">{transaction.name}</h3>
                  </div>

                  <div className="lg:col-span-2">
                    <p className="text-xs text-muted-foreground mb-1 font-medium">Duration</p>
                    <div className="flex items-start gap-2 text-sm font-medium">
                      <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span className="break-words">
                        {formatDate(transaction.startDate)} - {formatDate(transaction.endDate)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1 font-medium">Amount</p>
                    <p className="font-bold text-lg sm:text-xl text-primary">
                      ₹{transaction.totalAmount.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 font-medium">Status</p>
                      <span
                        className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 ${getStatusColor(transaction.status)}`}
                      >
                        {transaction.status === "completed" ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 font-medium">Payment</p>
                      <span
                        className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full ${
                          transaction.paymentStatus === "Paid"
                            ? "bg-green-50 text-green-600"
                            : "bg-yellow-50 text-yellow-600"
                        }`}
                      >
                        {transaction.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-start lg:justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/transaction-details/${transaction.id}`)}
                      className="hover:bg-primary hover:text-white transition-all duration-200 w-full sm:w-auto"
                    >
                      <Receipt className="w-4 h-4 mr-2" />
                      View Receipt
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <footer
        className={`border-t border-border bg-card py-8 mt-16 transition-opacity duration-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm text-muted-foreground text-center text-balance">
            Built by Saurabh Kumar, Anubhav Raj, Nancy, Kuldeep Kumar for the fulfillment of the major project in the
            final year.
          </p>
        </div>
      </footer>
    </div>
  )
}
