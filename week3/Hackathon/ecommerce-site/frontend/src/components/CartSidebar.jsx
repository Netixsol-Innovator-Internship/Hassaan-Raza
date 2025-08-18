
// import { useState } from "react"
// import { X, Minus, Plus, ShoppingBag } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useCart } from "@/contexts/CartContext"
// import { Link } from "react-router-dom"

// export function CartSidebar({ isOpen, onClose }) {
//   const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart()
//   const [step, setStep] = useState(1) // 1: My Bag, 2: Delivery, 3: Review & Payment

//   if (!isOpen) return null

//   const subtotal = getCartTotal()
//   const delivery = 3.95
//   const total = subtotal + delivery

//   const StepIndicator = ({ currentStep }) => (
//     <div className="flex items-center justify-center mb-6">
//       <div className="flex items-center space-x-4">
//         <div className={`flex items-center ${currentStep >= 1 ? "text-[#282828]" : "text-gray-400"}`}>
//           <span className="text-sm font-medium">1. MY BAG</span>
//         </div>
//         <div className="w-8 h-px bg-gray-300" />
//         <div className={`flex items-center ${currentStep >= 2 ? "text-[#282828]" : "text-gray-400"}`}>
//           <span className="text-sm font-medium">2. DELIVERY</span>
//         </div>
//         <div className="w-8 h-px bg-gray-300" />
//         <div className={`flex items-center ${currentStep >= 3 ? "text-[#282828]" : "text-gray-400"}`}>
//           <span className="text-sm font-medium">3. REVIEW & PAYMENT</span>
//         </div>
//       </div>
//     </div>
//   )

//   return (
//     <div className="fixed inset-0 z-50">
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-black/50" onClick={onClose} />

//       {/* Sidebar */}
//       <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b">
//             <h2 className="font-bold font-prosto-one text-[#282828]">My Bag</h2>
//             <button onClick={onClose} className="p-1">
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Step Indicator */}
//           <div className="p-4 border-b">
//             <StepIndicator currentStep={step} />
//           </div>

