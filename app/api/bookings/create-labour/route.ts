import { type NextRequest, NextResponse } from "next/server"
import { addBooking } from "@/lib/bookings-store"

export async function POST(request: NextRequest) {
  try {
    const { userId, labourId, labourName, startDate, endDate, daysRequired, totalAmount } = await request.json()

    if (!userId || !labourId || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const booking = {
      id: `labour_${Date.now()}`,
      userId,
      labourId,
      labourName,
      startDate,
      endDate,
      daysRequired,
      totalAmount,
      status: "confirmed" as const,
      createdAt: new Date().toISOString(),
      type: "Labour" as const,
    }

    addBooking(booking)

    return NextResponse.json({
      message: "Labour booked successfully",
      booking,
    })
  } catch (error) {
    console.error("[v0] Labour booking error:", error)
    return NextResponse.json({ error: "Server error", details: String(error) }, { status: 500 })
  }
}
