import { type NextRequest, NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import path from "path"

const CREDENTIALS_FILE = path.join(process.cwd(), "data", "user_credentials.json")

export async function POST(request: NextRequest) {
  try {
    const credentials = await request.json()

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), "data")
    try {
      await mkdir(dataDir, { recursive: true })
    } catch (err) {
      // Directory might already exist
    }

    // Read existing credentials
    let existingCredentials = []
    try {
      const fileContent = await readFile(CREDENTIALS_FILE, "utf-8")
      existingCredentials = JSON.parse(fileContent)
    } catch (err) {
      // File doesn't exist yet, start with empty array
    }

    // Add new credentials
    existingCredentials.push(credentials)

    // Write back to file
    await writeFile(CREDENTIALS_FILE, JSON.stringify(existingCredentials, null, 2), "utf-8")

    return NextResponse.json({ message: "Credentials saved successfully" })
  } catch (error) {
    console.log("[v0] Error saving credentials:", error)
    return NextResponse.json({ error: "Failed to save credentials" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const fileContent = await readFile(CREDENTIALS_FILE, "utf-8")
    const credentials = JSON.parse(fileContent)
    return NextResponse.json({ credentials })
  } catch (error) {
    return NextResponse.json({ credentials: [] })
  }
}
