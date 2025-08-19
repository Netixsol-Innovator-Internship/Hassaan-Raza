// API configuration and service functions for tea e-commerce backend

const API_BASE_URL = import.meta.env.VITE_API_URL

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token")

  const config = {
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
  async register(userData) {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  },

  async login(credentials) {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },

  async getProfile() {
    return apiRequest("/auth/profile")
  },

  async updateProfile(userData) {
    return apiRequest("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  },
}

// Products API
export const productsAPI = {
  async getProducts(params = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString())
      }
    })

    const res = await apiRequest(`/products?${searchParams.toString()}`)
    return { products: res.data || res }

  },

  async getProduct(id) {
    return apiRequest(`/products/${id}`)
  },

  async searchProducts(query, page = 1, limit = 12) {
    return apiRequest(`/products/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`)
  },

  async getCollections() {
    const response = await apiRequest("/products")
    // Extract unique collections from products
    const collections = [...new Set(response.data?.map((product) => product.collection).filter(Boolean))]
    return {
      success: true,
      data: collections,
    }
  },
}

// Cart API
export const cartAPI = {
  async getCart() {
    return apiRequest("/cart")
  },

  async addToCart(productId, quantity) {
    return apiRequest("/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    })
  },

  async updateCartItem(itemId, quantity) {
    return apiRequest(`/cart/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    })
  },

  async removeFromCart(itemId) {
    return apiRequest(`/cart/${itemId}`, {
      method: "DELETE",
    })
  },

  async clearCart() {
    return apiRequest("/cart", {
      method: "DELETE",
    })
  },

  async getCartSummary() {
    return apiRequest("/cart/summary")
  },

  async validateCart() {
    return apiRequest("/cart/validate", {
      method: "POST",
    })
  },
}
