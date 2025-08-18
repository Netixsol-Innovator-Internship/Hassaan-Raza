"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type Cart, cartAPI } from "@/lib/api"
import { useAuth } from "./auth-context"

interface CartContextType {
  cart: Cart | null
  cartSummary: {
    totalItems: number
    totalAmount: number
    itemCount: number
  }
  addToCart: (productId: string, quantity: number) => Promise<void>
  updateCartItem: (itemId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
  loading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [cartSummary, setCartSummary] = useState({
    totalItems: 0,
    totalAmount: 0,
    itemCount: 0,
  })
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  const refreshCart = async () => {
    if (!isAuthenticated) {
      setCart(null)
      setCartSummary({ totalItems: 0, totalAmount: 0, itemCount: 0 })
      return
    }

    try {
      setLoading(true)
      const [cartResponse, summaryResponse] = await Promise.all([cartAPI.getCart(), cartAPI.getCartSummary()])

      if (cartResponse.success && cartResponse.data) {
        setCart(cartResponse.data)
      }

      if (summaryResponse.success && summaryResponse.data) {
        setCartSummary(summaryResponse.data)
      }
    } catch (error) {
      console.error("Error refreshing cart:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshCart()
  }, [isAuthenticated])

  const addToCart = async (productId: string, quantity: number) => {
    try {
      setLoading(true)
      const response = await cartAPI.addToCart(productId, quantity)
      if (response.success && response.data) {
        setCart(response.data)
        await refreshCart() // Refresh to get updated summary
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      setLoading(true)
      const response = await cartAPI.updateCartItem(itemId, quantity)
      if (response.success && response.data) {
        setCart(response.data)
        await refreshCart()
      }
    } catch (error) {
      console.error("Error updating cart item:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      setLoading(true)
      const response = await cartAPI.removeFromCart(itemId)
      if (response.success && response.data) {
        setCart(response.data)
        await refreshCart()
      }
    } catch (error) {
      console.error("Error removing from cart:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      setLoading(true)
      const response = await cartAPI.clearCart()
      if (response.success) {
        setCart(null)
        setCartSummary({ totalItems: 0, totalAmount: 0, itemCount: 0 })
      }
    } catch (error) {
      console.error("Error clearing cart:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const value = {
    cart,
    cartSummary,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart,
    loading,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
