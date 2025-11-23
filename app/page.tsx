"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LandingCarousel from "@/components/landing-carousel"
import HeroEquipmentCarousel from "@/components/hero-equipment-carousel"
import { Leaf, AlertCircle, CheckCircle, LogOut, Eye, EyeOff, Truck, Users, Zap, Award, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [userTab, setUserTab] = useState<"login" | "register">("login")
  const [adminTab, setAdminTab] = useState<"login">("login")
  const [hoveredPanel, setHoveredPanel] = useState<"user" | "admin" | null>(null)

  // User login
  const [userLoginUsername, setUserLoginUsername] = useState("")
  const [userLoginPassword, setUserLoginPassword] = useState("")
  const [showUserPassword, setShowUserPassword] = useState(false)

  // User registration
  const [userName, setUserName] = useState("")
  const [userPhone, setUserPhone] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [generatedCredentials, setGeneratedCredentials] = useState<{
    username: string
    password: string
  } | null>(null)

  // Admin login
  const [adminUsername, setAdminUsername] = useState("Admin1")
  const [adminPassword, setAdminPassword] = useState("123")
  const [showAdminPassword, setShowAdminPassword] = useState(false)

  // States
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole === "user") {
      router.push("/dashboard")
    } else if (userRole === "admin") {
      router.push("/admin-dashboard")
    }
  }, [router])

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/user-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userLoginUsername, password: userLoginPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Login failed")
        return
      }

      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("userRole", "user")
      setSuccess("Login successful! Redirecting...")
      setTimeout(() => {
        router.push("/dashboard")
      }, 500)
    } catch (err) {
      setError("An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  const handleUserRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/user-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, phone: userPhone, email: userEmail }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Registration failed")
        return
      }

      setGeneratedCredentials({
        username: data.user.username,
        password: data.user.password,
      })

      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("userRole", "user")

      setSuccess("Registration successful! Please save your credentials below.")

      // Clear form
      setUserName("")
      setUserPhone("")
      setUserEmail("")
    } catch (err) {
      setError("An error occurred during registration")
    } finally {
      setLoading(false)
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: adminUsername, password: adminPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Admin login failed")
        return
      }

      localStorage.setItem("admin", JSON.stringify(data.admin))
      localStorage.setItem("userRole", "admin")
      setSuccess("Admin login successful! Redirecting...")
      setTimeout(() => {
        router.push("/admin-dashboard")
      }, 500)
    } catch (err) {
      setError("An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-x-hidden">
      {/* Header Section with Enhanced Animations */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-lg shadow-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            {/* Logo Section with Advanced Animations */}
            <div className="flex items-center gap-3 sm:gap-4 group animate-fade-in">
              <div className="relative">
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-500 animate-pulse"></div>

                {/* Logo Container */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-2xl shadow-primary/30 transform transition-all duration-500 hover:scale-110 hover:rotate-12 group-hover:shadow-primary/50">
                  <Leaf className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white animate-float" />
                </div>
              </div>

              {/* Brand Text */}
              <div className="transform transition-all duration-300 group-hover:translate-x-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient bg-size-200 leading-tight">
                  AGRO RENT
                </h1>
                <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground font-semibold tracking-wide mt-0.5 transition-colors duration-300 group-hover:text-primary">
                  Smart Agricultural Platform
                </p>
              </div>
            </div>

            {/* Tagline Badge with Animation */}
            <div className="hidden md:flex items-center gap-2 animate-fade-in delay-200">
              <div className="relative overflow-hidden">
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[slide-in-from-left_3s_ease-in-out_infinite]"></div>

                <div className="relative text-sm lg:text-base font-bold text-foreground bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 px-5 py-2.5 rounded-full border-2 border-primary/30 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 hover:border-primary/50 backdrop-blur-sm">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    Equipment & Labour Network
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Tagline - Shows on smaller screens */}
            <div className="md:hidden animate-fade-in delay-200">
              <div className="relative">
                <div className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/30 shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  <span className="hidden sm:inline">E&L Network</span>
                  <Leaf className="w-3 h-3 sm:hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {success && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-300 dark:border-green-700 rounded-xl flex gap-3 items-start animate-fade-in shadow-lg shadow-green-500/10">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5 animate-pulse" />
            <p className="text-green-800 dark:text-green-200 font-semibold text-sm">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border border-red-300 dark:border-red-700 rounded-xl flex gap-3 items-start animate-fade-in shadow-lg shadow-red-500/10">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5 animate-pulse" />
            <p className="text-red-800 dark:text-red-200 font-semibold text-sm">{error}</p>
          </div>
        )}

        <div className="text-center mb-12 sm:mb-16">
          <div className="mb-8 sm:mb-12 rounded-2xl overflow-hidden border-2 border-border/50 shadow-2xl animate-scale-in hover:shadow-3xl hover:border-primary/30 transition-all duration-500">
            <HeroEquipmentCarousel />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground leading-tight animate-slide-up delay-100 text-balance px-2">
            Connect with Agricultural{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient bg-300% inline-block">
              Resources
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up delay-200 px-4">
            Rent premium farming equipment and hire skilled agricultural labour with ease. Our platform streamlines the
            process, making it affordable and reliable for every farmer.
          </p>
        </div>

        {/* Login and Registration Section */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-24 animate-slide-up px-4">
          <Card
            onMouseEnter={() => setHoveredPanel("user")}
            onMouseLeave={() => setHoveredPanel(null)}
            className={`relative overflow-hidden p-6 sm:p-8 shadow-2xl transition-all duration-500 border-2 border-primary/40 backdrop-blur-sm bg-gradient-to-br from-card via-card to-primary/10 ${
              hoveredPanel === null || hoveredPanel === "user"
                ? "opacity-100 scale-100 md:scale-105 z-10"
                : "opacity-50 scale-95 blur-[2px]"
            } hover:border-primary hover:shadow-3xl hover:shadow-primary/30 animate-fade-in rounded-2xl group`}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Floating particles effect */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-1000" />

            <div className="relative z-10">
              {/* Enhanced header with animated icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-white animate-float drop-shadow-lg" />
                  <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping opacity-75" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 animate-gradient">
                  Farmer Access
                </h3>
              </div>

              {/* Tab switcher with enhanced design */}
              <div className="flex gap-2 mb-8 p-1.5 bg-muted/50 rounded-xl backdrop-blur-sm border border-border/50">
                <button
                  onClick={() => setUserTab("login")}
                  className={`flex-1 py-2.5 sm:py-3 px-4 rounded-lg font-bold text-sm transition-all duration-300 ${
                    userTab === "login"
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30 scale-105"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setUserTab("register")}
                  className={`flex-1 py-2.5 sm:py-3 px-4 rounded-lg font-bold text-sm transition-all duration-300 ${
                    userTab === "register"
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30 scale-105"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  Register
                </button>
              </div>

              {userTab === "login" ? (
                <form onSubmit={handleUserLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-foreground flex items-center gap-2">
                      <span className="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
                      Username
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      value={userLoginUsername}
                      onChange={(e) => setUserLoginUsername(e.target.value)}
                      required
                      className="bg-background/80 border-2 border-border hover:border-green-500/50 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 text-sm transition-all duration-300 h-12 rounded-xl shadow-sm hover:shadow-md hover:shadow-green-500/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-foreground flex items-center gap-2">
                      <span className="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showUserPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={userLoginPassword}
                        onChange={(e) => setUserLoginPassword(e.target.value)}
                        required
                        className="bg-background/80 border-2 border-border hover:border-green-500/50 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 pr-12 text-sm transition-all duration-300 h-12 rounded-xl shadow-sm hover:shadow-md hover:shadow-green-500/10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowUserPassword(!showUserPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-green-600 transition-all hover:scale-110 p-1 rounded-lg hover:bg-green-50 dark:hover:bg-green-950"
                      >
                        {showUserPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-[length:200%_100%] hover:bg-right hover:shadow-2xl hover:shadow-green-500/50 font-bold py-6 h-auto text-white transition-all duration-500 hover:scale-[1.03] active:scale-95 text-base rounded-xl relative overflow-hidden group/btn"
                    disabled={loading}
                  >
                    <span className="relative z-10">{loading ? "Logging in..." : "Login"}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  {generatedCredentials && (
                    <div className="mb-6 p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-2 border-green-400 dark:border-green-600 rounded-xl animate-fade-in shadow-lg shadow-green-500/20">
                      <h4 className="text-sm font-bold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
                        <div className="p-1 rounded-full bg-green-500">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        Account Created Successfully!
                      </h4>
                      <p className="text-xs text-green-800 dark:text-green-300 mb-3 font-semibold">
                        Please save these credentials to login:
                      </p>
                      <div className="space-y-2 bg-white dark:bg-gray-900 p-4 rounded-lg border-2 border-green-300 dark:border-green-800">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Username:</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-gray-100 font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                            {generatedCredentials.username}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Password:</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-gray-100 font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                            {generatedCredentials.password}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setGeneratedCredentials(null)
                          setUserTab("login")
                        }}
                        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-3 transition-all hover:scale-[1.02] rounded-lg"
                      >
                        Continue to Login
                      </Button>
                    </div>
                  )}

                  <form onSubmit={handleUserRegister} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-foreground">Full Name</label>
                      <Input
                        type="text"
                        placeholder="Your full name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className="bg-background/80 border-2 border-border hover:border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/20 text-sm transition-all duration-300 h-11 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-foreground">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        required
                        className="bg-background/80 border-2 border-border hover:border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/20 text-sm transition-all duration-300 h-11 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-foreground">Email Address</label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                        className="bg-background/80 border-2 border-border hover:border-primary/50 focus:border-primary focus:ring-4 focus:ring-primary/20 text-sm transition-all duration-300 h-11 rounded-xl"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-xl hover:shadow-primary/40 font-bold py-6 h-auto text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 text-base rounded-xl bg-200% hover:bg-right"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </Card>

          <Card
            onMouseEnter={() => setHoveredPanel("admin")}
            onMouseLeave={() => setHoveredPanel(null)}
            className={`relative overflow-hidden p-6 sm:p-8 shadow-2xl transition-all duration-500 border-2 border-accent/40 backdrop-blur-sm bg-gradient-to-br from-card via-card to-accent/10 ${
              hoveredPanel === null || hoveredPanel === "admin"
                ? "opacity-100 scale-100 md:scale-105 z-10"
                : "opacity-50 scale-95 blur-[2px]"
            } hover:border-accent hover:shadow-3xl hover:shadow-accent/30 animate-fade-in delay-100 rounded-2xl group`}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Floating particles effect */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500" />
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl animate-pulse delay-1500" />

            <div className="relative z-10">
              {/* Enhanced header with animated icon */}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <LogOut className="w-6 h-6 sm:w-7 sm:h-7 text-white animate-float drop-shadow-lg" />
                  <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping opacity-75" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 animate-gradient">
                    Admin Portal
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                      <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse delay-150" />
                      <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse delay-300" />
                    </div>
                    <p className="text-xs text-muted-foreground font-semibold">Administrators only</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-5 mt-8">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-foreground flex items-center gap-2">
                    <span className="w-1 h-4 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full" />
                    Username
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter admin username"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    required
                    className="bg-background/80 border-2 border-border hover:border-orange-500/50 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 text-sm transition-all duration-300 h-12 rounded-xl shadow-sm hover:shadow-md hover:shadow-orange-500/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-foreground flex items-center gap-2">
                    <span className="w-1 h-4 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full" />
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showAdminPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                      className="bg-background/80 border-2 border-border hover:border-orange-500/50 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 pr-12 text-sm transition-all duration-300 h-12 rounded-xl shadow-sm hover:shadow-md hover:shadow-orange-500/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-orange-600 transition-all hover:scale-110 p-1 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950"
                    >
                      {showAdminPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-[length:200%_100%] hover:bg-right hover:shadow-2xl hover:shadow-orange-500/50 font-bold py-6 h-auto text-white transition-all duration-500 hover:scale-[1.03] active:scale-95 text-base rounded-xl relative overflow-hidden group/btn"
                  disabled={loading}
                >
                  <span className="relative z-10">{loading ? "Logging in..." : "Admin Login"}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                </Button>
              </form>

              <div className="mt-6 relative group/demo">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-xl blur opacity-30 group-hover/demo:opacity-60 transition duration-500 animate-gradient-flow" />
                <div className="relative p-5 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/50 dark:to-orange-950/50 border-2 border-amber-300 dark:border-amber-700 rounded-xl shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 shadow-md">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-amber-900 dark:text-amber-100">Demo Credentials</p>
                  </div>
                  <div className="space-y-2 bg-white dark:bg-slate-900/50 rounded-lg p-4 border-2 border-amber-200 dark:border-amber-800 shadow-inner">
                    <div className="flex justify-between items-center group/item">
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">Username:</span>
                      <span className="text-sm font-bold text-amber-900 dark:text-amber-100 font-mono bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 rounded-lg shadow-sm group-hover/item:scale-105 transition-transform">
                        Admin1
                      </span>
                    </div>
                    <div className="flex justify-between items-center group/item">
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">Password:</span>
                      <span className="text-sm font-bold text-amber-900 dark:text-amber-100 font-mono bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 rounded-lg shadow-sm group-hover/item:scale-105 transition-transform">
                        123
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Featured Equipment */}
        <div className="mb-24 animate-slide-up">
          <h2 className="text-4xl font-bold mb-2 text-foreground text-center">Featured Equipment</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Browse our premium collection of agricultural equipment
          </p>
          <LandingCarousel />
        </div>

        {/* Services Overview Section */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold mb-4 text-foreground text-center">Our Comprehensive Services</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            We provide end-to-end agricultural solutions designed to boost your farm efficiency and productivity
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-8 text-center card-hover border-border/50 animate-fade-in delay-100">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4 hover-glow">
                <img src="/placeholder.svg?height=32&width=32" alt="Equipment rental" className="w-8 h-8" />
                <Truck className="w-8 h-8 text-primary absolute" />
              </div>
              <h3 className="font-bold mb-3 text-lg text-foreground">Equipment Rental</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Access 10+ types of modern farming equipment at competitive rates. Flexible daily, weekly, and monthly
                rental periods to suit your needs.
              </p>
            </Card>

            <Card className="p-8 text-center card-hover border-border/50 animate-fade-in delay-200">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mx-auto mb-4 hover-glow">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-bold mb-3 text-lg text-foreground">Labour Hiring</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Connect with 50+ skilled agricultural workers. Find experts for ploughing, sowing, harvesting, and other
                specialized farm operations.
              </p>
            </Card>

            <Card className="p-8 text-center card-hover border-border/50 animate-fade-in delay-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mx-auto mb-4 hover-glow">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-bold mb-3 text-lg text-foreground">24/7 Support</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Round-the-clock customer support to assist with bookings, technical issues, and any queries you may
                have.
              </p>
            </Card>

            <Card className="p-8 text-center card-hover border-border/50 animate-fade-in delay-400">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mx-auto mb-4 hover-glow">
                <Award className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-bold mb-3 text-lg text-foreground">Quality Assurance</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                All equipment undergoes regular maintenance checks. Every worker is verified and trained for
                professional service delivery.
              </p>
            </Card>
          </div>

          {/* Detailed Services Content */}
          <Card className="p-12 border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5 card-hover">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Why Choose AGRO RENT?</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Leaf className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Affordable Pricing</p>
                      <p className="text-sm text-muted-foreground">
                        Competitive rates that won't break your farm budget
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Users className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Trusted Network</p>
                      <p className="text-sm text-muted-foreground">
                        Verified equipment and skilled agricultural workers
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Easy Booking</p>
                      <p className="text-sm text-muted-foreground">
                        Simple 3-step process to book equipment or workers
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground">Our Commitment</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Quality Equipment</h4>
                    <p className="text-sm text-muted-foreground">
                      Well-maintained machinery that ensures optimal farm productivity
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Professional Workers</h4>
                    <p className="text-sm text-muted-foreground">
                      Experienced workers trained in modern agricultural practices
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Flexible Scheduling</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose your rental periods and worker availability that fits your farming calendar
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Transparent Pricing</h4>
                    <p className="text-sm text-muted-foreground">
                      No hidden charges. All costs are calculated upfront and clearly displayed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <footer className="relative border-t-2 border-border/50 bg-gradient-to-b from-card/80 via-card to-primary/5 backdrop-blur-xl mt-16 sm:mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-10 sm:py-12 border-b border-border/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center group opacity-0 animate-fade-in-up" style={{ animationDelay: "0ms" }}>
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/20 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/30 border border-primary/20">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-primary transition-transform group-hover:rotate-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                  500+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">Equipment Available</div>
              </div>

              <div className="text-center group opacity-0 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-secondary/10 group-hover:bg-secondary/20 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-secondary/30 border border-secondary/20">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-secondary transition-transform group-hover:rotate-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-secondary transition-colors">
                  1000+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">Skilled Workers</div>
              </div>

              <div className="text-center group opacity-0 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-green-500/10 group-hover:bg-green-500/20 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-green-500/30 border border-green-500/20">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 dark:text-green-500 transition-transform group-hover:rotate-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors">
                  2500+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">Successful Bookings</div>
              </div>

              <div className="text-center group opacity-0 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-accent/10 group-hover:bg-accent/20 mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-accent/30 border border-accent/20">
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 text-accent transition-transform group-hover:rotate-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-accent transition-colors">
                  98%
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          <div className="py-10 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* About Section */}
              <div className="space-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
                <div className="flex items-center gap-3 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                    AGRO RENT
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Empowering farmers with modern agricultural solutions. Connect with premium equipment and skilled
                  labour to maximize your farm's productivity.
                </p>
                <div className="pt-2">
                  <a
                    href="mailto:agrorentofficial@gmail.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-all flex items-center gap-2 group hover:translate-x-1 p-2 -ml-2 rounded-lg hover:bg-primary/5"
                  >
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">agrorentofficial@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
                <h4 className="font-bold text-foreground text-base uppercase tracking-wider flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/equipments"
                      className="text-sm text-muted-foreground hover:text-primary transition-all flex items-center gap-3 group hover:translate-x-1 p-2 -ml-2 rounded-lg hover:bg-primary/5"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all" />
                      <span className="font-medium">Equipment Catalog</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/labour"
                      className="text-sm text-muted-foreground hover:text-primary transition-all flex items-center gap-3 group hover:translate-x-1 p-2 -ml-2 rounded-lg hover:bg-primary/5"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all" />
                      <span className="font-medium">Find Workers</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/bookings"
                      className="text-sm text-muted-foreground hover:text-primary transition-all flex items-center gap-3 group hover:translate-x-1 p-2 -ml-2 rounded-lg hover:bg-primary/5"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all" />
                      <span className="font-medium">My Bookings</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blogs"
                      className="text-sm text-muted-foreground hover:text-primary transition-all flex items-center gap-3 group hover:translate-x-1 p-2 -ml-2 rounded-lg hover:bg-primary/5"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all" />
                      <span className="font-medium">Blog & Resources</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div className="space-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
                <h4 className="font-bold text-foreground text-base uppercase tracking-wider flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-secondary to-accent rounded-full" />
                  Support
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/contact"
                      className="text-sm text-muted-foreground hover:text-secondary transition-all flex items-center gap-3 group hover:translate-x-1 p-2 -ml-2 rounded-lg hover:bg-secondary/5"
                    >
                      <span className="w-2 h-2 rounded-full bg-secondary/50 group-hover:bg-secondary group-hover:scale-150 transition-all" />
                      <span className="font-medium">Contact Us</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-secondary transition-all flex items-center gap-3 group hover:translate-x-1 p-2 -ml-2 rounded-lg hover:bg-secondary/5"
                    >
                      <span className="w-2 h-2 rounded-full bg-secondary/50 group-hover:bg-secondary group-hover:scale-150 transition-all" />
                      <span className="font-medium">Help Center</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-secondary transition-all flex items-center gap-3 group hover:translate-x-1 p-2 -ml-2 rounded-lg hover:bg-secondary/5"
                    >
                      <span className="w-2 h-2 rounded-full bg-secondary/50 group-hover:bg-secondary group-hover:scale-150 transition-all" />
                      <span className="font-medium">FAQs</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/918409602811"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-secondary transition-all flex items-center gap-3 group hover:translate-x-1 p-2 -ml-2 rounded-lg hover:bg-secondary/5"
                    >
                      <span className="w-2 h-2 rounded-full bg-secondary/50 group-hover:bg-secondary group-hover:scale-150 transition-all" />
                      <span className="font-medium">WhatsApp Support</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "700ms" }}>
                <h4 className="font-bold text-foreground text-base uppercase tracking-wider flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-accent to-primary rounded-full" />
                  Connect With Us
                </h4>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/918409602811"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 hover:shadow-xl hover:shadow-green-500/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center transition-all shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-green-700 dark:text-green-400 font-semibold">WhatsApp</div>
                      <div className="text-sm font-bold text-green-900 dark:text-green-100">+91 8409602811</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href="#"
                      className="flex-1 h-12 rounded-xl bg-gradient-to-br from-card to-primary/5 hover:from-primary/10 hover:to-primary/20 border-2 border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1 active:scale-95"
                    >
                      <svg
                        className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="flex-1 h-12 rounded-xl bg-gradient-to-br from-card to-primary/5 hover:from-primary/10 hover:to-primary/20 border-2 border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1 active:scale-95"
                    >
                      <svg
                        className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="flex-1 h-12 rounded-xl bg-gradient-to-br from-card to-primary/5 hover:from-primary/10 hover:to-primary/20 border-2 border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1 active:scale-95"
                    >
                      <svg
                        className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="border-t border-border/50 py-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "800ms" }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left font-medium">
                © 2025 AGRO RENT. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <a
                  href="#"
                  className="hover:text-primary transition-all hover:underline underline-offset-4 font-medium hover:scale-105"
                >
                  Privacy Policy
                </a>
                <span className="text-border hidden sm:inline">•</span>
                <a
                  href="#"
                  className="hover:text-primary transition-all hover:underline underline-offset-4 font-medium hover:scale-105"
                >
                  Terms of Service
                </a>
                <span className="text-border hidden sm:inline">•</span>
                <a
                  href="#"
                  className="hover:text-primary transition-all hover:underline underline-offset-4 font-medium hover:scale-105"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>

          <div
            className="border-t border-border/50 py-6 sm:py-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "900ms" }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 group">
                <svg
                  className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  Developed By
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
                <span className="px-4 py-2 rounded-full bg-gradient-to-br from-card to-primary/5 border-2 border-border/50 hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/20 transition-all hover:scale-110 font-semibold">
                  Saurabh Kumar
                </span>
                <span className="text-border hidden sm:inline">•</span>
                <span className="px-4 py-2 rounded-full bg-gradient-to-br from-card to-secondary/5 border-2 border-border/50 hover:border-secondary/50 hover:text-secondary hover:shadow-lg hover:shadow-secondary/20 transition-all hover:scale-110 font-semibold">
                  Anubhav Raj
                </span>
                <span className="text-border hidden sm:inline">•</span>
                <span className="px-4 py-2 rounded-full bg-gradient-to-br from-card to-accent/5 border-2 border-border/50 hover:border-accent/50 hover:text-accent hover:shadow-lg hover:shadow-accent/20 transition-all hover:scale-110 font-semibold">
                  Nancy
                </span>
                <span className="text-border hidden sm:inline">•</span>
                <span className="px-4 py-2 rounded-full bg-gradient-to-br from-card to-primary/5 border-2 border-border/50 hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/20 transition-all hover:scale-110 font-semibold">
                  Kuldeep Kumar
                </span>
              </div>
              <p className="text-xs text-muted-foreground text-center font-medium px-4">
                CSE (AI & ML) • Meerut Institute of Technology • Final Year Major Project 2025-26
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
