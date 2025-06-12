"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Truck, Shield, Headphones, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/product/product-card"
import { FeedbackFloatingButton } from "@/components/feedback/feedback-floating-button"
import type { Product, Category } from "@/types"
import { RealProductAPI, ProductAPI, CategoryAPI } from "@/apis/products"
import { AuthAPI } from "@/apis/auth"

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Get all accounts first
        await AuthAPI.getAllAccounts()

        const [realProducts, mockProducts, cats] = await Promise.all([
          RealProductAPI.getAllProducts(),
          ProductAPI.getAllProducts(),
          CategoryAPI.getAllCategories()
        ])
        
        // Combine real and mock products, ensuring no duplicates
        const combinedProducts = [...realProducts]
        mockProducts.forEach(mockProduct => {
          // Check if a product with the same ID already exists
          const exists = combinedProducts.some(realProduct => 
            realProduct.product_id === mockProduct.product_id
          )
          if (!exists) {
            combinedProducts.push(mockProduct)
          }
        })

        console.log('Combined Products:', combinedProducts)
        console.log('Categories API Response:', cats)
        setFeaturedProducts(combinedProducts)
        setCategories(cats)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white space-y-6">
              <Badge variant="secondary" className="bg-white/20 text-white">
                🔥 Limited Time Offer
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold">
                Up to 50% Off
                <br />
                Electronics
              </h1>
              <p className="text-xl opacity-90">
                Discover amazing deals on the latest smartphones, laptops, and gadgets.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Shop Now
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Button variant="outline" asChild>
            <Link href="/categories">
              View All
              <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`} className="group">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center space-y-2">
                  <Image
                    src={`https://picsum.photos/200/200?random=${category.id}`}
                    alt={category.name}
                    width={80}
                    height={80}
                    className="mx-auto rounded-lg"
                  />
                  <h3 className="font-medium text-sm group-hover:text-primary">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.productCount} items</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Button variant="outline" asChild>
            <Link href="/products">
              View All
              <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div key="shipping" className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">Free shipping on orders over ₫50</p>
            </div>

            <div key="payment" className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">100% secure payment processing</p>
            </div>

            <div key="support" className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Round-the-clock customer support</p>
            </div>

            <div key="returns" className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                <RotateCcw className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">30-day hassle-free returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Floating Button */}
      <FeedbackFloatingButton />
    </div>
  )
}
