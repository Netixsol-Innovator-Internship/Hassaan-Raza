"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function CheckoutPage() {
  const { cart, cartSummary, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(2) // Start at delivery step
  const [processing, setProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Netherlands",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const deliveryFee = 3.95
  const total = cartSummary.totalAmount + deliveryFee

  const handleDeliverySubmit = (e) => {
    e.preventDefault()
    const requiredFields = ["firstName", "lastName", "email", "address", "city", "postalCode"]
    const missingFields = requiredFields.filter((field) => !deliveryInfo[field])

    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields")
      return
    }

    setStep(3)
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    const requiredFields = ["cardNumber", "expiryDate", "cvv", "cardName"]
    const missingFields = requiredFields.filter((field) => !paymentInfo[field])

    if (missingFields.length > 0) {
      toast.error("Please fill in all payment details")
      return
    }

    try {
      setProcessing(true)
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart and show success
      await clearCart()
      setOrderComplete(true)
      toast.success("Order placed successfully!")
    } catch (error) {
      toast.error("Payment failed. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  if (!isAuthenticated) {
    navigate("/cart")
    return null
  }

  if (!cart || cart.items?.length === 0) {
    navigate("/cart")
    return null
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#FEFEFE]">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold font-prosto-one text-[#282828] mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">Thank you for your order. You will receive a confirmation email shortly.</p>
          <div className="space-y-4">
            <Link to="/collections">
              <Button className="bg-[#282828] hover:bg-[#C3B212] text-white">Continue Shopping</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

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
          <Link to="/cart" className="hover:text-[#C3B212]">
            MY BAG
          </Link>
          <span>/</span>
          <span className="text-[#282828] font-medium">CHECKOUT</span>
        </nav>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-8">
            <div className="flex items-center text-green-600">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-2">
                ✓
              </div>
              <span className="font-medium">MY BAG</span>
            </div>
            <div className="w-12 h-px bg-gray-300" />
            <div className={`flex items-center ${step >= 2 ? "text-[#282828]" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 ${step >= 2 ? "bg-[#282828]" : "bg-gray-300"} text-white rounded-full flex items-center justify-center text-sm font-medium mr-2`}
              >
                2
              </div>
              <span className={step >= 2 ? "font-medium" : ""}>DELIVERY</span>
            </div>
            <div className="w-12 h-px bg-gray-300" />
            <div className={`flex items-center ${step >= 3 ? "text-[#282828]" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 ${step >= 3 ? "bg-[#282828]" : "bg-gray-300"} text-white rounded-full flex items-center justify-center text-sm font-medium mr-2`}
              >
                3
              </div>
              <span className={step >= 3 ? "font-medium" : ""}>REVIEW & PAYMENT</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 2 && (
              <Card className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="w-6 h-6 text-[#C3B212]" />
                    <h2 className="text-xl font-bold font-prosto-one text-[#282828]">Delivery Information</h2>
                  </div>

                  <form onSubmit={handleDeliverySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#282828] mb-1">First Name *</label>
                        <Input
                          value={deliveryInfo.firstName}
                          onChange={(e) => setDeliveryInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#282828] mb-1">Last Name *</label>
                        <Input
                          value={deliveryInfo.lastName}
                          onChange={(e) => setDeliveryInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#282828] mb-1">Email Address *</label>
                      <Input
                        type="email"
                        value={deliveryInfo.email}
                        onChange={(e) => setDeliveryInfo((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#282828] mb-1">Phone Number</label>
                      <Input
                        type="tel"
                        value={deliveryInfo.phone}
                        onChange={(e) => setDeliveryInfo((prev) => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#282828] mb-1">Address *</label>
                      <Input
                        value={deliveryInfo.address}
                        onChange={(e) => setDeliveryInfo((prev) => ({ ...prev, address: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#282828] mb-1">City *</label>
                        <Input
                          value={deliveryInfo.city}
                          onChange={(e) => setDeliveryInfo((prev) => ({ ...prev, city: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#282828] mb-1">Postal Code *</label>
                        <Input
                          value={deliveryInfo.postalCode}
                          onChange={(e) => setDeliveryInfo((prev) => ({ ...prev, postalCode: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#282828] mb-1">Country</label>
                        <select
                          value={deliveryInfo.country}
                          onChange={(e) => setDeliveryInfo((prev) => ({ ...prev, country: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C3B212]"
                        >
                          <option value="Netherlands">Netherlands</option>
                          <option value="Belgium">Belgium</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between pt-6">
                      <Link to="/cart">
                        <Button variant="outline" className="bg-transparent">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to Cart
                        </Button>
                      </Link>
                      <Button type="submit" className="bg-[#282828] hover:bg-[#C3B212] text-white">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <div className="space-y-6">
                {/* Payment Method */}
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="w-6 h-6 text-[#C3B212]" />
                      <h2 className="text-xl font-bold font-prosto-one text-[#282828]">Payment Method</h2>
                    </div>

                    <div className="grid grid-cols-5 gap-3 mb-6">
                      <div className="bg-gray-100 p-3 rounded text-center text-xs font-medium">VISA</div>
                      <div className="bg-gray-100 p-3 rounded text-center text-xs font-medium">MASTERCARD</div>
                      <div className="bg-gray-100 p-3 rounded text-center text-xs font-medium">MAESTRO</div>
                      <div className="bg-gray-100 p-3 rounded text-center text-xs font-medium">iDEAL</div>
                      <div className="bg-gray-100 p-3 rounded text-center text-xs font-medium">PAYPAL</div>
                    </div>

                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#282828] mb-1">Card Number *</label>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cardNumber: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#282828] mb-1">Expiry Date *</label>
                          <Input
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => setPaymentInfo((prev) => ({ ...prev, expiryDate: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#282828] mb-1">CVV *</label>
                          <Input
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cvv: e.target.value }))}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#282828] mb-1">Cardholder Name *</label>
                        <Input
                          value={paymentInfo.cardName}
                          onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cardName: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="flex justify-between pt-6">
                        <Button type="button" variant="outline" onClick={() => setStep(2)} className="bg-transparent">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to Delivery
                        </Button>
                        <Button
                          type="submit"
                          disabled={processing}
                          className="bg-[#282828] hover:bg-[#C3B212] text-white"
                        >
                          {processing ? "Processing..." : "Complete Order"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Delivery & Return Info */}
                <Card className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-[#C3B212]" />
                      <h3 className="font-bold font-montserrat text-[#282828]">Delivery and return</h3>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <span className="text-[#C3B212] mt-1">▶</span>
                        <span>Order before 12:00 and we will ship the same day.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#C3B212] mt-1">▶</span>
                        <span>Orders made after Friday 12:00 are processed on Monday.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#C3B212] mt-1">▶</span>
                        <span>To return your articles, please contact us first.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#C3B212] mt-1">▶</span>
                        <span>Postal charges for return are not reimbursed.</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <CardContent className="p-0">
                <h2 className="font-bold font-prosto-one text-[#282828] mb-4">Order summary</h2>

                <div className="space-y-3 mb-6">
                  {cart.items.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span>
                        {item.product.name} x{item.quantity}
                      </span>
                      <span>€{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 border-t pt-3">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>€{cartSummary.totalAmount.toFixed(2)}</span>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
