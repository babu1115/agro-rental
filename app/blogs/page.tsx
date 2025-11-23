"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/dashboard-header"
import { blogPosts } from "@/lib/equipment-data"
import { Calendar, User, ArrowRight, Clock, Tag } from "lucide-react"

export default function BlogsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedBlog, setSelectedBlog] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const userRole = localStorage.getItem("userRole")

    if (!userData || userRole !== "user") {
      router.push("/")
      return
    }

    setUser(JSON.parse(userData))
    setTimeout(() => setMounted(true), 100)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div
          className={`mb-12 md:mb-16 text-center transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-sm font-medium text-primary">Latest Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-black dark:text-white">AGRO RENT Blog</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stay updated with latest agricultural technologies, equipment announcements, and industry insights
          </p>
        </div>

        {selectedBlog ? (
          /* Blog Detail View */
          <div
            className={`mb-16 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              variant="outline"
              onClick={() => {
                setSelectedBlog(null)
                setMounted(false)
                setTimeout(() => setMounted(true), 100)
              }}
              className="mb-6 hover:bg-primary hover:text-primary-foreground transition-all"
            >
              ← Back to Blog List
            </Button>

            <Card className="p-6 md:p-12 border-2 hover:border-primary/30 transition-all duration-300">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20 flex items-center gap-2">
                    <Tag className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium text-primary">Agricultural Technology</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-balance">
                  {selectedBlog.title}
                </h1>
                <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedBlog.date)}
                  </div>
                  <div className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <User className="w-4 h-4" />
                    {selectedBlog.author}
                  </div>
                  <div className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <Clock className="w-4 h-4" />5 min read
                  </div>
                </div>
              </div>

              <div className="relative mb-8 rounded-xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={
                    selectedBlog.id === "1"
                      ? "/images/blog-soil-testing.jpg"
                      : selectedBlog.id === "2"
                        ? "/images/blog-drip-irrigation.jpg"
                        : selectedBlog.id === "3"
                          ? "/images/blog-agricultural-drone.jpg"
                          : "/images/blog-organic-farming.jpg"
                  }
                  alt={selectedBlog.title}
                  className="w-full h-64 md:h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
                  {selectedBlog.content}
                </p>

                <div className="mt-8 p-6 md:p-8 bg-gradient-to-br from-primary/5 to-green-500/5 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <h3 className="font-bold text-xl md:text-2xl mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full" />
                    Key Highlights
                  </h3>
                  <ul className="space-y-3 text-foreground/90">
                    <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Advanced technology solutions for modern farming</span>
                    </li>
                    <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Improved productivity and reduced operational costs</span>
                    </li>
                    <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Real-time monitoring and data analytics</span>
                    </li>
                    <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Sustainable and eco-friendly practices</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 md:p-8 bg-gradient-to-r from-primary/10 via-green-500/10 to-primary/10 rounded-xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
                <h3 className="font-bold text-lg md:text-xl mb-2">Interested in this solution?</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  Contact us to learn more about how AGRO RENT can help you with these innovative solutions.
                </p>
                <Button
                  onClick={() => router.push("/contact")}
                  className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/50"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          /* Blog List View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
            {blogPosts.map((post, index) => (
              <Card
                key={post.id}
                className={`overflow-hidden border-2 hover:border-primary/40 hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
                onClick={() => {
                  setSelectedBlog(post)
                  setMounted(false)
                  setTimeout(() => setMounted(true), 100)
                }}
              >
                <div className="relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-primary/90 backdrop-blur-sm rounded-full">
                    <span className="text-xs font-medium text-primary-foreground">Featured</span>
                  </div>
                  <img
                    src={
                      post.id === "1"
                        ? "/images/blog-soil-testing.jpg"
                        : post.id === "2"
                          ? "/images/blog-drip-irrigation.jpg"
                          : post.id === "3"
                            ? "/images/blog-agricultural-drone.jpg"
                            : "/images/blog-organic-farming.jpg"
                    }
                    alt={post.title}
                    className="w-full h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-2 py-1 bg-primary/10 rounded text-xs font-medium text-primary">AgriTech</div>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 leading-tight text-balance">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-3 md:gap-4 items-center text-xs md:text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <User className="w-3 h-3 md:w-4 md:h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />5 min
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-primary font-medium text-sm md:text-base group/read hover:gap-3 transition-all duration-300">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/read:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t-2 border-border bg-card/50 backdrop-blur-sm py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs md:text-sm text-muted-foreground text-center hover:text-foreground transition-colors">
            Built by Saurabh Kumar, Anubhav Raj, Nancy, Kuldeep Kumar for the fulfillment of the major project in the
            final year.
          </p>
        </div>
      </footer>
    </div>
  )
}
