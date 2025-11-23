"use client"

import { useState } from "react"
import { Leaf, LogOut, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DashboardHeaderProps {
  user: any
  onLogout: () => void
}

export default function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  const [showProfile, setShowProfile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <header className="border-b-2 border-border/50 bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity" />
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <Leaf className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AGRO RENT
            </h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-semibold tracking-wide hidden sm:block">
              SMART FARM SOLUTIONS
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {[
            { label: "Home", href: "/dashboard" },
            { label: "Equipment", href: "/equipments" },
            { label: "Labour", href: "/labour" },
            { label: "Bookings", href: "/bookings" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative px-6 py-3 text-sm font-bold text-foreground transition-all duration-300 hover:text-primary hover:scale-105 active:scale-95 group"
              style={{
                clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)",
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
              }}
            >
              <span className="relative z-10">{link.label}</span>
              {/* Dogear corner effect */}
              <div
                className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-br from-muted to-border transition-all duration-300 group-hover:from-primary/20 group-hover:to-primary/40"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                }}
              />
              {/* Hover gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)",
                }}
              />
            </Link>
          ))}
        </nav>

        <div className="relative flex items-center gap-3">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2.5 hover:bg-muted/80 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2.5 px-3 py-2 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 group border-2 border-transparent hover:border-primary/20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity" />
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <span className="text-white font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <span className="text-sm font-semibold hidden sm:inline text-foreground group-hover:text-primary transition-colors">
              {user.name.split(" ")[0]}
            </span>
          </button>

          {showProfile && (
            <div className="absolute top-full right-0 mt-3 w-80 bg-white border-2 border-border rounded-2xl shadow-2xl p-6 animate-slide-down">
              <div className="flex items-center gap-4 pb-5 border-b-2 border-border/50 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-bold text-foreground text-lg">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors border border-border/30">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Username</p>
                    <p className="font-semibold text-sm">{user.username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/5 transition-colors border border-border/30">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Phone</p>
                    <p className="font-semibold text-sm">{user.phone}</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  onLogout()
                  setShowProfile(false)
                }}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-xl text-white font-semibold transition-all duration-300 hover:scale-105 active:scale-95 py-6"
                size="lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden border-t-2 border-border/50 bg-white/98 backdrop-blur-sm animate-slide-down">
          <nav className="flex flex-col gap-2 p-4">
            {[
              { label: "Home", href: "/dashboard" },
              { label: "Equipment", href: "/equipments" },
              { label: "Labour", href: "/labour" },
              { label: "Bookings", href: "/bookings" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-5 py-3 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:text-primary"
                style={{
                  clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)",
                  background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                }}
              >
                <span className="relative z-10">{link.label}</span>
                {/* Dogear corner effect */}
                <div
                  className="absolute top-0 right-0 w-2.5 h-2.5 bg-gradient-to-br from-muted to-border"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                  }}
                />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
