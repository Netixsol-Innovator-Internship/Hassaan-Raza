"use client"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { CheckSquare, BarChart3, User, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
    setIsMobileMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  if (!user) {
    return null
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <CheckSquare className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-800">TaskManager</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/dashboard")
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/tasks"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/tasks")
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
              }`}
            >
              <CheckSquare className="h-4 w-4" />
              <span>Tasks</span>
            </Link>
            <Link
              to="/profile"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/profile")
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-50"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/dashboard")
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/tasks"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/tasks")
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                <CheckSquare className="h-4 w-4" />
                <span>Tasks</span>
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/profile")
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="px-3 py-2 text-sm text-gray-600">Welcome, {user.name}</div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
