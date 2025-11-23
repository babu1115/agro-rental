import { authenticateUser } from "@/lib/auth-utils"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    console.log("[v0] Login attempt for username:", username)

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const user = authenticateUser(username, password)

    if (!user) {
      console.log("[v0] Authentication failed for username:", username)
      return NextResponse.json(
        { error: "Invalid username or password. Please check your credentials." },
        { status: 401 },
      )
    }

    console.log("[v0] Authentication successful for user:", user.id)

    return NextResponse.json({
      message: "User authenticated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
      },
    })
  } catch (error) {
    console.error("[v0] User login error:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}
