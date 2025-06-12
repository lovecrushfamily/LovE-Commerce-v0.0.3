"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingBag, CreditCard, MapPin, CheckCircle2, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import type { CartItem } from "@/types"
import { CartAPI } from "@/apis/cart"
import { OrderAPI } from "@/apis/orders"

export default function CartPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, updateQuantity, removeFromCart, clearCart } = useCart()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const hasLoadedCart = useRef(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const loadCart = async () => {
      if (hasLoadedCart.current) return
      
      try {
        setLoading(true)
        setError(null)
        
        // Load cart from backend
        const cartItems = CartAPI.getCart()
        if (cartItems && cartItems.length > 0) {
          // Update cart context with items from backend
          cartItems.forEach(item => {
            if (item.product && item.product.product_id) {
              updateQuantity(item.product.product_id, item.quantity)
            }
          })
        }
        hasLoadedCart.current = true
      } catch (error) {
        console.error("Error loading cart:", error)
        setError("Failed to load cart. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [user, router])

  const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
    try {
      if (user) {
        CartAPI.updateCartItem(item.product.product_id, newQuantity)
      }
      updateQuantity(item.product.product_id, newQuantity)
    } catch (error) {
      console.error("Error updating quantity:", error)
      setError("Failed to update quantity. Please try again.")
    }
  }

  const handleRemoveItem = async (item: CartItem) => {
    try {
      if (user) {
        CartAPI.removeFromCart(item.product.product_id)
      }
      removeFromCart(item.product.product_id)
    } catch (error) {
      console.error("Error removing item:", error)
      setError("Failed to remove item. Please try again.")
    }
  }

  const handleClearCart = async () => {
    try {
      if (user) {
        CartAPI.clearCart()
      }
      clearCart()
    } catch (error) {
      console.error("Error clearing cart:", error)
      setError("Failed to clear cart. Please try again.")
    }
  }

  const handleCheckout = async () => {
    if (!user) {
      setError("Please log in to proceed with checkout")
      return
    }

    setCheckoutLoading(true)
    try {
      // Create order
      const order = await OrderAPI.createOrder(
        user.account_id,
        items,
        {
          id: Date.now(),
          name: shippingInfo.name,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
          city: shippingInfo.city,
          district: shippingInfo.district,
          ward: shippingInfo.ward,
          isDefault: false,
        },
        paymentMethod,
      )

      // Store order details for e-bill
      setOrderDetails({
        orderId: order.id,
        date: new Date().toLocaleDateString(),
        items: items,
        shipping: shippingInfo,
        paymentMethod: paymentMethod,
        subtotal: subtotal,
        shippingCost: shipping,
        total: total
      })

      // Clear cart
      clearCart()
      
      // Close checkout dialog and show success dialog
      setShowCheckoutDialog(false)
      setShowSuccessDialog(true)
      setError(null)
    } catch (error) {
      console.error("Error placing order:", error)
      setError("Failed to place order. Please try again.")
    } finally {
      setCheckoutLoading(false)
    }
  }

  const subtotal = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + shipping

  const handleDownloadBill = () => {
    if (!orderDetails) return

    // Create HTML content for the bill
    const billHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order Bill #${orderDetails.orderId}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 40px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .bill-title {
              color: #2563eb;
              font-size: 24px;
              margin-bottom: 10px;
            }
            .section {
              margin-bottom: 20px;
              border-bottom: 1px solid #eee;
              padding-bottom: 20px;
            }
            .section-title {
              color: #1e40af;
              font-size: 18px;
              margin-bottom: 10px;
            }
            .grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            .item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            .total {
              font-weight: bold;
              font-size: 18px;
              margin-top: 20px;
              border-top: 2px solid #eee;
              padding-top: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="bill-title">Order Bill</h1>
            <p>Order #${orderDetails.orderId}</p>
            <p>Date: ${orderDetails.date}</p>
          </div>

          <div class="section">
            <h2 class="section-title">Shipping Information</h2>
            <div class="grid">
              <div>
                <p><strong>Name:</strong> ${orderDetails.shipping.name}</p>
                <p><strong>Phone:</strong> ${orderDetails.shipping.phone}</p>
                <p><strong>Email:</strong> ${orderDetails.shipping.email}</p>
              </div>
              <div>
                <p><strong>Address:</strong> ${orderDetails.shipping.address}</p>
                <p><strong>City:</strong> ${orderDetails.shipping.city}</p>
                <p><strong>District:</strong> ${orderDetails.shipping.district}</p>
                <p><strong>Ward:</strong> ${orderDetails.shipping.ward}</p>
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Order Items</h2>
            ${orderDetails.items.map((item: CartItem) => `
              <div class="item">
                <div>
                  <p><strong>${item.product.product_name}</strong></p>
                  <p>Quantity: ${item.quantity}</p>
                </div>
                <p>₫${(Number(item.product.price) * item.quantity).toFixed(2)}</p>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <h2 class="section-title">Order Summary</h2>
            <div class="item">
              <span>Subtotal</span>
              <span>₫${orderDetails.subtotal.toFixed(2)}</span>
            </div>
            <div class="item">
              <span>Shipping</span>
              <span>₫${orderDetails.shippingCost.toFixed(2)}</span>
            </div>
            <div class="item total">
              <span>Total</span>
              <span>₫${orderDetails.total.toFixed(2)}</span>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for your purchase!</p>
            <p>Payment Method: ${orderDetails.paymentMethod}</p>
          </div>
        </body>
      </html>
    `

    // Create a blob from the HTML content
    const blob = new Blob([billHTML], { type: 'text/html' })
    
    // Create a download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `order-bill-${orderDetails.orderId}.html`
    
    // Trigger the download
    document.body.appendChild(link)
    link.click()
    
    // Clean up
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {error && (
        <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">Add some products to your cart to see them here.</p>
                <Button asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearCart}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.product.images || "/placeholder.svg"}
                        alt={item.product.product_name}
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />

                      <div className="flex-1 space-y-2">
                        <Link href={`/product/${item.product.product_id}`} className="font-medium hover:text-primary">
                          {item.product.product_name}
                        </Link>
                        <p className="text-sm text-muted-foreground">Category: {item.product.category_id}</p>
                        <p className="font-bold text-lg">₫{Number(item.product.price).toFixed(2)}</p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="px-4 py-2 min-w-[3rem] text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            disabled={item.quantity >= Number(item.product.stock)}
                          >
                            +
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₫{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₫{shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₫{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full" 
                size="lg" 
                disabled={items.length === 0}
                onClick={() => setShowCheckoutDialog(true)}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Please provide your shipping information and select a payment method.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Shipping Information */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Shipping Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  placeholder="123 Main Street, Apt 4B"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    placeholder="New York"
                  />
                </div>
                <div>
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={shippingInfo.district}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, district: e.target.value })}
                    placeholder="Manhattan"
                  />
                </div>
                <div>
                  <Label htmlFor="ward">Ward</Label>
                  <Input
                    id="ward"
                    value={shippingInfo.ward}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, ward: e.target.value })}
                    placeholder="Upper West Side"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Payment Method
              </h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card">Credit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
                  <Label htmlFor="cash-on-delivery">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Order Summary */}
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₫{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₫{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₫{total.toFixed(2)}</span>
              </div>
            </div>

            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleCheckout}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog with E-Bill */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <DialogTitle className="text-center text-2xl">Order Placed Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              Thank you for your purchase. Here's your order details.
            </DialogDescription>
          </DialogHeader>

          {orderDetails && (
            <div className="space-y-6">
              {/* Order Header */}
              <div className="flex justify-between items-start border-b pb-4">
                <div>
                  <h3 className="font-bold">Order #{orderDetails.orderId}</h3>
                  <p className="text-sm text-muted-foreground">Date: {orderDetails.date}</p>
                </div>
                <div className="text-right">
                  <h3 className="font-bold">Order Details</h3>
                  <p className="text-sm text-muted-foreground">Payment Method: {orderDetails.paymentMethod}</p>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="border-b pb-4">
                <h3 className="font-bold mb-2">Shipping Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium">Name:</span> {orderDetails.shipping.name}</p>
                    <p><span className="font-medium">Phone:</span> {orderDetails.shipping.phone}</p>
                    <p><span className="font-medium">Email:</span> {orderDetails.shipping.email}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Address:</span> {orderDetails.shipping.address}</p>
                    <p><span className="font-medium">City:</span> {orderDetails.shipping.city}</p>
                    <p><span className="font-medium">District:</span> {orderDetails.shipping.district}</p>
                    <p><span className="font-medium">Ward:</span> {orderDetails.shipping.ward}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-b pb-4">
                <h3 className="font-bold mb-4">Order Items</h3>
                <div className="space-y-4">
                  {orderDetails.items.map((item: CartItem) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={item.product.images || "/placeholder.svg"}
                          alt={item.product.product_name}
                          width={60}
                          height={60}
                          className="rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{item.product.product_name}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">
                        ₫{(Number(item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₫{orderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₫{orderDetails.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>₫{orderDetails.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={() => {
                    setShowSuccessDialog(false)
                    router.push("/")
                  }}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
