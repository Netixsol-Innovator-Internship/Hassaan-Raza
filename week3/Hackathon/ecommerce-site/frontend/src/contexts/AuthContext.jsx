"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { authAPI } from "@/lib/api"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      // Verify token and get user profile
      authAPI
        .getProfile()
        .then((response) => {
          if (response.success && response.data) {
            setUser(response.data.user)
          }
        })
        .catch(() => {
          // Token is invalid, remove it
          localStorage.removeItem("token")
          setToken(null)
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password })
      if (response.success && response.data) {
        const { user, token } = response.data
        setUser(user)
        setToken(token)
        localStorage.setItem("token", token)
      }
    } catch (error) {
      throw error
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password })
      if (response.success && response.data) {
        const { user, token } = response.data
        setUser(user)
        setToken(token)
        localStorage.setItem("token", token)
      }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
  }

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
