import { type NextRequest, NextResponse } from "next/server"
import { addBooking } from "@/lib/bookings-store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { userId, equipmentId, equipmentName, startDate, endDate, durationType, totalAmount } = body

    if (!userId || !equipmentId || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const booking = {
      id: `eq_${Date.now()}`,
      userId,
      equipmentId,
      equipmentName,
      startDate,
      endDate,
      durationType,
      totalAmount,
      status: "confirmed" as const,
      createdAt: new Date().toISOString(),
      type: "Equipment" as const,
    }

    addBooking(booking)

    return NextResponse.json({
      message: "Equipment booked successfully",
      booking,
    })
  } catch (error) {
    console.error("Equipment booking error:", error)
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
