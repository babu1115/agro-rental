import { authenticateAdmin } from "@/lib/auth-utils"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const isValid = authenticateAdmin(username, password)

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid admin credentials. Please check username and password." },
        { status: 401 },
      )
    }

    return NextResponse.json({
      message: "Admin authenticated successfully",
      admin: {
        username: username,
        role: "admin",
      },
    })
  } catch (error) {
    console.log("[v0] Admin auth error:", error)
    return NextResponse.json({ error: "An error occurred during admin authentication" }, { status: 500 })
  }
}
