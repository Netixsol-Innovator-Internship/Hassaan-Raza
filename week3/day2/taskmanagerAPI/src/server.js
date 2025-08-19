const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const swaggerDocs = require("./docs/swagger")

// Load environment variables
dotenv.config()

// Import routes
const taskRoutes = require("./routes/taskRoutes")
const authRoutes = require("./routes/authRoutes")

// Import middleware
const errorHandler = require("./middleware/errorHandler")

const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Simple root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    data: null,
    message: "Task Manager API v2 is running with MongoDB!",
  })
})

// Swagger UI middleware
app.use("/api-docs", swaggerDocs.serve, swaggerDocs.setup)

// API routes
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

// Global error handler (must be after routes)
app.use(errorHandler)

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`)
})

module.exports = app


// const express = require("express")
// const cors = require("cors")
// const dotenv = require("dotenv")
// const connectDB = require("./config/db")

// // Load environment variables
// dotenv.config()

// // Import routes
// const taskRoutes = require("./routes/taskRoutes")
// const authRoutes = require("./routes/authRoutes")

// // Import middleware
// const errorHandler = require("./middleware/errorHandler")

// const app = express()

// let dbConnection = null

// const ensureConnection = async () => {
//   if (!dbConnection) {
//     try {
//       dbConnection = await connectDB()
//       console.log("✅ Database connected successfully")
//     } catch (error) {
//       console.error("❌ Database connection failed:", error.message)
//       throw error
//     }
//   }
//   return dbConnection
// }

// // Middleware
// app.use(cors())
// app.use(express.json({ limit: "10mb" }))

// app.use(async (req, res, next) => {
//   try {
//     await ensureConnection()
//     next()
//   } catch (error) {
//     console.error("Database connection error:", error.message)
//     return res.status(500).json({
//       success: false,
//       data: null,
//       message: "Database connection failed. Please try again.",
//     })
//   }
// })

// // Simple root route
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     data: null,
//     message: "Task Manager API v2 is running with MongoDB!",
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || "development",
//   })
// })

// if (process.env.NODE_ENV !== "production") {
//   try {
//     const swaggerDocs = require("./docs/swagger")
//     app.use("/api-docs", swaggerDocs.serve, swaggerDocs.setup)
//     console.log("📚 Swagger documentation available at /api-docs")
//   } catch (error) {
//     console.warn("⚠️ Swagger setup failed:", error.message)
//   }
// } else {
//   // Simple docs endpoint for production
//   app.get("/api-docs", (req, res) => {
//     res.json({
//       success: true,
//       message: "API Documentation",
//       endpoints: {
//         auth: {
//           register: "POST /api/auth/register",
//           login: "POST /api/auth/login",
//           profile: "GET /api/auth/me",
//         },
//         tasks: {
//           list: "GET /api/tasks",
//           create: "POST /api/tasks",
//           get: "GET /api/tasks/:id",
//           update: "PUT /api/tasks/:id",
//           delete: "DELETE /api/tasks/:id",
//           stats: "GET /api/tasks/stats",
//         },
//       },
//     })
//   })
// }

// // API routes
// app.use("/api/auth", authRoutes)
// app.use("/api/tasks", taskRoutes)

// app.use(errorHandler)

// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     data: null,
//     message: `Route ${req.originalUrl} not found`,
//   })
// })

// const PORT = process.env.PORT || 3002
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`)
//   console.log(`API Documentation: http://localhost:${PORT}/api-docs`)
// })
// // Export the app for Vercel serverless functions
// module.exports = app




// V0 version

// const express = require("express")
// const cors = require("cors")
// const dotenv = require("dotenv")
// const connectDB = require("./config/db")

// // Load environment variables first
// dotenv.config()

// const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET"]
// const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

// if (missingEnvVars.length > 0) {
//   console.error(`❌ Missing required environment variables: ${missingEnvVars.join(", ")}`)
//   if (process.env.NODE_ENV === "production") {
//     throw new Error(`Missing environment variables: ${missingEnvVars.join(", ")}`)
//   }
// }

// const swaggerDocs = (() => {
//   try {
//     if (process.env.NODE_ENV !== "production") {
//       return require("./docs/swagger")
//     }
//     return null
//   } catch (error) {
//     console.warn("⚠️ Swagger docs not available:", error.message)
//     return null
//   }
// })()
// // Import routes
// const taskRoutes = require("./routes/taskRoutes")
// const authRoutes = require("./routes/authRoutes")

// // Import middleware
// const errorHandler = require("./middleware/errorHandler")

// const app = express()

// let dbConnected = false
// const initializeDB = async () => {
//   if (!dbConnected) {
//     try {
//       await connectDB()
//       dbConnected = true
//       console.log("✅ Database initialized successfully")
//     } catch (error) {
//       console.error("❌ Database initialization failed:", error.message)
//       throw error
//     }
//   }
// }

// app.use(async (req, res, next) => {
//   try {
//     await initializeDB()
//     next()
//   } catch (error) {
//     console.error("Database connection error:", error.message)
//     res.status(500).json({
//       success: false,
//       data: null,
//       message: "Database connection failed",
//       error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
//     })
//   }
// })

// // Middleware
// app.use(cors())
// app.use(express.json())

// // Simple root route with health check
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     data: {
//       version: "2.0.0",
//       environment: process.env.NODE_ENV || "development",
//       database: dbConnected ? "connected" : "disconnected",
//       timestamp: new Date().toISOString(),
//     },
//     message: "Task Manager API v2 is running with MongoDB!",
//   })
// })

// app.get("/health", (req, res) => {
//   res.json({
//     success: true,
//     data: {
//       status: "healthy",
//       database: dbConnected,
//       uptime: process.uptime(),
//       memory: process.memoryUsage(),
//     },
//     message: "API is healthy",
//   })
// })

// if (swaggerDocs && process.env.NODE_ENV !== "production") {
//   app.use("/api-docs", swaggerDocs.serve, swaggerDocs.setup)
//   console.log("📚 Swagger documentation available at /api-docs")
// }

// // API routes
// app.use("/api/auth", authRoutes)
// app.use("/api/tasks", taskRoutes)

// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     data: null,
//     message: `Route ${req.originalUrl} not found`,
//   })
// })

// // Global error handler (must be after routes)
// app.use(errorHandler)

// const PORT = process.env.PORT || 3002
// if (process.env.NODE_ENV !== "production") {
//   const startServer = async () => {
//     try {
//       await initializeDB()
//       app.listen(PORT, () => {
//         console.log(`🚀 Server running on http://localhost:${PORT}`)
//         console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`)
//         console.log(`🏥 Health Check: http://localhost:${PORT}/health`)
//       })
//     } catch (error) {
//       console.error("❌ Failed to start server:", error.message)
//       process.exit(1)
//     }
//   }
//   startServer()
// }

// module.exports = app
