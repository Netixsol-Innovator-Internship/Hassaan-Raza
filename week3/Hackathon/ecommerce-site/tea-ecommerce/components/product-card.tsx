"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import type { Product } from "@/lib/api"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // TODO: Show login modal or redirect to login
      alert("Please login to add items to cart")
      return
    }

    try {
      setLoading(true)
      await addToCart(product._id, quantity)
      // TODO: Show success toast
      console.log("Added to cart successfully")
    } catch (error) {
      console.error("Error adding to cart:", error)
      // TODO: Show error toast
      alert("Failed to add to cart")
    } finally {
      setLoading(false)
    }
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square relative">
        <img
          src={product.image || `/placeholder.svg?height=300&width=300&query=${product.name}`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-title-medium font-medium text-primary line-clamp-2">{product.name}</h3>
          <p className="text-body-small text-muted-foreground mt-1">
            {product.origin} • {product.weight}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-title-large font-semibold text-primary">${product.price.toFixed(2)}</div>
            <div className="flex gap-1">
              <Badge variant="secondary" className="text-xs">
                {product.quality}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {product.caffeine}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            {product.stock > 0 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            )}

            <Button onClick={handleAddToCart} disabled={product.stock === 0 || loading} className="w-full" size="sm">
              {loading ? (
                "Adding..."
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>

        <p className="text-body-small text-muted-foreground line-clamp-2">{product.description}</p>
      </div>
    </div>
  )
}
