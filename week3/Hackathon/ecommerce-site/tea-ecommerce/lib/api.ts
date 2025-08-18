// API configuration and service functions for tea e-commerce backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// API response types
interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  count?: number
  pagination?: {
    currentPage: number
    totalPages: number
    totalProducts: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  filters?: any
}

interface ApiError {
  success: false
  message: string
  errors?: Array<{ field: string; message: string }>
}

// User types
export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  createdAt?: string
}

export interface AuthResponse {
  user: User
  token: string
}

// Product types
export interface Product {
  _id: string
  name: string
  description: string
  price: number
  weight: string
  collection: string
  origin: string
  flavour: string
  quality: string
  caffeine: string
  stock: number
  image?: string
  isActive: boolean
  createdAt: string
}

// Cart types
export interface CartItem {
  _id: string
  product: Product
  quantity: number
  price: number
}

export interface Cart {
  _id: string
  user: string
  items: CartItem[]
  totalAmount: number
  totalItems: number
}

// Generic API request function
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const token = localStorage.getItem("token")

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "API request failed")
    }

    return data
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}

// Authentication API
export const authAPI = {
  async register(userData: { name: string; email: string; password: string }) {
    return apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  async login(credentials: { email: string; password: string }) {
    return apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },

  async getProfile() {
    return apiRequest<{ user: User }>("/auth/profile")
  },

  async updateProfile(userData: { name?: string; email?: string }) {
    return apiRequest<{ user: User }>("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  },
}

// Products API
export const productsAPI = {
  async getProducts(
    params: {
      collection?: string
      origin?: string
      flavour?: string
      quality?: string
      caffeine?: string
      search?: string
      page?: number
      limit?: number
      sort?: string
      minPrice?: number
      maxPrice?: number
    } = {},
  ) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString())
      }
    })

    return apiRequest<Product[]>(`/products?${searchParams.toString()}`)
  },

  async getProduct(id: string) {
    return apiRequest<Product>(`/products/${id}`)
  },

  async searchProducts(query: string, page = 1, limit = 12) {
    return apiRequest<Product[]>(`/products/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`)
  },
}

// Cart API
export const cartAPI = {
  async getCart() {
    return apiRequest<Cart>("/cart")
  },

  async addToCart(productId: string, quantity: number) {
    return apiRequest<Cart>("/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    })
  },

  async updateCartItem(itemId: string, quantity: number) {
    return apiRequest<Cart>(`/cart/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    })
  },

  async removeFromCart(itemId: string) {
    return apiRequest<Cart>(`/cart/${itemId}`, {
      method: "DELETE",
    })
  },

  async clearCart() {
    return apiRequest<Cart>("/cart", {
      method: "DELETE",
    })
  },

  async getCartSummary() {
    return apiRequest<{
      totalItems: number
      totalAmount: number
      itemCount: number
    }>("/cart/summary")
  },

  async validateCart() {
    return apiRequest<{
      isValid: boolean
      issues: Array<{
        itemId: string
        issue: string
        action: string
        maxQuantity?: number
      }>
      updatedCart?: Cart
    }>("/cart/validate", {
      method: "POST",
    })
  },
}
