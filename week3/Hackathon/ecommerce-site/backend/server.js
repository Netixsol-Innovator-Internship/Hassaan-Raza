import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { errorHandler } from "./utils/errorHandler.js"
import { seedAdmin } from "./utils/seedAdmin.js"
import { seedProducts } from "./utils/seedProducts.js"
import { specs, swaggerUi } from "./docs/swagger.js"

// Import routes
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB and seed data
const initializeApp = async () => {
    await connectDB()
    await seedAdmin()
    await seedProducts()
}

initializeApp()

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
    }),
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Swagger documentation route
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true,
        customCss: ".swagger-ui .topbar { display: none }",
        customSiteTitle: "Tea E-Commerce API Documentation",
    }),
)

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: API health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tea E-Commerce Backend is running!"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     auth:
 *                       type: string
 *                       example: "/api/auth"
 *                     products:
 *                       type: string
 *                       example: "/api/products"
 *                     cart:
 *                       type: string
 *                       example: "/api/cart"
 *                     docs:
 *                       type: string
 *                       example: "/api-docs"
 */
app.get("/api/health", (req, res) => {
    res.status(200).json({
        message: "Tea E-Commerce Backend is running!",
        timestamp: new Date().toISOString(),
        endpoints: {
            auth: "/api/auth",
            products: "/api/products",
            cart: "/api/cart",
            docs: "/api-docs",
        },
    })
})

// Error handling middleware (must be last)
app.use(errorHandler)

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({ message: "Route not found" })
})

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📚 API Documentation will be available at http://localhost:${PORT}/api-docs`)
    console.log(`🔍 Test endpoints:`)
    console.log(`   GET  /api/products - Get all products with filters`)
    console.log(`   GET  /api/products/search?q=green - Search products`)
    console.log(`   POST /api/auth/login - Login to get JWT token`)
})

export default app
