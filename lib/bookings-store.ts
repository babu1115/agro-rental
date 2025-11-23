// This provides a centralized, reliable way to manage bookings across API routes with browser persistence

const STORAGE_KEY = "agro_rent_bookings"

// Initialize from localStorage or create empty array
function getStoredBookings(): any[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("[v0] Error reading from localStorage:", error)
    return []
  }
}

// Save bookings to localStorage
function saveBookings(bookings: any[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  } catch (error) {
    console.error("[v0] Error saving to localStorage:", error)
  }
}

export function getBookingsStore() {
  return getStoredBookings()
}

export function addBooking(booking: any) {
  const bookings = getStoredBookings()
  bookings.push(booking)
  saveBookings(bookings)
  return booking
}

export function getActiveBookings(userId: string) {
  const bookings = getStoredBookings()
  return bookings.filter((b) => b.userId === userId && (b.status === "pending" || b.status === "confirmed"))
}

export function getPastBookings(userId: string) {
  const bookings = getStoredBookings()
  return bookings.filter((b) => b.userId === userId && (b.status === "completed" || b.status === "cancelled"))
}

export function clearAllBookings() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY)
  }
}
