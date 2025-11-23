import fs from "fs"
import path from "path"

const BOOKINGS_FILE = path.join(process.cwd(), "data", "bookings.json")

export interface EquipmentBooking {
  id: string
  userId: string
  equipmentId: string
  equipmentName: string
  startDate: string
  endDate: string
  durationType: "daily" | "weekly" | "monthly"
  totalAmount: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: string
  type: "Equipment"
}

export interface LabourBooking {
  id: string
  userId: string
  labourId: string
  labourName: string
  startDate: string
  endDate: string
  daysRequired: number
  totalAmount: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: string
  type: "Labour"
}

function ensureDataDir() {
  const dataDir = path.dirname(BOOKINGS_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

function getAllBookings(): (EquipmentBooking | LabourBooking)[] {
  try {
    ensureDataDir()
    if (!fs.existsSync(BOOKINGS_FILE)) {
      return []
    }
    const data = fs.readFileSync(BOOKINGS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function addBooking(booking: EquipmentBooking | LabourBooking): void {
  ensureDataDir()
  const bookings = getAllBookings()
  bookings.push(booking)
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2))
}

export function getUserBookings(userId: string): (EquipmentBooking | LabourBooking)[] {
  const bookings = getAllBookings()
  return bookings.filter((b) => b.userId === userId)
}

export function getUserActiveBookings(userId: string): (EquipmentBooking | LabourBooking)[] {
  return getUserBookings(userId).filter((b) => b.status === "pending" || b.status === "confirmed")
}

export function getUserPastBookings(userId: string): (EquipmentBooking | LabourBooking)[] {
  return getUserBookings(userId).filter((b) => b.status === "completed" || b.status === "cancelled")
}
