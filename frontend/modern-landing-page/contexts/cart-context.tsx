"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useAuth } from "./auth-context"
import { CartAPI } from "@/apis/cart"
import { AuthDialog } from "@/components/ui/auth-dialog"
import type { Product } from "@/types"

interface CartItem {
  id: number
  product: Product
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  totalPrice: number
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const loadCart = async () => {
      try {
        // Clear cart when user logs out or when a new user logs in
        if (!user) {
          setItems([])
          CartAPI.clearCart() // Clear cart from storage
          return
        }

        // Reset cart for new user login
        CartAPI.clearCart()
        setItems([])
      } catch (error) {
        console.error("Error loading cart:", error)
      }
    }

    loadCart()
  }, [user]) // Reload cart when user changes (login/logout)

  const addToCart = async (product: Product) => {
    if (!user) {
      setShowAuthDialog(true)
      return
    }

    try {
      const existingItem = items.find(item => item.product.product_id === product.product_id)
      
      if (existingItem) {
        const updatedItems = items.map(item =>
          item.product.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        setItems(updatedItems)
        await CartAPI.updateCartItem(existingItem.id, existingItem.quantity + 1)
      } else {
        const newItem = { id: Date.now(), product, quantity: 1 }
        setItems([...items, newItem])
        await CartAPI.addToCart(product, 1)
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  const removeFromCart = async (productId: number) => {
    try {
      setItems(items.filter(item => Number(item.product.product_id) !== productId))
      await CartAPI.removeFromCart(productId)
    } catch (error) {
      console.error("Error removing from cart:", error)
    }
  }

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      const updatedItems = items.map(item =>
        Number(item.product.product_id) === productId
          ? { ...item, quantity }
          : item
      )
      setItems(updatedItems)
      await CartAPI.updateCartItem(productId, quantity)
    } catch (error) {
      console.error("Error updating cart:", error)
    }
  }

  const clearCart = async () => {
    try {
      setItems([])
      await CartAPI.clearCart()
    } catch (error) {
      console.error("Error clearing cart:", error)
    }
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce(
    (total, item) => total + Number(item.product.price) * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        title="Login Required"
        description="Please log in to your account to add items to your cart."
      />
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
} 