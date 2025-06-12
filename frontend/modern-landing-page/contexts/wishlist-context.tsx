"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useAuth } from "./auth-context"
import { WishlistAPI } from "@/apis/wishlist"
import { AuthDialog } from "@/components/ui/auth-dialog"
import type { Product } from "@/types"

interface WishlistContextType {
  items: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([])
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    setItems(WishlistAPI.getWishlist())
  }, [])

  const addToWishlist = (product: Product) => {
    if (!user) {
      setShowAuthDialog(true)
      return
    }
    setItems(WishlistAPI.addToWishlist(product))
  }

  const removeFromWishlist = (productId: number) => {
    setItems(WishlistAPI.removeFromWishlist(productId))
  }

  const isInWishlist = (productId: number) => {
    return WishlistAPI.isInWishlist(productId)
  }

  const clearWishlist = () => {
    WishlistAPI.clearWishlist()
    setItems([])
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        title="Login Required"
        description="Please log in to your account to add items to your wishlist."
      />
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
} 