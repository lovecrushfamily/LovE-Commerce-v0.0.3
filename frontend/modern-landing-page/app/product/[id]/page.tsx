"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product/product-card"
import type { Product } from "@/types"
import { RealProductAPI, ProductAPI } from "@/apis/products"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { ReviewList } from "@/components/product/review-list"

interface Review {
  review_id: number;
  customer_id: number;
  product_id: number;
  rating: number;
  comment: string;
  liked: boolean;
  images: string;
  shop_reply: string;
  created_at: string;
  customer_name?: string;
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const productId = Number(params.id)
        
        if (isNaN(productId)) {
          throw new Error('Invalid product ID')
        }

        console.log('Loading product with ID:', productId)

        // Fetch both real and mock product data
        const [realProduct, mockProduct, realRelated, mockRelated, productReviewsResponse] = await Promise.all([
          RealProductAPI.getProductById(productId),
          ProductAPI.getProductById(productId),
          RealProductAPI.getRelatedProducts(productId),
          ProductAPI.getRelatedProducts(productId),
          fetch(`http://localhost:3000/api/review/get-all`)
        ])

        // Handle reviews response
        let productReviews: Review[] = []
        if (productReviewsResponse.ok) {
          try {
            const allReviews = await productReviewsResponse.json()
            // Filter reviews for this product
            productReviews = allReviews.filter((review: Review) => review.product_id === productId)
            
            console.log('\n=== REVIEWS SUMMARY ===')
            console.log('Total Reviews:', productReviews.length)
            const averageRating = productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length
            console.log('Average Rating:', averageRating.toFixed(1))
            console.log('Reviews with Images:', productReviews.filter(review => review.images).length)
            console.log('Reviews with Shop Replies:', productReviews.filter(review => review.shop_reply).length)
            
            console.log('\n=== DETAILED REVIEWS ===')
            productReviews.forEach((review: Review, index: number) => {
              console.log(`\n📝 Review #${index + 1}`)
              console.log('----------------------------------------')
              console.log('ID:', review.review_id)
              console.log('Product ID:', review.product_id)
              console.log('Customer:', review.customer_name || `User ${review.customer_id}`)
              console.log('Customer ID:', review.customer_id)
              console.log('Rating:', '⭐'.repeat(review.rating) + '☆'.repeat(5 - review.rating))
              console.log('Comment:', review.comment)
              console.log('Liked:', review.liked ? '👍' : '👎')
              console.log('Created:', new Date(review.created_at).toLocaleString())
              if (review.images) {
                console.log('\n📸 Images:')
                review.images.split(',').forEach((image, i) => {
                  console.log(`  ${i + 1}. ${image}`)
                })
              }
              if (review.shop_reply) {
                console.log('\n💬 Shop Reply:', review.shop_reply)
              }
              console.log('----------------------------------------')
            })

            console.log('\n=== RAW REVIEWS DATA ===')
            console.log(JSON.stringify(productReviews, null, 2))
          } catch (e) {
            console.error('Error parsing reviews:', e)
          }
        } else {
          console.error('Failed to fetch reviews:', await productReviewsResponse.text())
        }

        // Use real product if available, otherwise use mock product
        const productData = realProduct || mockProduct
        if (!productData) {
          throw new Error('Product not found')
        }
        setProduct(productData)

        // Combine related products from both sources
        const combinedRelated = [...realRelated]
        mockRelated.forEach(mockProduct => {
          const exists = combinedRelated.some(realProduct => 
            realProduct.product_id === mockProduct.product_id
          )
          if (!exists) {
            combinedRelated.push(mockProduct)
          }
        })
        setRelatedProducts(combinedRelated)
        setReviews(productReviews)

        console.log('\n=== Product Data ===')
        console.log(productData)
        console.log('\n=== Related Products ===')
        console.log(combinedRelated)
      } catch (error) {
        console.error("Error loading product:", error)
        setError(error instanceof Error ? error.message : 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
    }
  }

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist(product.product_id)) {
        removeFromWishlist(product.product_id)
      } else {
        addToWishlist(product)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Product Details */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
            <Image
              src={Array.isArray(product.images) ? product.images[selectedImage] : product.images}
              alt={product.product_name}
              fill
              className="object-cover"
            />
            {Number(product.sale_off) > 0 && (
              <Badge variant="destructive" className="absolute top-4 left-4">
                -{product.sale_off}%
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {(Array.isArray(product.images) ? product.images : [product.images]).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative bg-muted rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.product_name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category_id}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{product.product_name}</h1>
            <p className="text-muted-foreground">Brand: {product.traits}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(Number(product.rating)) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="font-medium">{product.rating}</span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-red-600">₫{Number(product.price).toFixed(2)}</span>
              {Number(product.sale_off) > 0 && (
                <span className="text-xl text-muted-foreground line-through">
                  ₫{(Number(product.price) / (1 - Number(product.sale_off) / 100)).toFixed(2)}
                </span>
              )}
            </div>
            {Number(product.sale_off) > 0 && (
              <p className="text-green-600 font-medium">
                You save ₫{(Number(product.price) * Number(product.sale_off) / 100).toFixed(2)}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${Number(product.stock) > 0 ? "bg-green-500" : "bg-red-500"}`} />
            <span className={Number(product.stock) > 0 ? "text-green-600" : "text-red-600"}>
              {Number(product.stock) > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.min(Number(product.stock), quantity + 1))}
                disabled={quantity >= Number(product.stock)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={Number(product.stock) <= 0}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleWishlistToggle}
              className={isInWishlist(product.product_id) ? "text-red-500 hover:text-red-600 hover:bg-red-50" : ""}
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.product_id) ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center space-y-2">
              <Truck className="w-6 h-6 mx-auto text-primary" />
              <p className="text-sm">Free Shipping</p>
            </div>
            <div className="text-center space-y-2">
              <Shield className="w-6 h-6 mx-auto text-primary" />
              <p className="text-sm">Warranty</p>
            </div>
            <div className="text-center space-y-2">
              <RotateCcw className="w-6 h-6 mx-auto text-primary" />
              <p className="text-sm">Easy Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="traits">Traits</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Product Information</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">Product ID:</span> {product.product_id}</p>
                    <p><span className="font-medium">Status:</span> <Badge variant={product.status === 'pending' ? 'default' : 'destructive'}>{product.status}</Badge></p>
                    <p><span className="font-medium">Category ID:</span> {product.category_id}</p>
                    <p><span className="font-medium">Shop ID:</span> {product.shop_id}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Timestamps</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">Created:</span> {new Date(product.created_at).toLocaleString()}</p>
                    <p><span className="font-medium">Last Updated:</span> {new Date(product.updated_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="traits" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Product Traits</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.traits.split(',').map((trait, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>{trait.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <ReviewList reviews={reviews} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
