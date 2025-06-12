"use client"

import { useState, useEffect } from "react"
import { Search, Loader2 } from "lucide-react"
import { ProductCard } from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"
import { RealProductAPI, ProductAPI } from "@/apis/products"
import { AuthAPI } from "@/apis/auth"
import { useSearchParams } from "next/navigation"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [allProducts, setAllProducts] = useState<Product[]>([])

  // Load all products initially
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Get all accounts first
        await AuthAPI.getAllAccounts()

        // Fetch both real and mock products
        const [realProducts, mockProducts] = await Promise.all([
          RealProductAPI.getAllProducts(),
          ProductAPI.getAllProducts()
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
        setAllProducts(combinedProducts)
        setProducts(combinedProducts)
      } catch (error) {
        console.error("Error loading products:", error)
        setError("Failed to load products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  // Filter products based on search query from URL
  useEffect(() => {
    const searchQuery = searchParams.get('q')
    if (!searchQuery?.trim()) {
      setProducts(allProducts)
      return
    }

    const searchTerm = searchQuery.toLowerCase().trim()
    const searchWords = searchTerm.split(/\s+/)

    const filteredProducts = allProducts.filter(product => {
      const productName = product.product_name.toLowerCase()
      
      // Check if any search word is found in the product name
      return searchWords.some(word => {
        // If the word is at least 3 characters, do a more flexible match
        if (word.length >= 3) {
          return productName.includes(word) || 
                 // Check for similar words (e.g., "phone" matches "phones")
                 productName.split(/\s+/).some(part => 
                   part.includes(word) || word.includes(part)
                 )
        }
        // For shorter words, require exact match
        return productName.includes(word)
      })
    })

    // Sort results by relevance (exact matches first, then partial matches)
    filteredProducts.sort((a, b) => {
      const aName = a.product_name.toLowerCase()
      const bName = b.product_name.toLowerCase()
      
      // Exact match gets highest priority
      if (aName === searchTerm && bName !== searchTerm) return -1
      if (bName === searchTerm && aName !== searchTerm) return 1
      
      // Starts with search term gets second priority
      if (aName.startsWith(searchTerm) && !bName.startsWith(searchTerm)) return -1
      if (bName.startsWith(searchTerm) && !aName.startsWith(searchTerm)) return 1
      
      // Contains search term gets third priority
      if (aName.includes(searchTerm) && !bName.includes(searchTerm)) return -1
      if (bName.includes(searchTerm) && !aName.includes(searchTerm)) return 1
      
      return 0
    })

    setProducts(filteredProducts)
  }, [searchParams, allProducts])

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {searchParams.get('q') ? "Search Results" : "Available Products"}
            </h1>
            <p className="text-muted-foreground">
              {searchParams.get('q')
                ? `Found ${products.length} product${products.length === 1 ? "" : "s"} matching "${searchParams.get('q')}"`
                : `Showing all ${products.length} products`}
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-muted-foreground mb-4">
                {searchParams.get('q')
                  ? `No products match "${searchParams.get('q')}"`
                  : "No products available at the moment"}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
