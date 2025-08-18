// // "use client"

// // import { createContext, useContext, useEffect, useState } from "react"
// // import { cartAPI } from "@/lib/api"
// // import { useAuth } from "./AuthContext"

// // const CartContext = createContext(undefined)

// // export function CartProvider({ children }) {
// //   const [cart, setCart] = useState(null)
// //   const [cartSummary, setCartSummary] = useState({
// //     totalItems: 0,
// //     totalAmount: 0,
// //     itemCount: 0,
// //   })
// //   const [loading, setLoading] = useState(false)
// //   const { isAuthenticated } = useAuth()

// //   const refreshCart = async () => {
// //     if (!isAuthenticated) {
// //       setCart(null)
// //       setCartSummary({ totalItems: 0, totalAmount: 0, itemCount: 0 })
// //       return
// //     }

// //     try {
// //       setLoading(true)
// //       const [cartResponse, summaryResponse] = await Promise.all([cartAPI.getCart(), cartAPI.getCartSummary()])

// //       if (cartResponse.success && cartResponse.data) {
// //         setCart(cartResponse.data)
// //       }

// //       if (summaryResponse.success && summaryResponse.data) {
// //         setCartSummary(summaryResponse.data)
// //       }
// //     } catch (error) {
// //       console.error("Error refreshing cart:", error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   useEffect(() => {
// //     refreshCart()
// //   }, [isAuthenticated])

