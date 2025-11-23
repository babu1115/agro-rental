"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight, TrendingUp, Users, Package, Headphones } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import EquipmentCarousel from "@/components/equipment-carousel"
import ChatBot from "@/components/chatbot"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showChatbot, setShowChatbot] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const userRole = localStorage.getItem("userRole")

    if (!userData || userRole !== "user") {
      router.push("/")
      return
    }

    setUser(JSON.parse(userData))
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const navigationItems = [
    {
      label: "Explore Equipment",
      href: "/equipments",
      icon: Package,
      description: "Browse premium machinery",
      color: "from-emerald-500/10 to-green-500/5",
      hoverColor: "group-hover:from-emerald-500/20 group-hover:to-green-500/10",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200",
    },
    {
      label: "Hire Labour",
      href: "/labour",
      icon: Users,
      description: "Find skilled workers",
      color: "from-amber-500/10 to-orange-500/5",
      hoverColor: "group-hover:from-amber-500/20 group-hover:to-orange-500/10",
      iconColor: "text-amber-600",
      borderColor: "border-amber-200",
    },
    {
      label: "My Bookings",
      href: "/bookings",
      icon: TrendingUp,
      description: "Track your rentals",
      color: "from-blue-500/10 to-indigo-500/5",
      hoverColor: "group-hover:from-blue-500/20 group-hover:to-indigo-500/10",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      label: "Transactions",
      href: "/transactions",
      icon: TrendingUp,
      description: "View payment history",
      color: "from-violet-500/10 to-purple-500/5",
      hoverColor: "group-hover:from-violet-500/20 group-hover:to-purple-500/10",
      iconColor: "text-violet-600",
      borderColor: "border-violet-200",
    },
    {
      label: "Blog & Insights",
      href: "/blogs",
      icon: Package,
      description: "Latest farming tips",
      color: "from-rose-500/10 to-pink-500/5",
      hoverColor: "group-hover:from-rose-500/20 group-hover:to-pink-500/10",
      iconColor: "text-rose-600",
      borderColor: "border-rose-200",
    },
    {
      label: "Get Support",
      href: "/contact",
      icon: Headphones,
      description: "We're here to help",
      color: "from-teal-500/10 to-cyan-500/5",
      hoverColor: "group-hover:from-teal-500/20 group-hover:to-cyan-500/10",
      iconColor: "text-teal-600",
      borderColor: "border-teal-200",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <DashboardHeader user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12 md:space-y-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 group animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
          <div className="relative h-[280px] md:h-[360px] lg:h-[420px]">
            <img
              src="/modern-agricultural-farm-with-tractors-and-equipme.jpg"
              alt="Agricultural hub"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-20">
              <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white/90 mb-3 animate-slide-up">
                Welcome back, {user.name.split(" ")[0]}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-slide-up delay-100 leading-tight">
                Your Agricultural
                <br />
                Hub
              </h1>
              <p className="text-base md:text-xl text-white/95 max-w-2xl leading-relaxed animate-slide-up delay-200 font-light">
                Access premium equipment and skilled labour to optimize your farm operations
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Quick Actions</h2>
              <p className="text-muted-foreground text-sm md:text-base">Everything you need at your fingertips</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.label}
                  className={`group relative overflow-hidden cursor-pointer border-2 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:border-primary/30 animate-fade-in ${item.borderColor} bg-gradient-to-br ${item.color} ${item.hoverColor}`}
                  style={{ animationDelay: `${index * 80}ms` }}
                  onClick={() => router.push(item.href)}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/50 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-6 md:p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`p-4 rounded-2xl bg-white shadow-lg shadow-black/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl ${item.iconColor}`}
                      >
                        <Icon className="w-7 h-7" strokeWidth={2.5} />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
                        <ArrowRight className="w-5 h-5 text-foreground/60 group-hover:text-primary transition-all duration-500 group-hover:translate-x-1" />
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {item.label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Featured Equipment</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Top-rated agricultural machinery in your area
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/equipments")}
              className="group border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105 active:scale-95 font-semibold"
            >
              View All Equipment
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <EquipmentCarousel />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Comprehensive Services</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              AGRO RENT provides tailored agricultural solutions to maximize productivity and streamline operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Equipment Rental",
                description:
                  "Wide range of modern agricultural equipment available for daily, weekly, and monthly rental with flexible pricing.",
                icon: Package,
                color: "from-emerald-50 to-green-50",
                iconBg: "bg-emerald-100",
                iconColor: "text-emerald-700",
                borderColor: "border-emerald-200",
              },
              {
                title: "Labour Hiring",
                description:
                  "Access experienced and skilled agricultural workers for various farm operations with verified credentials.",
                icon: Users,
                color: "from-amber-50 to-orange-50",
                iconBg: "bg-amber-100",
                iconColor: "text-amber-700",
                borderColor: "border-amber-200",
              },
              {
                title: "Seasonal Packages",
                description:
                  "Customized packages for different farming seasons with special discounts and comprehensive bundle offers.",
                icon: TrendingUp,
                color: "from-blue-50 to-indigo-50",
                iconBg: "bg-blue-100",
                iconColor: "text-blue-700",
                borderColor: "border-blue-200",
              },
              {
                title: "Support & Maintenance",
                description:
                  "24/7 customer support and equipment maintenance guidance for optimal performance and peace of mind.",
                icon: Headphones,
                color: "from-violet-50 to-purple-50",
                iconBg: "bg-violet-100",
                iconColor: "text-violet-700",
                borderColor: "border-violet-200",
              },
              {
                title: "Rural Services",
                description:
                  "Specialized services covering rural and local areas with timely equipment delivery and on-site support.",
                icon: Package,
                color: "from-rose-50 to-pink-50",
                iconBg: "bg-rose-100",
                iconColor: "text-rose-700",
                borderColor: "border-rose-200",
              },
              {
                title: "Expert Guidance",
                description:
                  "Professional advice on equipment selection and labour requirements based on your specific farm needs.",
                icon: Users,
                color: "from-teal-50 to-cyan-50",
                iconBg: "bg-teal-100",
                iconColor: "text-teal-700",
                borderColor: "border-teal-200",
              },
            ].map((service, index) => {
              const ServiceIcon = service.icon
              return (
                <Card
                  key={service.title}
                  className={`group relative overflow-hidden border-2 ${service.borderColor} bg-gradient-to-br ${service.color} hover:shadow-2xl hover:scale-[1.02] hover:border-primary/40 transition-all duration-500 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/80 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative p-8">
                    <div
                      className={`inline-flex p-4 rounded-2xl ${service.iconBg} shadow-md mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                    >
                      <ServiceIcon className={`w-8 h-8 ${service.iconColor}`} strokeWidth={2.5} />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-fade-in"
          style={{ animationDelay: "500ms" }}
        >
          {[
            { value: "500+", label: "Equipment Units", gradient: "from-emerald-500 to-green-600" },
            { value: "1000+", label: "Skilled Workers", gradient: "from-amber-500 to-orange-600" },
            { value: "50+", label: "Districts Covered", gradient: "from-blue-500 to-indigo-600" },
            { value: "24/7", label: "Support Available", gradient: "from-violet-500 to-purple-600" },
          ].map((stat, index) => (
            <Card
              key={stat.label}
              className="group relative overflow-hidden border-2 border-border hover:border-primary/40 bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${600 + index * 80}ms` }}
            >
              <div className="p-8 text-center">
                <div
                  className={`inline-block bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent mb-3 transition-transform duration-500 group-hover:scale-110`}
                >
                  <h3 className="text-4xl md:text-5xl font-bold">{stat.value}</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</p>
              </div>
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
              />
            </Card>
          ))}
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-40">
        {showChatbot ? (
          <ChatBot onClose={() => setShowChatbot(false)} />
        ) : (
          <Button
            onClick={() => setShowChatbot(true)}
            className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 bg-gradient-to-r from-primary to-secondary active:scale-95"
            size="icon"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        )}
      </div>

      <footer className="relative border-t border-border bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden mt-16">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-fade-in">
              Developed By
            </h3>
            <p className="text-center text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Final Year Major Project 2025-26
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
              {[
                {
                  name: "Saurabh Kumar",
                  rollNo: "2202921530027",
                  email: "saurabh.kumar.aiml.2022@mitmeerut.ac.in",
                  delay: "0ms",
                },
                {
                  name: "Anubhav Raj",
                  rollNo: "2202921530006",
                  email: "anubhav.raj.aiml.2022@mitmeerut.ac.in",
                  delay: "100ms",
                },
                { name: "Nancy", rollNo: "2202921530017", email: "nancy.aiml.2022@mitmeerut.ac.in", delay: "200ms" },
                {
                  name: "Kuldeep Kumar",
                  rollNo: "2202921530015",
                  email: "kuldeep.kumar.aiml.2022@mitmeerut.ac.in",
                  delay: "300ms",
                },
              ].map((dev, index) => (
                <Card
                  key={dev.name}
                  className="group relative overflow-hidden border-2 hover:border-primary/50 bg-card hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: dev.delay }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                      <span className="text-2xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                        {dev.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {dev.name}
                    </h4>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Roll: {dev.rollNo}</p>
                      <p className="text-xs text-muted-foreground break-all leading-tight hover:text-primary transition-colors duration-300">
                        {dev.email}
                      </p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </Card>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">AGRO RENT</h4>
                  <p className="text-xs text-muted-foreground">Smart Agricultural Platform</p>
                </div>
              </div>

              <div className="text-center md:text-right">
                <p className="text-sm text-muted-foreground mb-2">CSE (AI & ML) • Meerut Institute of Technology</p>
                <p className="text-xs text-muted-foreground">© 2025 AGRO RENT. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
