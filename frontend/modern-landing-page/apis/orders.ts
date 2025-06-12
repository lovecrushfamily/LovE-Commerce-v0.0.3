import type { Order, CartItem, Address } from "@/types"
import { mockOrders } from "@/lib/mock-data"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class OrderAPI {
  static async getUserOrders(userId: number): Promise<Order[]> {
    await delay(500)
    return mockOrders.filter((order) => order.userId === userId)
  }

  static async getOrderById(orderId: number): Promise<Order | null> {
    await delay(300)
    return mockOrders.find((order) => order.id === orderId) || null
  }

  static async createOrder(
    userId: number,
    items: CartItem[],
    shippingAddress: Address,
    paymentMethod: string,
  ): Promise<Order> {
    await delay(800)

    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    const newOrder: Order = {
      id: Date.now(),
      userId,
      items,
      total,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
      shippingAddress,
      paymentMethod,
    }

    // In a real app, this would be sent to the server
    mockOrders.push(newOrder)

    return newOrder
  }

  static async updateOrderStatus(orderId: number, status: Order["status"]): Promise<Order | null> {
    await delay(400)
    const order = mockOrders.find((order) => order.id === orderId)
    if (order) {
      order.status = status
    }
    return order || null
  }
}
