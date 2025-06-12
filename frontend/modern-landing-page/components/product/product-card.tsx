import Image from "next/image"
import Link from "next/link"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const price = Number(product.price)
  const saleOff = Number(product.sale_off)
  const discountedPrice = price * (1 - saleOff / 100)

  return (
    <Card className="group overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/product/${product.product_id}`} className="block relative aspect-square">
          <Image
            src={product.images || "/placeholder.svg"}
            alt={product.product_name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {saleOff > 0 && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              {saleOff}% OFF
            </Badge>
          )}
        </Link>

        <div className="p-4 space-y-2">
          <Link href={`/product/${product.product_id}`}>
            <h3 className="font-medium text-sm line-clamp-2 hover:text-primary">{product.product_name}</h3>
          </Link>

          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.rating})</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg text-red-600">₫{discountedPrice.toFixed(2)}</span>
            {saleOff > 0 && (
              <span className="text-sm text-muted-foreground line-through">₫{price.toFixed(2)}</span>
            )}
          </div>

          <Button 
            className="w-full" 
            size="sm"
            onClick={() => addToCart(product)}
            disabled={Number(product.stock) <= 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {Number(product.stock) <= 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
