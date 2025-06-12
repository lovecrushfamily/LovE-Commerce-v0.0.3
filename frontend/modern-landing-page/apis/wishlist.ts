import type { Product } from "@/types"

export class WishlistAPI {
  private static WISHLIST_KEY = "ecommerce_wishlist"

  static getWishlist(): Product[] {
    if (typeof window === "undefined") return []
    const wishlist = localStorage.getItem(this.WISHLIST_KEY)
    return wishlist ? JSON.parse(wishlist) : []
  }

  static addToWishlist(product: Product): Product[] {
    const wishlist = this.getWishlist()
    const exists = wishlist.some((item) => item.product_id === product.product_id)

    if (!exists) {
      wishlist.push(product)
      localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(wishlist))
    }

    return wishlist
  }

  static removeFromWishlist(productId: number): Product[] {
    const wishlist = this.getWishlist().filter((item) => item.product_id !== productId)
    localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(wishlist))
    return wishlist
  }

  static isInWishlist(productId: number): boolean {
    return this.getWishlist().some((item) => item.product_id === productId)
  }

  static clearWishlist(): void {
    localStorage.removeItem(this.WISHLIST_KEY)
  }
} 