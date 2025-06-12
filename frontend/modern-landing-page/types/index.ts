export interface Product {
  product_id: number
  product_name: string
  description: string
  traits: string
  stock: number
  sale_off: string
  price: string
  images: string
  status: string
  rating: number
  category_id: number
  shop_id: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  image: string
  productCount: number
  parentId?: number
}

export interface CartItem {
  id: number
  product: Product
  quantity: number
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  address: Address[]
}

export interface Address {
  id: number
  name: string
  phone: string
  address: string
  city: string
  district: string
  ward: string
  isDefault: boolean
}

export interface Order {
  id: number
  userId: number
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled"
  createdAt: string
  shippingAddress: Address
  paymentMethod: string
}

export interface Account {
  account_id: number
  user_name: string
  email: string
  online: string
  status: string
}
