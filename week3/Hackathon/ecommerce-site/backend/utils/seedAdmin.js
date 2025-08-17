import User from "../models/User.js"
import { asyncHandler } from "./errorHandler.js"

// Create admin user if it doesn't exist
export const seedAdmin = asyncHandler(async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" })

    if (!adminExists) {
      const adminUser = await User.create({
        name: "Admin User",
        email: process.env.ADMIN_EMAIL || "admin@teashop.com",
        password: process.env.ADMIN_PASSWORD || "admin123",
        role: "admin",
      })

      console.log("✅ Admin user created successfully")
      console.log(`📧 Admin Email: ${adminUser.email}`)
      console.log(`🔑 Admin Password: ${process.env.ADMIN_PASSWORD || "admin123"}`)
    } else {
      console.log("✅ Admin user already exists")
    }
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message)
  }
})
