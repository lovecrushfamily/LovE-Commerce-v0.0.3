"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { AuthDialog } from "@/components/ui/auth-dialog"
import { useRouter } from "next/navigation"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { itemCount } = useCart()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleCartClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault()
      setShowAuthDialog(true)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">LovE-commerce</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search products by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/wishlist">
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link href="/cart" className="relative" onClick={handleCartClick}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {user && itemCount > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  {user ? user.user_name : "Account"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/account">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login">Sign In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register">Register</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/cart" className="flex items-center space-x-2" onClick={handleCartClick}>
                  <ShoppingCart className="w-4 h-4" />
                  <span className="flex items-center">
                    Cart
                    {user && itemCount > 0 && (
                      <Badge variant="destructive" className="ml-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                        {itemCount}
                      </Badge>
                    )}
                  </span>
                </Link>
                <Link href="/wishlist" className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </Link>
                {user ? (
                  <>
                    <Link href="/account" className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>My Account</span>
                    </Link>
                    <Link href="/orders">My Orders</Link>
                    <Button variant="ghost" onClick={logout}>Sign Out</Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">Sign In</Link>
                    <Link href="/register">Register</Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Categories Navigation */}
        <div className="hidden lg:flex items-center space-x-8 py-2 border-t">
          <Link href="/category/electronics" className="text-sm hover:text-primary">
            Electronics
          </Link>
          <Link href="/category/fashion" className="text-sm hover:text-primary">
            Fashion
          </Link>
          <Link href="/category/home-garden" className="text-sm hover:text-primary">
            Home & Garden
          </Link>
          <Link href="/category/sports" className="text-sm hover:text-primary">
            Sports
          </Link>
          <Link href="/category/books" className="text-sm hover:text-primary">
            Books
          </Link>
          <Link href="/category/beauty" className="text-sm hover:text-primary">
            Beauty
          </Link>
        </div>
      </div>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        title="Login Required"
        description="Please log in to your account to view your cart."
      />
    </header>
  )
}