//           {/* Content */}
//           <div className="flex-1 overflow-y-auto">
//             {step === 1 && (
//               <div className="p-4">
//                 {cart.length === 0 ? (
//                   <div className="text-center py-8">
//                     <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-500">Your bag is empty</p>
//                     <Link to="/collections">
//                       <Button variant="outline" className="mt-4 bg-transparent" onClick={onClose}>
//                         Continue Shopping
//                       </Button>
//                     </Link>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {cart.map((item) => (
//                       <div key={`${item.product._id}-${item.variant}`} className="flex gap-3 pb-4 border-b">
//                         <img
//                           src={item.product.image || `/placeholder.svg?height=80&width=80&query=${item.product.name}`}
//                           alt={item.product.name}
//                           className="w-16 h-16 object-cover rounded"
//                         />
//                         <div className="flex-1">
//                           <h3 className="font-medium font-montserrat text-sm">{item.product.name}</h3>
//                           <p className="text-xs text-gray-600">{item.variant}</p>
//                           <div className="flex items-center justify-between mt-2">
//                             <div className="flex items-center border border-gray-300 rounded">
//                               <button
//                                 onClick={() => updateQuantity(item.product._id, item.variant, item.quantity - 1)}
//                                 className="p-1 hover:bg-gray-100"
//                               >
//                                 <Minus className="w-3 h-3" />
//                               </button>
//                               <span className="px-2 text-sm">{item.quantity}</span>
//                               <button
//                                 onClick={() => updateQuantity(item.product._id, item.variant, item.quantity + 1)}
//                                 className="p-1 hover:bg-gray-100"
//                               >
//                                 <Plus className="w-3 h-3" />
//                               </button>
//                             </div>
//                             <div className="text-right">
//                               <div className="font-medium text-sm">
//                                 €{(item.product.price * item.quantity).toFixed(2)}
//                               </div>
//                               <button
//                                 onClick={() => removeFromCart(item.product._id, item.variant)}
//                                 className="text-xs text-[#C3B212] hover:underline"
//                               >
//                                 REMOVE
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {step === 2 && (
//               <div className="p-4">
//                 <h3 className="font-medium font-montserrat mb-4">Delivery Options</h3>
//                 <div className="space-y-3">
//                   <div className="border rounded-lg p-3">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <div className="font-medium text-sm">Standard Delivery</div>
//                         <div className="text-xs text-gray-600">2-3 business days</div>
//                       </div>
//                       <div className="text-sm font-medium">€3.95</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {step === 3 && (
//               <div className="p-4">
//                 <h3 className="font-medium font-montserrat mb-4">Payment type</h3>
//                 <div className="grid grid-cols-5 gap-2 mb-6">
//                   <div className="bg-gray-100 p-2 rounded text-center text-xs">VISA</div>
//                   <div className="bg-gray-100 p-2 rounded text-center text-xs">MC</div>
//                   <div className="bg-gray-100 p-2 rounded text-center text-xs">MAESTRO</div>
//                   <div className="bg-gray-100 p-2 rounded text-center text-xs">iDEAL</div>
//                   <div className="bg-gray-100 p-2 rounded text-center text-xs">PAYPAL</div>
//                 </div>

//                 <h3 className="font-medium font-montserrat mb-4">Delivery and return</h3>
//                 <div className="space-y-2 text-sm text-gray-600">
//                   <div className="flex items-start gap-2">
//                     <span>▶</span>
//                     <span>Order before 12:00 and we will ship the same day.</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <span>▶</span>
//                     <span>Orders made after Friday 12:00 are processed on Monday.</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <span>▶</span>
//                     <span>To return your articles, please contact us first.</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <span>▶</span>
//                     <span>Postal charges for return are not reimbursed.</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           {cart.length > 0 && (
//             <div className="p-4 border-t bg-white">
//               {step === 1 && (
//                 <>
//                   <div className="space-y-2 mb-4">
//                     <div className="flex justify-between text-sm">
//                       <span>Subtotal</span>
//                       <span>€{subtotal.toFixed(2)}</span>
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
//                       BACK TO SHOPPING
//                     </Button>
//                     <Button onClick={() => setStep(2)} className="flex-1 bg-[#282828] hover:bg-[#C3B212] text-white">
//                       CONTINUE
//                     </Button>
//                   </div>
//                 </>
//               )}

//               {step === 2 && (
//                 <>
//                   <div className="space-y-2 mb-4">
//                     <div className="flex justify-between text-sm">
//                       <span>Subtotal</span>
//                       <span>€{subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span>Delivery</span>
//                       <span>€{delivery.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between font-bold">
//                       <span>Total</span>
//                       <span>€{total.toFixed(2)}</span>
//                     </div>
//                     <p className="text-xs text-gray-600">Estimated shipping time: 2 days</p>
//                   </div>
//                   <Button onClick={() => setStep(3)} className="w-full bg-[#282828] hover:bg-[#C3B212] text-white">
//                     CHECK OUT
//                   </Button>
//                 </>
//               )}

//               {step === 3 && (
//                 <Button className="w-full bg-[#282828] hover:bg-[#C3B212] text-white">COMPLETE ORDER</Button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }





import { useState } from "react"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { Link } from "react-router-dom"
import { toast } from "sonner"

export function CartSidebar({ isOpen, onClose }) {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal,
    loading 
  } = useCart()
  const [step, setStep] = useState(1)

  if (!isOpen) return null

  const subtotal = getCartTotal()
  const delivery = 3.95
  const total = subtotal + delivery

  const handleQuantityChange = async (productId, variant, newQuantity) => {
    if (newQuantity < 1) return
    const success = await updateQuantity(productId, variant, newQuantity)
    if (!success) {
      toast.error("Failed to update quantity")
    }
  }

  const handleRemoveItem = async (productId, variant) => {
    const success = await removeFromCart(productId, variant)
    if (!success) {
      toast.error("Failed to remove item")
    }
  }

  const StepIndicator = ({ currentStep }) => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            {stepNum > 1 && <div className="w-8 h-px bg-gray-300 mx-2" />}
            <span className={`text-sm font-medium ${
              currentStep >= stepNum ? "text-[#282828]" : "text-gray-400"
            }`}>
              {stepNum === 1 && "1. MY BAG"}
              {stepNum === 2 && "2. DELIVERY"}
              {stepNum === 3 && "3. REVIEW & PAYMENT"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-bold font-prosto-one text-[#282828]">
              {step === 1 ? "My Bag" : step === 2 ? "Delivery" : "Review & Payment"}
            </h2>
            <button 
              onClick={onClose} 
              className="p-1"
              disabled={loading}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 border-b">
            <StepIndicator currentStep={step} />
          </div>

          <div className="flex-1 overflow-y-auto">
            {step === 1 && (
              <div className="p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Your bag is empty</p>
                    <Link to="/collections">
                      <Button 
                        variant="outline" 
                        className="mt-4 bg-transparent" 
                        onClick={onClose}
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div 
                        key={`${item.product._id}-${item.variant}`} 
                        className="flex gap-3 pb-4 border-b"
                      >
                        <img
                          src={item.product.image || `/placeholder.svg?height=80&width=80&query=${item.product.name}`}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium font-montserrat text-sm">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-gray-600">{item.variant}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-gray-300 rounded">
                              <button
                                onClick={() => handleQuantityChange(
                                  item.product._id, 
                                  item.variant, 
                                  item.quantity - 1
                                )}
                                disabled={loading || item.quantity <= 1}
                                className="p-1 hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-sm">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(
                                  item.product._id, 
                                  item.variant, 
                                  item.quantity + 1
                                )}
                                disabled={loading}
                                className="p-1 hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-sm">
                                €{(item.product.price * item.quantity).toFixed(2)}
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item.product._id, item.variant)}
                                disabled={loading}
                                className="text-xs text-[#C3B212] hover:underline disabled:opacity-50"
                              >
                                REMOVE
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="p-4">
                <h3 className="font-medium font-montserrat mb-4">Delivery Options</h3>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">Standard Delivery</div>
                        <div className="text-xs text-gray-600">2-3 business days</div>
                      </div>
                      <div className="text-sm font-medium">€3.95</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="p-4">
                <h3 className="font-medium font-montserrat mb-4">Payment type</h3>
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {['VISA', 'MC', 'MAESTRO', 'iDEAL', 'PAYPAL'].map((type) => (
                    <div key={type} className="bg-gray-100 p-2 rounded text-center text-xs">
                      {type}
                    </div>
                  ))}
                </div>

                <h3 className="font-medium font-montserrat mb-4">Delivery and return</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  {[
                    "Order before 12:00 and we will ship the same day.",
                    "Orders made after Friday 12:00 are processed on Monday.",
                    "To return your articles, please contact us first.",
                    "Postal charges for return are not reimbursed."
                  ].map((text, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span>▶</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 border-t bg-white">
              {step === 1 && (
                <>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 bg-transparent" 
                      onClick={onClose}
                      disabled={loading}
                    >
                      BACK TO SHOPPING
                    </Button>
                    <Button 
                      onClick={() => setStep(2)} 
                      className="flex-1 bg-[#282828] hover:bg-[#C3B212] text-white"
                      disabled={loading}
                    >
                      CONTINUE
                    </Button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery</span>
                      <span>€{delivery.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>€{total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-600">Estimated shipping time: 2 days</p>
                  </div>
                  <Button 
                    onClick={() => setStep(3)} 
                    className="w-full bg-[#282828] hover:bg-[#C3B212] text-white"
                    disabled={loading}
                  >
                    CHECK OUT
                  </Button>
                </>
              )}

              {step === 3 && (
                <Button 
                  className="w-full bg-[#282828] hover:bg-[#C3B212] text-white"
                  disabled={loading}
                >
                  COMPLETE ORDER
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}