import { type NextRequest, NextResponse } from "next/server"
import { getPastBookings } from "@/lib/bookings-store"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const userBookings = getPastBookings(userId)

    return NextResponse.json({
      bookings: userBookings.map((b: any) => ({
        id: b.id,
        type: b.type || ("equipmentId" in b ? "Equipment" : "Labour"),
        name: "equipmentName" in b ? b.equipmentName : b.labourName,
        startDate: b.startDate,
        endDate: b.endDate,
        totalAmount: b.totalAmount,
        status: b.status,
        paymentStatus: "Paid",
      })),
    })
  } catch (error) {
    console.error("Past bookings API error:", error)
    return NextResponse.json({ error: "Server error", details: String(error) }, { status: 500 })
  }
}
