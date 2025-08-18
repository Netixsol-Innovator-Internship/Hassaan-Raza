// "use client"

// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { Header } from "@/components/Header"
// import { Footer } from "@/components/Footer"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { useCart } from "@/contexts/CartContext"
// import { useAuth } from "@/contexts/AuthContext"
// import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
// import { toast } from "sonner"

// export default function CartPage() {
//   const { cart, cartSummary, updateCartItem, removeFromCart, loading } = useCart()
//   const { isAuthenticated } = useAuth()
//   const navigate = useNavigate()
//   const [updatingItems, setUpdatingItems] = useState({})

//   const handleUpdateQuantity = async (itemId, newQuantity) => {
//     if (newQuantity < 1) return

//     try {
//       setUpdatingItems((prev) => ({ ...prev, [itemId]: true }))
//       await updateCartItem(itemId, newQuantity)
//     } catch (error) {
//       toast.error("Failed to update quantity")
//     } finally {
//       setUpdatingItems((prev) => ({ ...prev, [itemId]: false }))
//     }
//   }

//   const handleRemoveItem = async (itemId) => {
//     try {
//       await removeFromCart(itemId)
//       toast.success("Item removed from cart")
//     } catch (error) {
//       toast.error("Failed to remove item")
//     }
//   }

//   const handleCheckout = () => {
//     if (!isAuthenticated) {
//       toast.error("Please sign in to checkout")
//       return
//     }
//     navigate("/checkout")
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-[#FEFEFE]">
//         <Header />
//         <div className="max-w-4xl mx-auto px-4 py-8">
//           <div className="text-center py-12">
//             <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h1 className="text-2xl font-bold font-prosto-one text-[#282828] mb-2">Sign in to view your cart</h1>
//             <p className="text-gray-600 mb-6">Please sign in to access your shopping cart</p>
//             <Link to="/">
//               <Button variant="outline" className="bg-transparent">
//                 Continue Shopping
//               </Button>
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     )
//   }

//   const deliveryFee = 3.95
//   const total = cartSummary.totalAmount + deliveryFee

//   return (
//     <div className="min-h-screen bg-[#FEFEFE]">
//       <Header />

//       <div className="max-w-6xl mx-auto px-4 py-8">
//         {/* Breadcrumb */}
//         <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
//           <Link to="/" className="hover:text-[#C3B212]">
//             HOME
//           </Link>
//           <span>/</span>
//           <span className="text-[#282828] font-medium">MY BAG</span>
//         </nav>

//         {/* Step Indicator */}
//         <div className="flex items-center justify-center mb-8">
//           <div className="flex items-center space-x-8">
//             <div className="flex items-center text-[#282828]">
//               <div className="w-8 h-8 bg-[#282828] text-white rounded-full flex items-center justify-center text-sm font-medium mr-2">
//                 1
//               </div>
//               <span className="font-medium">MY BAG</span>
//             </div>
//             <div className="w-12 h-px bg-gray-300" />
//             <div className="flex items-center text-gray-400">
//               <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-medium mr-2">
//                 2
//               </div>
//               <span>DELIVERY</span>
//             </div>
//             <div className="w-12 h-px bg-gray-300" />
//             <div className="flex items-center text-gray-400">
//               <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-medium mr-2">
//                 3
//               </div>
//               <span>REVIEW & PAYMENT</span>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-center py-12">
//             <div className="animate-spin w-8 h-8 border-2 border-[#C3B212] border-t-transparent rounded-full mx-auto mb-4" />
//             <p className="text-gray-600">Loading your cart...</p>
//           </div>
//         ) : !cart || cart.items?.length === 0 ? (
//           <div className="text-center py-12">
//             <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h1 className="text-2xl font-bold font-prosto-one text-[#282828] mb-2">Your bag is empty</h1>
//             <p className="text-gray-600 mb-6">Add some delicious teas to get started</p>
//             <Link to="/collections">
//               <Button variant="outline" className="bg-transparent">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Continue Shopping
//               </Button>
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Cart Items */}
//             <div className="lg:col-span-2 space-y-4">
//               {cart.items.map((item) => (
//                 <Card key={item._id} className="p-6">
//                   <CardContent className="p-0">
//                     <div className="flex gap-4">
//                       <img
//                         src={item.product.image || `/placeholder.svg?height=120&width=120&query=${item.product.name}`}
//                         alt={item.product.name}
//                         className="w-24 h-24 object-cover rounded-lg"
//                       />
//                       <div className="flex-1">
//                         <div className="flex justify-between items-start mb-2">
//                           <div>
//                             <h3 className="font-medium font-montserrat text-[#282828]">{item.product.name}</h3>
//                             <p className="text-sm text-gray-600">chai tea - 50 g</p>
//                           </div>
//                           <button
//                             onClick={() => handleRemoveItem(item._id)}
//                             className="text-[#C3B212] hover:text-red-500 transition-colors"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>

//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center border border-gray-300 rounded-lg">
//                             <button
//                               onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
//                               disabled={updatingItems[item._id] || item.quantity <= 1}
//                               className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
//                             >
//                               <Minus className="w-4 h-4" />
//                             </button>
//                             <span className="px-4 py-2 font-montserrat min-w-[3rem] text-center">
//                               {updatingItems[item._id] ? "..." : item.quantity}
//                             </span>
//                             <button
//                               onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
//                               disabled={updatingItems[item._id]}
//                               className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
//                             >
//                               <Plus className="w-4 h-4" />
//                             </button>
//                           </div>

