"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, User, ShoppingBag, Menu, X, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"
import { AuthModal } from "@/components/AuthModal"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const { user, isAuthenticated, logout } = useAuth()
  const { cartSummary } = useCart()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      setIsMobileMenuOpen(false)
    }
  }

  const handleUserClick = () => {
    if (isAuthenticated) {
      console.log("Show profile menu")
    } else {
    navigate("/auth")   //
    }
  }

  //  Added cart navigation handler
  const handleCartClick = () => {
    navigate("/cart")
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="bg-[#FEFEFE] border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8  flex items-center justify-center">
                  <img src="/Logo.png" alt="Logo" className="w-6 h-6" />
                  <span className="text-white font-prosto text-sm"></span>
                </div>
                <span className="text-lg font-prosto text-[#282828]">Brand Name</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/collections"
                className="text-sm font-montserrat text-[#282828] hover:text-[#C3B212] transition-colors"
              >
                TEA COLLECTIONS
              </Link>
              <a href="#" className="text-sm font-montserrat text-[#282828] hover:text-[#C3B212] transition-colors">
                ACCESSORIES
              </a>
              <a href="#blog" className="text-sm font-montserrat text-[#282828] hover:text-[#C3B212] transition-colors">
                BLOG
              </a>
              <a
                href="#contact"
                className="text-sm font-montserrat text-[#282828] hover:text-[#C3B212] transition-colors"
              >
                CONTACT US
              </a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search teas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 pr-10"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full text-[#282828] hover:text-[#C3B212]"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>

              <Button
                variant="ghost"
                size="icon"
                className="text-[#282828] hover:text-[#C3B212]"
                onClick={handleUserClick}
              >
                <User className="h-5 w-5" />
              </Button>

              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#282828] hover:text-[#C3B212]"
                  onClick={logout}
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              )}

              {/*  Added cart navigation to shopping bag button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-[#282828] hover:text-[#C3B212] relative"
                onClick={handleCartClick}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartSummary.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C3B212] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartSummary.totalItems}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[#282828]"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-[#FEFEFE] shadow-xl slide-in">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="text-lg font-medium font-montserrat">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="SEARCH PRODUCTS"
                  className="pl-10 bg-[#FEFEFE] border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>

              {/* User Profile */}
              <div
                className="flex items-center space-x-3 py-3 border-b border-gray-100 cursor-pointer"
                onClick={handleUserClick}
              >
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm font-medium font-montserrat">USER PROFILE</div>
                  <div className="text-xs text-gray-500">
                    {isAuthenticated ? `Welcome, ${user?.name}` : "We know you as a guest user"}
                  </div>
                </div>
              </div>

              {/* Shopping Bag */}
              {/*  Added cart navigation to mobile shopping bag */}
              <div 
                className="flex items-center space-x-3 py-3 border-b border-gray-100 cursor-pointer"
                onClick={handleCartClick}
              >
                <ShoppingBag className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm font-medium font-montserrat">YOUR BAG</div>
                  <div className="text-xs text-gray-500">{cartSummary.totalItems} items have been added</div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-4 pt-4">
                {/*  Updated navigation links to use React Router */}
                <Link
                  to="/collections"
                  className="block text-base font-montserrat text-[#282828] hover:text-[#C3B212] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  TEA COLLECTIONS
                </Link>
                <a
                  href="#"
                  className="block text-base font-montserrat text-[#282828] hover:text-[#C3B212] transition-colors"
                >
                  ACCESSORIES
                </a>
                <a
                  href="#blog"
                  className="block text-base font-montserrat text-[#282828] hover:text-[#C3B212] transition-colors"
                >
                  BLOG
                </a>
                <a
                  href="#contact"
                  className="block text-base font-montserrat text-[#282828] hover:text-[#C3B212] transition-colors"
                >
                  CONTACT US
                </a>
                {isAuthenticated && (
                  <button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="block text-base font-montserrat text-[#282828] hover:text-[#C3B212] transition-colors w-full text-left"
                  >
                    LOGOUT
                  </button>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
