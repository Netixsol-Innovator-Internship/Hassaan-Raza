import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import { Toaster } from "sonner"
import HomePage from "./pages/HomePage"
import CollectionsPage from "./pages/CollectionsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import AuthPage from "@/pages/AuthPage"

import "./App.css"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#FEFEFE]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:category" element={<CollectionsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
