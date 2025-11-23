"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LogOut,
  BarChart3,
  Users,
  Wrench,
  TrendingUp,
  Clock,
  CheckCircle,
  UserCog,
  CreditCard,
  FileText,
  HelpCircle,
  Settings,
  Shield,
} from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const adminData = localStorage.getItem("admin")
    const userRole = localStorage.getItem("userRole")

    if (!adminData || userRole !== "admin") {
      router.push("/")
      return
    }

    setAdmin(JSON.parse(adminData))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  if (loading || !admin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    )
  }

  const stats = [
    {
      label: "Total Equipment",
      value: "10+",
      icon: Wrench,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      iconBg: "bg-blue-500",
    },
    {
      label: "Active Workers",
      value: "50+",
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      iconBg: "bg-green-500",
    },
    {
      label: "Total Bookings",
      value: "120+",
      icon: BarChart3,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      iconBg: "bg-purple-500",
    },
    {
      label: "Revenue Generated",
      value: "₹45,000+",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      iconBg: "bg-orange-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      <header className="border-b border-border/50 bg-card/60 backdrop-blur-xl sticky top-0 z-50 shadow-lg animate-in fade-in slide-in-from-top duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="animate-in fade-in slide-in-from-left duration-700 delay-100">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">Welcome, {admin.username}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex gap-2 items-center border-accent/50 hover:bg-accent/10 hover:border-accent transition-all duration-300 hover:scale-105 hover:shadow-md animate-in fade-in slide-in-from-right duration-700 delay-200 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="p-4 sm:p-6 hover:shadow-2xl transition-all duration-500 border border-border/50 hover:border-accent/50 hover:scale-105 bg-card/80 backdrop-blur-sm animate-in fade-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50 rounded-full px-2 sm:px-3 py-1 animate-pulse">
                    Active
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">{stat.label}</h3>
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {stat.value}
                </p>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Equipment Management */}
          <Card className="p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 border border-border/50 hover:border-primary/50 bg-card/80 backdrop-blur-sm animate-in fade-in slide-in-from-left duration-700 delay-300">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Equipment Management</h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              Manage all available agricultural equipment, pricing, availability, and inventory levels across all
              regions.
            </p>
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg hover:from-primary/10 hover:to-primary/15 transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-primary/20">
                <span className="text-sm sm:text-base font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Tractors
                </span>
                <span className="text-xs sm:text-sm bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full font-semibold shadow-md">
                  3 Active
                </span>
              </div>
              <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-orange-50 dark:from-orange-950/30 to-orange-100 dark:to-orange-900/40 rounded-lg hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-900/40 dark:hover:to-orange-800/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-orange-200 dark:border-orange-800">
                <span className="text-sm sm:text-base font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                  Harvesters
                </span>
                <span className="text-xs sm:text-sm bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full font-semibold shadow-md">
                  2 Active
                </span>
              </div>
              <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-yellow-50 dark:from-yellow-950/30 to-yellow-100 dark:to-yellow-900/40 rounded-lg hover:from-yellow-100 hover:to-yellow-200 dark:hover:from-yellow-900/40 dark:hover:to-yellow-800/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-yellow-200 dark:border-yellow-800">
                <span className="text-sm sm:text-base font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                  Sprayers
                </span>
                <span className="text-xs sm:text-sm bg-yellow-600 text-white px-2 sm:px-3 py-1 rounded-full font-semibold shadow-md">
                  5 Active
                </span>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-primary via-primary/90 to-secondary hover:from-primary/90 hover:via-primary hover:to-secondary/90 hover:shadow-xl text-white font-semibold py-2.5 sm:py-3 h-auto transition-all duration-300 hover:scale-[1.02]">
              Manage Equipment
            </Button>
          </Card>

          {/* Labour Management */}
          <Card className="p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 border border-border/50 hover:border-secondary/50 bg-card/80 backdrop-blur-sm animate-in fade-in slide-in-from-right duration-700 delay-300">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Labour Management</h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              Oversee all skilled workers, their availability, skill levels, daily rates, and performance ratings for
              optimal service quality.
            </p>
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-lg hover:from-secondary/10 hover:to-secondary/15 transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-secondary/20">
                <span className="text-sm sm:text-base font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-secondary" />
                  Total Workers
                </span>
                <span className="text-xs sm:text-sm bg-secondary text-white px-2 sm:px-3 py-1 rounded-full font-semibold shadow-md">
                  50+
                </span>
              </div>
              <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-green-50 dark:from-green-950/30 to-green-100 dark:to-green-900/40 rounded-lg hover:from-green-100 hover:to-green-200 dark:hover:from-green-900/40 dark:hover:to-green-800/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-green-200 dark:border-green-800">
                <span className="text-sm sm:text-base font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Available Today
                </span>
                <span className="text-xs sm:text-sm bg-green-600 text-white px-2 sm:px-3 py-1 rounded-full font-semibold shadow-md">
                  35+
                </span>
              </div>
              <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-amber-50 dark:from-amber-950/30 to-amber-100 dark:to-amber-900/40 rounded-lg hover:from-amber-100 hover:to-amber-200 dark:hover:from-amber-900/40 dark:hover:to-amber-800/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-amber-200 dark:border-amber-800">
                <span className="text-sm sm:text-base font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Pending Verification
                </span>
                <span className="text-xs sm:text-sm bg-amber-600 text-white px-2 sm:px-3 py-1 rounded-full font-semibold shadow-md">
                  8
                </span>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-secondary via-secondary/90 to-accent hover:from-secondary/90 hover:via-secondary hover:to-accent/90 hover:shadow-xl text-white font-semibold py-2.5 sm:py-3 h-auto transition-all duration-300 hover:scale-[1.02]">
              Manage Labour
            </Button>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Recent Bookings */}
          <Card className="p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 border border-border/50 bg-card/80 backdrop-blur-sm animate-in fade-in slide-in-from-bottom duration-700 delay-500">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/5 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Recent Bookings</h2>
            </div>
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-card to-primary/5 border border-border/50 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground">Equipment Booking - Tractor</h4>
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-md font-semibold shadow-sm w-fit">
                    Confirmed
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">3 days rental • ₹2,400</p>
              </div>
              <div className="p-3 sm:p-4 bg-gradient-to-br from-card to-blue-500/5 border border-border/50 rounded-xl hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground">Labour Booking - Ploughing</h4>
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-md font-semibold shadow-sm w-fit">
                    Pending
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">5 workers • ₹3,500</p>
              </div>
              <div className="p-3 sm:p-4 bg-gradient-to-br from-card to-amber-500/5 border border-border/50 rounded-xl hover:border-amber-500/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <h4 className="font-semibold text-sm sm:text-base text-foreground">Equipment Booking - Harvester</h4>
                  <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-md font-semibold shadow-sm w-fit">
                    In Progress
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">2 days rental • ₹3,200</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-primary/50 hover:bg-primary/10 hover:border-primary font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-transparent"
            >
              View All Bookings
            </Button>
          </Card>

          {/* Platform Analytics */}
          <Card className="p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 border border-border/50 bg-card/80 backdrop-blur-sm animate-in fade-in slide-in-from-bottom duration-700 delay-600">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-4 sm:mb-6">
              Platform Analytics
            </h2>
            <div className="space-y-4 sm:space-y-5 mb-4 sm:mb-6">
              <div className="animate-in fade-in slide-in-from-left duration-700 delay-700">
                <div className="flex justify-between mb-2">
                  <span className="text-xs sm:text-sm font-semibold text-foreground">Equipment Utilization</span>
                  <span className="text-xs sm:text-sm font-bold text-primary">78%</span>
                </div>
                <div className="w-full bg-primary/10 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-secondary rounded-full h-2.5 w-[78%] animate-in slide-in-from-left duration-1000 delay-700"></div>
                </div>
              </div>
              <div className="animate-in fade-in slide-in-from-left duration-700 delay-800">
                <div className="flex justify-between mb-2">
                  <span className="text-xs sm:text-sm font-semibold text-foreground">Labour Satisfaction Rate</span>
                  <span className="text-xs sm:text-sm font-bold text-secondary">92%</span>
                </div>
                <div className="w-full bg-secondary/10 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-secondary to-accent rounded-full h-2.5 w-[92%] animate-in slide-in-from-left duration-1000 delay-800"></div>
                </div>
              </div>
              <div className="animate-in fade-in slide-in-from-left duration-700 delay-900">
                <div className="flex justify-between mb-2">
                  <span className="text-xs sm:text-sm font-semibold text-foreground">Platform User Growth</span>
                  <span className="text-xs sm:text-sm font-bold text-accent">85%</span>
                </div>
                <div className="w-full bg-accent/10 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-accent to-primary rounded-full h-2.5 w-[85%] animate-in slide-in-from-left duration-1000 delay-900"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
              <div className="text-center sm:text-left">
                <p className="text-xs text-muted-foreground font-medium mb-1">This Month Revenue</p>
                <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ₹45,000
                </p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs text-muted-foreground font-medium mb-1">Total Users</p>
                <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  250+
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* System Settings & Support */}
        <Card className="p-6 sm:p-8 border border-border/50 hover:shadow-2xl transition-all duration-500 bg-card/80 backdrop-blur-sm animate-in fade-in slide-in-from-bottom duration-700 delay-1000">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            System Settings & Support
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <Card
              className="p-4 sm:p-5 border border-border/50 hover:border-primary/50 bg-gradient-to-br from-card to-primary/5 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: "1100ms" }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 transform hover:rotate-12 transition-transform duration-300">
                  <UserCog className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">User Management</h3>
                  <p className="text-xs text-muted-foreground">Manage users and roles</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-4 sm:p-5 border border-border/50 hover:border-secondary/50 bg-gradient-to-br from-card to-secondary/5 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: "1200ms" }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0 transform hover:rotate-12 transition-transform duration-300">
                  <CreditCard className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">Payment Settings</h3>
                  <p className="text-xs text-muted-foreground">Configure payments</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-4 sm:p-5 border border-border/50 hover:border-accent/50 bg-gradient-to-br from-card to-accent/5 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: "1300ms" }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 transform hover:rotate-12 transition-transform duration-300">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">Reports & Analytics</h3>
                  <p className="text-xs text-muted-foreground">View detailed reports</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-4 sm:p-5 border border-border/50 hover:border-blue-500/50 bg-gradient-to-br from-card to-blue-500/5 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: "1400ms" }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 transform hover:rotate-12 transition-transform duration-300">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">Support Tickets</h3>
                  <p className="text-xs text-muted-foreground">Handle user support</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-4 sm:p-5 border border-border/50 hover:border-purple-500/50 bg-gradient-to-br from-card to-purple-500/5 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: "1500ms" }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 transform hover:rotate-12 transition-transform duration-300">
                  <Settings className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">System Configuration</h3>
                  <p className="text-xs text-muted-foreground">Configure system</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-4 sm:p-5 border border-border/50 hover:border-green-500/50 bg-gradient-to-br from-card to-green-500/5 hover:shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: "1600ms" }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0 transform hover:rotate-12 transition-transform duration-300">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1">Security & Backup</h3>
                  <p className="text-xs text-muted-foreground">Security settings</p>
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </main>

      <footer className="border-t border-border/50 bg-card/60 backdrop-blur-xl py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm text-muted-foreground text-center font-medium">
            AGRO RENT Admin Panel • Built by Saurabh Kumar, Anubhav Raj, Nancy, Kuldeep Kumar
          </p>
        </div>
      </footer>
    </div>
  )
}
