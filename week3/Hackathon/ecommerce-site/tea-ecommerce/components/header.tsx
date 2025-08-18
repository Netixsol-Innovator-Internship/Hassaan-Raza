"use client"

import type React from "react"

import { useState } from "react"
import { Search, User, ShoppingBag, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { AuthModal } from "@/components/auth-modal"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const { user, isAuthenticated, logout } = useAuth()
  const { cartSummary } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // TODO: Navigate to search results page
      console.log("Searching for:", searchQuery)
    }
  }

  const handleUserClick = () => {
    if (isAuthenticated) {
      // TODO: Navigate to profile page or show profile menu
      console.log("Show profile menu")
    } else {
      setIsAuthModalOpen(true)
    }
  }

  return (
    <>
      <header className="bg-background border-b border-outline/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                  <span className="text-primary-foreground font-display text-sm">🍃</span>
                </div>
                <span className="text-headline-small font-display text-primary">Brand Name</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#collections" className="text-body-medium text-primary hover:text-secondary transition-colors">
                TEA COLLECTIONS
              </a>
              <a href="#" className="text-body-medium text-primary hover:text-secondary transition-colors">
                ACCESSORIES
              </a>
              <a href="#blog" className="text-body-medium text-primary hover:text-secondary transition-colors">
                BLOG
              </a>
              <a href="#contact" className="text-body-medium text-primary hover:text-secondary transition-colors">
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
                  className="absolute right-0 top-0 h-full text-primary hover:text-secondary"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>

              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:text-secondary"
                onClick={handleUserClick}
              >
                <User className="h-5 w-5" />
              </Button>

              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:text-secondary"
                  onClick={logout}
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              )}

              <Button variant="ghost" size="icon" className="text-primary hover:text-secondary relative">
                <ShoppingBag className="h-5 w-5" />
                {cartSummary.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartSummary.totalItems}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary"
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
          <div className="fixed right-0 top-0 h-full w-80 bg-background shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-outline/20">
              <span className="text-title-medium font-medium">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="SEARCH PRODUCTS"
                  className="pl-10 bg-background-variant border-outline/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>

              {/* User Profile */}
              <div
                className="flex items-center space-x-3 py-3 border-b border-outline/10 cursor-pointer"
                onClick={handleUserClick}
              >
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-title-small font-medium">USER PROFILE</div>
                  <div className="text-body-small text-muted-foreground">
                    {isAuthenticated ? `Welcome, ${user?.name}` : "We know you as a guest user"}
                  </div>
                </div>
              </div>

              {/* Shopping Bag */}
              <div className="flex items-center space-x-3 py-3 border-b border-outline/10">
                <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-title-small font-medium">YOUR BAG</div>
                  <div className="text-body-small text-muted-foreground">
                    {cartSummary.totalItems} items have been added
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-4 pt-4">
                <a
                  href="#collections"
                  className="block text-title-medium text-primary hover:text-secondary transition-colors"
                >
                  TEA COLLECTIONS
                </a>
                <a href="#" className="block text-title-medium text-primary hover:text-secondary transition-colors">
                  ACCESSORIES
                </a>
                <a href="#blog" className="block text-title-medium text-primary hover:text-secondary transition-colors">
                  BLOG
                </a>
                <a
                  href="#contact"
                  className="block text-title-medium text-primary hover:text-secondary transition-colors"
                >
                  CONTACT US
                </a>
                {isAuthenticated && (
                  <button
                    onClick={logout}
                    className="block text-title-medium text-primary hover:text-secondary transition-colors w-full text-left"
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
