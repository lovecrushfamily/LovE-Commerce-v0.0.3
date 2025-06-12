export interface Feedback {
  id: number
  userId?: number
  rating: number
  content: string
  createdAt: string
  status: "pending" | "reviewed" | "resolved"
}

// Mock feedback storage
const mockFeedbacks: Feedback[] = []

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class FeedbackAPI {
  static async submitFeedback(rating: number, content: string, userId?: number): Promise<Feedback> {
    await delay(800)

    const newFeedback: Feedback = {
      id: Date.now(),
      userId,
      rating,
      content,
      createdAt: new Date().toISOString(),
      status: "pending",
    }

    // In a real app, this would be sent to the server
    mockFeedbacks.push(newFeedback)

    // Simulate potential API error (5% chance)
    if (Math.random() < 0.05) {
      throw new Error("Failed to submit feedback")
    }

    return newFeedback
  }

  static async getAllFeedbacks(): Promise<Feedback[]> {
    await delay(500)
    return [...mockFeedbacks].reverse() // Most recent first
  }

  static async updateFeedbackStatus(id: number, status: Feedback["status"]): Promise<Feedback | null> {
    await delay(300)
    const feedback = mockFeedbacks.find((f) => f.id === id)
    if (feedback) {
      feedback.status = status
    }
    return feedback || null
  }

  // Real API version (when USE_REAL_API is true)
  static async submitFeedbackReal(rating: number, content: string, userId?: number): Promise<Feedback> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating,
        content,
        userId,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to submit feedback")
    }

    return response.json()
  }

  static async getAllFeedbacksReal(): Promise<Feedback[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`)

    if (!response.ok) {
      throw new Error("Failed to fetch feedbacks")
    }

    return response.json()
  }
}
