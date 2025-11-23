interface UserCredentials {
  id: string
  name: string
  phone: string
  email: string
  username: string
  password: string
  createdAt: string
}

// Default admin credentials
const ADMIN_CREDENTIALS = {
  username: "Admin1",
  password: "123",
}

const STORAGE_KEY = "agro_rent_users"

// Helper function to load users from localStorage
function loadUsersFromStorage(): UserCredentials[] {
  if (typeof window === "undefined") {
    // Server-side: return demo user only
    return [
      {
        id: "user_demo",
        name: "Demo User",
        phone: "9876543210",
        email: "demo@agro.com",
        username: "user_demo_9876543210",
        password: "DemoUser@3210",
        createdAt: new Date().toISOString(),
      },
    ]
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("[v0] Error loading users from localStorage:", error)
  }

  // Return default demo user if nothing in storage
  return [
    {
      id: "user_demo",
      name: "Demo User",
      phone: "9876543210",
      email: "demo@agro.com",
      username: "user_demo_9876543210",
      password: "DemoUser@3210",
      createdAt: new Date().toISOString(),
    },
  ]
}

// Helper function to save users to localStorage
function saveUsersToStorage(users: UserCredentials[]): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    } catch (error) {
      console.error("[v0] Error saving users to localStorage:", error)
    }
  }
}

// Initialize users from localStorage
let usersStore: UserCredentials[] = loadUsersFromStorage()

function generateUsername(name: string, phone: string): string {
  const cleanName = name.trim().replace(/\s+/g, "")
  const last4Digits = phone.replace(/\D/g, "").slice(-4)
  return `${cleanName}${last4Digits}`
}

function generatePassword(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let password = ""
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

export function getAllUsers(): UserCredentials[] {
  usersStore = loadUsersFromStorage()
  return usersStore
}

export function getUserById(id: string): UserCredentials | null {
  usersStore = loadUsersFromStorage()
  return usersStore.find((u) => u.id === id) || null
}

export function getUserByUsername(username: string): UserCredentials | null {
  usersStore = loadUsersFromStorage()
  return usersStore.find((u) => u.username === username) || null
}

export function registerUser(name: string, phone: string, email: string): UserCredentials {
  usersStore = loadUsersFromStorage()

  const username = generateUsername(name, phone)
  const password = generatePassword()
  const newUser: UserCredentials = {
    id: `user_${Date.now()}`,
    name,
    phone,
    email,
    username,
    password,
    createdAt: new Date().toISOString(),
  }

  usersStore.push(newUser)
  saveUsersToStorage(usersStore)
  return newUser
}

export function authenticateUser(username: string, password: string): UserCredentials | null {
  usersStore = loadUsersFromStorage()
  const user = getUserByUsername(username)
  if (user && user.password === password) {
    return user
  }
  return null
}

export function authenticateAdmin(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}
