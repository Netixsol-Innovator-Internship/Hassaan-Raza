import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import { Toaster } from "sonner"
import HomePage from "./pages/HomePage"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#FEFEFE]">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
