"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"

export function ProductCard({ product }) {
  const [loading, setLoading] = useState(false)
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart")
      return
    }

    try {
      setLoading(true)
      await addToCart(product._id, 1)
      toast.success(`${product.name} added to cart!`)
    } catch (error) {
      toast.error("Failed to add item to cart")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.image || `/placeholder.svg?height=300&width=300&query=${product.name}`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.stock <= 5 && product.stock > 0 && (
            <Badge className="absolute top-2 left-2 bg-orange-500 text-white">Low Stock</Badge>
          )}
          {product.stock === 0 && <Badge className="absolute top-2 left-2 bg-red-500 text-white">Out of Stock</Badge>}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-[#282828] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-montserrat font-medium text-[#282828] line-clamp-2">{product.name}</h3>
            <div className="text-right">
              <div className="font-montserrat font-semibold text-[#282828]">${product.price}</div>
              <div className="text-xs font-montserrat text-gray-500">{product.weight}</div>
            </div>
          </div>

          <p className="text-sm font-montserrat text-gray-600 line-clamp-2">{product.description}</p>

          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">
              {product.collection}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {product.origin}
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={loading || product.stock === 0}
          className="w-full bg-[#282828] text-white hover:bg-[#282828]/90 font-montserrat"
        >
          {loading ? (
            "Adding..."
          ) : product.stock === 0 ? (
            "Out of Stock"
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
