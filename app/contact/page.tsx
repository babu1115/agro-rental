"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DashboardHeader from "@/components/dashboard-header"
import { Phone, Mail, AlertCircle, CheckCircle, Send, User, GraduationCap, MapPin } from "lucide-react"

export default function ContactPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const userRole = localStorage.getItem("userRole")

    if (!userData || userRole !== "user") {
      router.push("/")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setFormData((prev) => ({
      ...prev,
      name: parsedUser.name,
      email: parsedUser.email,
      phone: parsedUser.phone,
    }))

    setTimeout(() => setIsVisible(true), 100)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/contact/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setSuccess("Message sent successfully! We will get back to you soon.")
      setFormData({
        ...formData,
        message: "",
      })
    } catch (err) {
      setError("Error sending message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  const developers = [
    {
      name: "Saurabh Kumar",
      rollNo: "2202921530027",
      course: "CSE (AI & ML)",
      email: "saurabh.kumar.aiml.2022@mitmeerut.ac.in",
    },
    {
      name: "Anubhav Raj",
      rollNo: "2202921530006",
      course: "CSE (AI & ML)",
      email: "anubhav.raj.aiml.2022@mitmeerut.ac.in",
    },
    {
      name: "Nancy",
      rollNo: "2202921530017",
      course: "CSE (AI & ML)",
      email: "nancy.aiml.2022@mitmeerut.ac.in",
    },
    {
      name: "Kuldeep Kumar",
      rollNo: "2202921530015",
      course: "CSE (AI & ML)",
      email: "kuldeep.kumar.aiml.2022@mitmeerut.ac.in",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-white">
      <DashboardHeader user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 px-4 sm:px-6 py-2.5 rounded-full mb-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
            <Mail className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-primary tracking-wide">GET IN TOUCH</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 text-balance leading-tight">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
              Us
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed px-4">
            Have questions or need assistance? We're here to help you with all your agricultural needs.
          </p>
        </div>

        <div
          className={`mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Development Team
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">Meet the talented minds behind Agro Rent</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {developers.map((dev, index) => (
              <Card
                key={index}
                className={`p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white border-2 border-border hover:border-primary/40 group relative overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative mb-5 sm:mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-lg opacity-20 group-hover:opacity-50 transition-all duration-500 scale-90 group-hover:scale-110" />
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-xl mx-auto transform group-hover:rotate-6 transition-transform duration-500">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                <div className="relative">
                  <h3 className="font-bold text-lg sm:text-xl text-foreground mb-3 text-center group-hover:text-primary transition-colors duration-300">
                    {dev.name}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <p className="font-semibold text-xs sm:text-sm">Roll No: {dev.rollNo}</p>
                        <p className="text-xs sm:text-sm">{dev.course}</p>
                      </div>
                    </div>
                    <a
                      href={`mailto:${dev.email}`}
                      className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-all duration-300 group/email"
                    >
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 group-hover/email:scale-125 group-hover/email:rotate-12 transition-all duration-300" />
                      <span className="text-xs break-all group-hover/email:underline">{dev.email}</span>
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card
          className={`p-6 sm:p-10 mb-12 sm:mb-16 lg:mb-20 bg-gradient-to-br from-white via-primary/5 to-secondary/5 border-2 border-primary/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl blur-2xl opacity-40 animate-pulse" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-2xl transform hover:rotate-12 hover:scale-110 transition-all duration-500">
                <GraduationCap className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="text-center sm:text-left flex-1">
              <p className="text-xs sm:text-sm font-bold text-primary mb-2 tracking-wider uppercase">
                Project Supervisor
              </p>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 hover:text-primary transition-colors duration-300">
                Dr. Himanshu Sirohi
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground justify-center sm:justify-start hover:text-foreground transition-colors duration-300 group">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:scale-125 transition-transform duration-300" />
                <p className="font-medium text-sm sm:text-base">Meerut Institute of Technology, Meerut</p>
              </div>
            </div>
          </div>
        </Card>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <Card className="p-6 sm:p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-2 border-border hover:border-primary/40 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-start gap-4 sm:gap-6 relative">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500 scale-90 group-hover:scale-110" />
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-all duration-500">
                  <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                  Email Us
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Send us an email and we'll respond within 24 hours
                </p>
                <a
                  href="mailto:agrorentofficial@gmail.com"
                  className="text-primary hover:text-secondary font-bold text-sm sm:text-base hover:underline transition-all flex items-center gap-2 group/link"
                >
                  <span className="break-all">agrorentofficial@gmail.com</span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover/link:translate-x-2 group-hover/link:scale-110 transition-all duration-300" />
                </a>
              </div>
            </div>
          </Card>

          <Card
            className={`p-6 sm:p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-2 border-border hover:border-secondary/40 group relative overflow-hidden ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            style={{ transitionDelay: "800ms" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-start gap-4 sm:gap-6 relative">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500 scale-90 group-hover:scale-110" />
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-xl transform group-hover:-rotate-12 transition-all duration-500">
                  <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-secondary transition-colors duration-300">
                  WhatsApp
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Send us a message on WhatsApp for instant support
                </p>
                <a
                  href="https://wa.me/918409602811"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-secondary to-accent text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                  +91 8409602811
                </a>
              </div>
            </div>
          </Card>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-10 border-2 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-card/50 hover:-translate-y-1">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Send us a Message
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">We'll respond within 24 hours</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl flex gap-3 items-start animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800 dark:text-red-300 text-sm font-medium">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl flex gap-3 items-start animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-green-800 dark:text-green-300 text-sm font-medium">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-bold mb-3 text-foreground">Full Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-2 border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/20 text-sm transition-all duration-300 group-hover:bg-background group-hover:border-primary/30 h-12"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-bold mb-3 text-foreground">Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-2 border-border/50 focus:border-secondary focus:ring-4 focus:ring-secondary/20 text-sm transition-all duration-300 group-hover:bg-background group-hover:border-secondary/30 h-12"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-bold mb-3 text-foreground">Phone Number</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-background/50 border-2 border-border/50 focus:border-accent focus:ring-4 focus:ring-accent/20 text-sm transition-all duration-300 group-hover:bg-background group-hover:border-accent/30 h-12"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-bold mb-3 text-foreground">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    required
                    className="w-full border-2 border-border/50 rounded-xl px-4 py-3 bg-background/50 text-foreground resize-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 group-hover:bg-background group-hover:border-primary/30"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-2xl text-white font-bold py-4 sm:py-6 h-auto text-base sm:text-lg transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group"
                  disabled={loading}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative flex items-center justify-center gap-2">
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    {loading ? "Sending..." : "Send Message"}
                  </span>
                </Button>
              </form>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sm:p-8 border-2 border-border/50 shadow-xl bg-gradient-to-br from-card to-primary/5 sticky top-24 hover:shadow-2xl transition-all duration-500">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Quick FAQ
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <details className="group cursor-pointer p-4 rounded-xl hover:bg-primary/5 transition-all duration-300">
                  <summary className="font-bold text-sm sm:text-base text-foreground group-open:text-primary transition-colors duration-300 flex items-center gap-3">
                    <span className="text-xl text-primary group-open:rotate-90 transition-transform duration-500">
                      ›
                    </span>
                    Booking Timeline?
                  </summary>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-3 ml-9 leading-relaxed">
                    Most bookings are processed within 24 hours with instant confirmation.
                  </p>
                </details>
                <details className="group cursor-pointer p-4 rounded-xl hover:bg-secondary/5 transition-all duration-300">
                  <summary className="font-bold text-sm sm:text-base text-foreground group-open:text-secondary transition-colors duration-300 flex items-center gap-3">
                    <span className="text-xl text-secondary group-open:rotate-90 transition-transform duration-500">
                      ›
                    </span>
                    Cancellation Policy?
                  </summary>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-3 ml-9 leading-relaxed">
                    Free cancellation up to 24 hours before rental. Charges apply after that.
                  </p>
                </details>
                <details className="group cursor-pointer p-4 rounded-xl hover:bg-accent/5 transition-all duration-300">
                  <summary className="font-bold text-sm sm:text-base text-foreground group-open:text-accent transition-colors duration-300 flex items-center gap-3">
                    <span className="text-xl text-accent group-open:rotate-90 transition-transform duration-500">
                      ›
                    </span>
                    Delivery Available?
                  </summary>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-3 ml-9 leading-relaxed">
                    Yes! Free delivery to most areas within our service region.
                  </p>
                </details>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-card/30 backdrop-blur-lg py-8">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-sm text-muted-foreground text-center font-medium">
              Developed by Saurabh Kumar, Anubhav Raj, Nancy, and Kuldeep Kumar under the supervision of Dr. Himanshu
              Sirohi at Meerut Institute of Technology, Meerut
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
