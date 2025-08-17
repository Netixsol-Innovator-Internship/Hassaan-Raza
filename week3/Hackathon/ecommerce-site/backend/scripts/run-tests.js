// Automated test runner for the Tea E-Commerce API
// Run with: node scripts/run-tests.js

import fetch from "node-fetch"
import dotenv from "dotenv"

dotenv.config()

const BASE_URL = process.env.BASE_URL || "http://localhost:5000"
let authToken = ""
let productId = ""
let cartItemId = ""

// Test utilities
const makeRequest = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`
    const config = {
        headers: {
            "Content-Type": "application/json",
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
            ...options.headers,
        },
        ...options,
    }

    try {
        const response = await fetch(url, config)
        const data = await response.json()
        return { status: response.status, data }
    } catch (error) {
        return { status: 500, error: error.message }
    }
}

const runTest = async (testName, testFn) => {
    try {
        console.log(`🧪 Running: ${testName}`)
        await testFn()
        console.log(`✅ Passed: ${testName}`)
    } catch (error) {
        console.log(`❌ Failed: ${testName} - ${error.message}`)
    }
}

// Test cases
const tests = {
    async healthCheck() {
        const { status, data } = await makeRequest("/api/health")
        if (status !== 200) throw new Error(`Expected 200, got ${status}`)
        if (!data.message.includes("running")) throw new Error("Health check failed")
    },

    async registerUser() {
        const { status, data } = await makeRequest("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                name: "Test User",
                email: `test${Date.now()}@example.com`,
                password: "Password123",
            }),
        })
        if (status !== 201) throw new Error(`Expected 201, got ${status}`)
        if (!data.data.token) throw new Error("No token received")
        authToken = data.data.token
    },

    async loginAdmin() {
        const { status, data } = await makeRequest("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: process.env.ADMIN_EMAIL || "admin@teashop.com",
                password: process.env.ADMIN_PASSWORD || "admin123",
            }),
        })
        if (status !== 200) throw new Error(`Expected 200, got ${status}`)
        if (!data.data.token) throw new Error("No admin token received")
        authToken = data.data.token
    },

    async getProducts() {
        const { status, data } = await makeRequest("/api/products")
        if (status !== 200) throw new Error(`Expected 200, got ${status}`)
        if (!Array.isArray(data.data)) throw new Error("Products data is not an array")
        if (data.data.length > 0) {
            productId = data.data[0]._id
        }
    },

    async getProductsWithFilters() {
        const { status, data } = await makeRequest("/api/products?collection=Green Tea&page=1&limit=5")
        if (status !== 200) throw new Error(`Expected 200, got ${status}`)
        if (data.count > 5) throw new Error("Limit not applied correctly")
    },

    async searchProducts() {
        const { status, data } = await makeRequest("/api/products/search?q=tea")
        if (status !== 200) throw new Error(`Expected 200, got ${status}`)
        if (!Array.isArray(data.data)) throw new Error("Search results not an array")
    },

    async getSingleProduct() {
        if (!productId) throw new Error("No product ID available")
        const { status, data } = await makeRequest(`/api/products/${productId}`)
        if (status !== 200) throw new Error(`Expected 200, got ${status}`)
        if (!data.data._id) throw new Error("Product data missing")
    },

    async createProduct() {
        const { status, data } = await makeRequest("/api/products", {
            method: "POST",
            body: JSON.stringify({
                name: "Test Tea Product",
                description: "A test tea for automated testing",
                price: 25.99,
                weight: "100g",
                collection: "Green Tea",
                origin: "Test Origin",
                flavour: "Test Flavour",
                quality: "Premium",
                caffeine: "Medium",
                stock: 50,
            }),
        })
        if (status !== 201) throw new Error(`Expected 201, got ${status}`)
        if (!data.data._id) throw new Error("Created product missing ID")
    },

    async addToCart() {
        if (!productId) throw new Error("No product ID available")
        const { status, data } = await makeRequest("/api/cart", {
            method: "POST",
            body: JSON.stringify({
                productId,
                quantity: 2,
            }),
        })
        if (status !== 200) throw new Error(`Expected 200, got ${status}`)
        if (data.data.items && data.data.items.length > 0) {
            cartItemId = data.data.items[0]._id
        }
    },

    async getCart() {
        const { status, data } = await makeRequest("/api/cart")
        if (status !== 200) throw new Error(`Expected 200, got ${status}`)
        if (!data.data) throw new Error("Cart data missing")
    },

    async updateCartItem() {
        if (!cartItemId) throw new Error("No cart item ID available")
        const { status, data } = await makeRequest(`/api/cart/${cartItemId}`, {
            method: "PUT",
            body: JSON.stringify({
                quantity: 3,
            }),
        })
        if (status !== 200) throw new Error(`Expected 200, got ${status}`)
    },

    async getCartSummary() {
        const { status, data } = await makeRequest("/api/cart/summary")
        if (status !== 200) throw new Error(`Expected 200, got ${status}`)
        if (typeof data.data.totalItems !== "number") throw new Error("Invalid cart summary")
    },

    async validateCart() {
        const { status, data } = await makeRequest("/api/cart/validate", {
            method: "POST",
        })
        if (status !== 200) throw new Error(`Expected 200, got ${status}`)
        if (typeof data.data.isValid !== "boolean") throw new Error("Invalid validation response")
    },

    async removeFromCart() {
        if (!cartItemId) throw new Error("No cart item ID available")
        const { status } = await makeRequest(`/api/cart/${cartItemId}`, {
            method: "DELETE",
        })
        if (status !== 200) throw new Error(`Expected 200, got ${status}`)
    },

    async clearCart() {
        const { status } = await makeRequest("/api/cart", {
            method: "DELETE",
        })
        if (status !== 200) throw new Error(`Expected 200, got ${status}`)
    },
}

// Run all tests
const runAllTests = async () => {
    console.log("🚀 Starting Tea E-Commerce API Tests")
    console.log(`📍 Testing against: ${BASE_URL}`)
    console.log("=".repeat(50))

    // Public tests
    await runTest("Health Check", tests.healthCheck)
    await runTest("Get Products", tests.getProducts)
    await runTest("Get Products with Filters", tests.getProductsWithFilters)
    await runTest("Search Products", tests.searchProducts)
    await runTest("Get Single Product", tests.getSingleProduct)

    // User authentication tests
    await runTest("Register User", tests.registerUser)
    await runTest("Add to Cart", tests.addToCart)
    await runTest("Get Cart", tests.getCart)
    await runTest("Update Cart Item", tests.updateCartItem)
    await runTest("Get Cart Summary", tests.getCartSummary)
    await runTest("Validate Cart", tests.validateCart)
    await runTest("Remove from Cart", tests.removeFromCart)
    await runTest("Clear Cart", tests.clearCart)

    // Admin tests
    await runTest("Login Admin", tests.loginAdmin)
    await runTest("Create Product", tests.createProduct)

    console.log("=".repeat(50))
    console.log("🎉 All tests completed!")
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runAllTests().catch(console.error)
}

export { runAllTests, tests }