// //   const addToCart = async (productId, quantity) => {
// //     try {
// //       setLoading(true)
// //       const response = await cartAPI.addToCart(productId, quantity)
// //       if (response.success && response.data) {
// //         setCart(response.data)
// //         await refreshCart() // Refresh to get updated summary
// //       }
// //     } catch (error) {
// //       console.error("Error adding to cart:", error)
// //       throw error
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const updateCartItem = async (itemId, quantity) => {
// //     try {
// //       setLoading(true)
// //       const response = await cartAPI.updateCartItem(itemId, quantity)
// //       if (response.success && response.data) {
// //         setCart(response.data)
// //         await refreshCart()
// //       }
// //     } catch (error) {
// //       console.error("Error updating cart item:", error)
// //       throw error
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const removeFromCart = async (itemId) => {
// //     try {
// //       setLoading(true)
// //       const response = await cartAPI.removeFromCart(itemId)
// //       if (response.success && response.data) {
// //         setCart(response.data)
// //         await refreshCart()
// //       }
// //     } catch (error) {
// //       console.error("Error removing from cart:", error)
// //       throw error
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const clearCart = async () => {
// //     try {
// //       setLoading(true)
// //       const response = await cartAPI.clearCart()
// //       if (response.success) {
// //         setCart(null)
// //         setCartSummary({ totalItems: 0, totalAmount: 0, itemCount: 0 })
// //       }
// //     } catch (error) {
// //       console.error("Error clearing cart:", error)
// //       throw error
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const value = {
// //     cart,
// //     cartSummary,
// //     addToCart,
// //     updateCartItem,
// //     removeFromCart,
// //     clearCart,
// //     refreshCart,
// //     loading,
// //   }

// //   return <CartContext.Provider value={value}>{children}</CartContext.Provider>
// // }

// // export function useCart() {
// //   const context = useContext(CartContext)
// //   if (context === undefined) {
// //     throw new Error("useCart must be used within a CartProvider")
// //   }
// //   return context
// // }


// "use client"

// import { createContext, useContext, useEffect, useState } from "react"
// import { cartAPI } from "@/lib/api"
// import { useAuth } from "./AuthContext"
// import { toast } from "sonner"

// const CartContext = createContext(undefined)

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([])
//   const [cartSummary, setCartSummary] = useState({
//     totalItems: 0,
//     totalAmount: 0,
//     itemCount: 0,
//   })
//   const [loading, setLoading] = useState(false)
//   const { isAuthenticated } = useAuth()

//   const refreshCart = async () => {
//     if (!isAuthenticated) {
//       setCart([])
//       setCartSummary({ totalItems: 0, totalAmount: 0, itemCount: 0 })
//       return
//     }

//     try {
//       setLoading(true)
//       const [cartResponse, summaryResponse] = await Promise.all([
//         cartAPI.getCart(), 
//         cartAPI.getCartSummary()
//       ])

//       setCart(cartResponse?.data || [])
//       setCartSummary(summaryResponse?.data || {
//         totalItems: 0,
//         totalAmount: 0,
//         itemCount: 0
//       })
//     } catch (error) {
//       console.error("Error refreshing cart:", error)
//       toast.error("Failed to load cart")
//       setCart([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getCartTotal = () => {
//     if (!Array.isArray(cart)) return 0
//     return cart.reduce((total, item) => {
//       const price = item?.product?.price || 0
//       const quantity = item?.quantity || 0
//       return total + (price * quantity)
//     }, 0)
//   }

//   const addToCart = async (productId, quantity, variant = '50g') => {
//     try {
//       setLoading(true)
//       const response = await cartAPI.addToCart(productId, quantity, { variant })
      
//       if (response?.success) {
//         setCart(response.data || [])
//         await refreshCart()
//         toast.success("Added to cart")
//         return true
//       }
//       toast.error(response?.message || "Failed to add to cart")
//       return false
//     } catch (error) {
//       console.error("Error adding to cart:", error)
//       toast.error("Failed to add to cart")
//       return false
//     } finally {
//       setLoading(false)
//     }
//   }

//   const updateQuantity = async (productId, variant, quantity) => {
//     try {
//       setLoading(true)
//       const item = cart.find(item => 
//         item.product._id === productId && item.variant === variant
//       )
      
//       if (!item) {
//         toast.error("Item not found in cart")
//         return false
//       }
      
//       const response = await cartAPI.updateCartItem(item._id, quantity)
      
//       if (response?.success) {
//         setCart(response.data || [])
//         await refreshCart()
//         return true
//       }
//       toast.error(response?.message || "Failed to update quantity")
//       return false
//     } catch (error) {
//       console.error("Error updating quantity:", error)
//       toast.error("Failed to update quantity")
//       return false
//     } finally {
//       setLoading(false)
//     }
//   }

//   const removeFromCart = async (productId, variant) => {
//     try {
//       setLoading(true)
//       const item = cart.find(item => 
//         item.product._id === productId && item.variant === variant
//       )
      
//       if (!item) {
//         toast.error("Item not found in cart")
//         return false
//       }
      
//       const response = await cartAPI.removeFromCart(item._id)
      
//       if (response?.success) {
//         setCart(response.data || [])
//         await refreshCart()
//         toast.success("Removed from cart")
//         return true
//       }
//       toast.error(response?.message || "Failed to remove item")
//       return false
//     } catch (error) {
//       console.error("Error removing from cart:", error)
//       toast.error("Failed to remove item")
//       return false
//     } finally {
//       setLoading(false)
//     }
//   }

//   const clearCart = async () => {
//     try {
//       setLoading(true)
//       const response = await cartAPI.clearCart()
      
//       if (response?.success) {
//         setCart([])
//         setCartSummary({ totalItems: 0, totalAmount: 0, itemCount: 0 })
//         toast.success("Cart cleared")
//         return true
//       }
//       toast.error(response?.message || "Failed to clear cart")
//       return false
//     } catch (error) {
//       console.error("Error clearing cart:", error)
//       toast.error("Failed to clear cart")
//       return false
//     } finally {
//       setLoading(false)
//     }
//   }

//   const value = {
//     cart,
//     cartSummary,
//     addToCart,
//     updateQuantity,
//     removeFromCart,
//     clearCart,
//     refreshCart,
//     getCartTotal,
//     loading,
//     cartCount: cart.reduce((count, item) => count + (item?.quantity || 0), 0)
//   }

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>
// }

// export function useCart() {
//   const context = useContext(CartContext)
//   if (context === undefined) {
//     throw new Error("useCart must be used within a CartProvider")
//   }
//   return context
// }



import { createContext, useContext, useEffect, useState } from "react"
import { cartAPI } from "@/lib/api"
import { useAuth } from "./AuthContext"
import { toast } from "sonner"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]) // Initialize as empty array
  const [cartSummary, setCartSummary] = useState({
    totalItems: 0,
    totalAmount: 0,
    itemCount: 0
  })
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  const refreshCart = async () => {
    if (!isAuthenticated) {
      setCart([])
      setCartSummary({ totalItems: 0, totalAmount: 0, itemCount: 0 })
      return
    }

    try {
      setLoading(true)
      const [cartResponse, summaryResponse] = await Promise.all([
        cartAPI.getCart(),
        cartAPI.getCartSummary()
      ])

      setCart(cartResponse?.data?.items || []) // Ensure we get items array
      setCartSummary(summaryResponse?.data || {
        totalItems: 0,
        totalAmount: 0,
        itemCount: 0
      })
    } catch (error) {
      console.error("Error refreshing cart:", error)
      toast.error("Failed to load cart")
      setCart([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshCart()
  }, [isAuthenticated])

  const addToCart = async (productId, quantity, variant = '50g') => {
    try {
      setLoading(true)
      const response = await cartAPI.addToCart(productId, quantity, { variant })
      
      if (response?.success) {
        await refreshCart()
        toast.success("Added to cart")
        return true
      }
      throw new Error(response?.message || "Failed to add to cart")
    } catch (error) {
      toast.error(error.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    try {
      setLoading(true)
      const response = await cartAPI.updateCartItem(itemId, quantity)
      
      if (response?.success) {
        await refreshCart()
        return true
      }
      throw new Error(response?.message || "Failed to update quantity")
    } catch (error) {
      toast.error(error.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      setLoading(true)
      const response = await cartAPI.removeFromCart(itemId)
      
      if (response?.success) {
        await refreshCart()
        toast.success("Removed from cart")
        return true
      }
      throw new Error(response?.message || "Failed to remove item")
    } catch (error) {
      toast.error(error.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      setLoading(true)
      const response = await cartAPI.clearCart()
      
      if (response?.success) {
        setCart([])
        setCartSummary({ totalItems: 0, totalAmount: 0, itemCount: 0 })
        toast.success("Cart cleared")
        return true
      }
      throw new Error(response?.message || "Failed to clear cart")
    } catch (error) {
      toast.error(error.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const value = {
    cart,
    cartSummary,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
    loading,
    cartCount: cart.reduce((count, item) => count + (item?.quantity || 0), 0),
    cartTotal: cart.reduce((total, item) => total + (item?.product?.price || 0) * (item?.quantity || 0), 0)
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}