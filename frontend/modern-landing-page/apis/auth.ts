import type { Account } from "@/types"

const API_URL = "http://localhost:3000/api/account"

export class AuthAPI {
  static async getAllAccounts(): Promise<Account[]> {
    try {
      const response = await fetch(`${API_URL}/get-all`)

      if (!response.ok) {
        throw new Error("Failed to fetch accounts")
      }

      const data = await response.json()
      console.log("All accounts:", data)
      return data
    } catch (error) {
      console.error("Error fetching accounts:", error)
      return []
    }
  }

  static async createAccount(userData: {
    user_name: string
    email: string
    password: string
    phone?: string
  }): Promise<Account> {
    try {
      const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: userData.user_name,
          email: userData.email,
          password: userData.password,
          online: "off",
          status: "verify"
        }),
      })

      const data = await response.json()
      console.log("Create account response:", data)

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      return data
    } catch (error) {
      console.error("Registration error:", error)
      throw error instanceof Error ? error : new Error("Registration failed")
    }
  }

  static async login(email: string, password: string): Promise<Account> {
    try {
      // Get all accounts
      const accounts = await this.getAllAccounts()
      
      // Find matching account
      const account = accounts.find(acc => acc.email === email)
      
      if (!account) {
        throw new Error("Account not found")
      }

      // For now, we'll just check if the account exists
      // In a real application, you would verify the password here
      return account
    } catch (error) {
      console.error("Login error:", error)
      throw error instanceof Error ? error : new Error("Login failed")
    }
  }

  static async logout(): Promise<void> {
    // Since we're not using a real logout endpoint, we'll just resolve
    return Promise.resolve()
  }
} 