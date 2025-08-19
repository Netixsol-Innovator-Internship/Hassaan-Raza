"use client"

import { createContext, useContext, useState, useEffect } from "react"
import api from "../utils/api"
import toast from "react-hot-toast"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
        api
          .get("/api/auth/me")
          .then((response) => {
            const userData = response.data?.data?.user || response.data?.user || response.data
            setUser(userData)
            // Update localStorage with fresh user data
            localStorage.setItem("user", JSON.stringify(userData))
          })
          .catch((error) => {
            console.error("Token verification failed:", error)
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            setUser(null)
          })
          .finally(() => {
            setLoading(false)
          })
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/auth/login", { email, password })
      const responseData = response.data?.data || response.data
      const { token, user: userData } = responseData

      if (token && userData) {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        toast.success("Login successful!")
        return { success: true }
      } else {
        return { success: false, error: "Invalid login response" }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "Login failed"
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await api.post("/api/auth/register", { name, email, password })
      const responseData = response.data?.data || response.data
      const { token, user: userData } = responseData

      if (token && userData) {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        toast.success("Registration successful!")
        return { success: true }
      } else {
        return { success: false, error: "Invalid registration response" }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "Registration failed"
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    toast.success("Logged out successfully!")
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