//                           <div className="text-right">
//                             <div className="font-bold font-montserrat text-[#282828]">
//                               €{(item.product.price * item.quantity).toFixed(2)}
//                             </div>
//                             <button
//                               onClick={() => handleRemoveItem(item._id)}
//                               className="text-xs text-[#C3B212] hover:underline"
//                             >
//                               REMOVE
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}

//               <div className="flex justify-between items-center pt-4">
//                 <div className="text-sm text-gray-600">Subtotal: €{cartSummary.totalAmount.toFixed(2)}</div>
//                 <Link to="/collections">
//                   <Button variant="outline" className="bg-transparent">
//                     <ArrowLeft className="w-4 h-4 mr-2" />
//                     BACK TO SHOPPING
//                   </Button>
//                 </Link>
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="lg:col-span-1">
//               <Card className="p-6 sticky top-4">
//                 <CardContent className="p-0">
//                   <h2 className="font-bold font-prosto-one text-[#282828] mb-4">Order summary</h2>

//                   <div className="space-y-3 mb-6">
//                     <div className="flex justify-between text-sm">
//                       <span>Subtotal</span>
//                       <span>€{cartSummary.totalAmount.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span>Delivery</span>
//                       <span>€{deliveryFee.toFixed(2)}</span>
//                     </div>
//                     <div className="border-t pt-3 flex justify-between font-bold">
//                       <span>Total</span>
//                       <span className="text-xl">€{total.toFixed(2)}</span>
//                     </div>
//                     <p className="text-xs text-gray-600">Estimated shipping time: 2 days</p>
//                   </div>

//                   <Button
//                     onClick={handleCheckout}
//                     className="w-full bg-[#282828] hover:bg-[#C3B212] text-white font-montserrat"
//                   >
//                     CHECK OUT
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   )
// }



"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

export default function CartPage() {
  const { 
    cart, 
    cartSummary, 
    updateQuantity, 
    removeFromCart, 
    loading,
    cartTotal
  } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [updatingItems, setUpdatingItems] = useState({})

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return

    try {
      setUpdatingItems(prev => ({ ...prev, [itemId]: true }))
      const success = await updateQuantity(itemId, newQuantity)
      if (!success) {
        toast.error("Failed to update quantity")
      }
    } catch (error) {
      toast.error("Failed to update quantity")
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }))
    }
  }

  const handleRemoveItem = async (itemId) => {
    try {
      const success = await removeFromCart(itemId)
      if (!success) {
        toast.error("Failed to remove item")
      }
    } catch (error) {
      toast.error("Failed to remove item")
    }
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to checkout")
      return
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty")
      return
    }
    navigate("/checkout")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FEFEFE]">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold font-prosto-one text-[#282828] mb-2">Sign in to view your cart</h1>
            <p className="text-gray-600 mb-6">Please sign in to access your shopping cart</p>
            <Link to="/">
              <Button variant="outline" className="bg-transparent">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const deliveryFee = 3.95
  const total = cartTotal + deliveryFee

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-[#C3B212]">
            HOME
          </Link>
          <span>/</span>
          <span className="text-[#282828] font-medium">MY BAG</span>
        </nav>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-8">
            <div className="flex items-center text-[#282828]">
              <div className="w-8 h-8 bg-[#282828] text-white rounded-full flex items-center justify-center text-sm font-medium mr-2">
                1
              </div>
              <span className="font-medium">MY BAG</span>
            </div>
            <div className="w-12 h-px bg-gray-300" />
            <div className="flex items-center text-gray-400">
              <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-medium mr-2">
                2
              </div>
              <span>DELIVERY</span>
            </div>
            <div className="w-12 h-px bg-gray-300" />
            <div className="flex items-center text-gray-400">
              <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-medium mr-2">
                3
              </div>
              <span>REVIEW & PAYMENT</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-[#C3B212] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Loading your cart...</p>
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold font-prosto-one text-[#282828] mb-2">Your bag is empty</h1>
            <p className="text-gray-600 mb-6">Add some delicious teas to get started</p>
            <Link to="/collections">
              <Button variant="outline" className="bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item._id} className="p-6">
                  <CardContent className="p-0">
                    <div className="flex gap-4">
                      <img
                        src={item.product?.image || `/placeholder.svg?height=120&width=120&query=${item.product?.name}`}
                        alt={item.product?.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium font-montserrat text-[#282828]">
                              {item.product?.name || "Unknown Product"}
                            </h3>
                            <p className="text-sm text-gray-600">{item.variant || "50 g"}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-[#C3B212] hover:text-red-500 transition-colors"
                            disabled={loading || updatingItems[item._id]}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                              disabled={updatingItems[item._id] || item.quantity <= 1}
                              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-montserrat min-w-[3rem] text-center">
                              {updatingItems[item._id] ? "..." : item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                              disabled={updatingItems[item._id]}
                              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="font-bold font-montserrat text-[#282828]">
                              €{((item.product?.price || 0) * item.quantity).toFixed(2)}
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item._id)}
                              className="text-xs text-[#C3B212] hover:underline"
                              disabled={loading || updatingItems[item._id]}
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-between items-center pt-4">
                <div className="text-sm text-gray-600">Subtotal: €{cartTotal.toFixed(2)}</div>
                <Link to="/collections">
                  <Button variant="outline" className="bg-transparent">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    BACK TO SHOPPING
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <CardContent className="p-0">
                  <h2 className="font-bold font-prosto-one text-[#282828] mb-4">Order summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>€{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery</span>
                      <span>€{deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-xl">€{total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-600">Estimated shipping time: 2 days</p>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-[#282828] hover:bg-[#C3B212] text-white font-montserrat"
                    disabled={loading || cart.length === 0}
                  >
                    CHECK OUT
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}