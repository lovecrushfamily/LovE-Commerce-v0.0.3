import type { CartItem, Product } from "@/types"

export class CartAPI {
  private static CART_KEY = "ecommerce_cart"

  static getCart(): CartItem[] {
    if (typeof window === "undefined") return []
    const cart = localStorage.getItem(this.CART_KEY)
    return cart ? JSON.parse(cart) : []
  }

  static addToCart(product: Product, quantity = 1): CartItem[] {
    const cart = this.getCart()
    const existingItem = cart.find((item) => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        id: Date.now(),
        product,
        quantity,
      })
    }

    localStorage.setItem(this.CART_KEY, JSON.stringify(cart))
    return cart
  }

  static updateCartItem(itemId: number, quantity: number): CartItem[] {
    const cart = this.getCart()
    const item = cart.find((item) => item.id === itemId)

    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(itemId)
      }
      item.quantity = quantity
    }

    localStorage.setItem(this.CART_KEY, JSON.stringify(cart))
    return cart
  }

  static removeFromCart(itemId: number): CartItem[] {
    const cart = this.getCart().filter((item) => item.id !== itemId)
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart))
    return cart
  }

  static clearCart(): void {
    localStorage.removeItem(this.CART_KEY)
  }

  static getCartTotal(): number {
    return this.getCart().reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  static getCartItemCount(): number {
    return this.getCart().reduce((count, item) => count + item.quantity, 0)
  }
}
