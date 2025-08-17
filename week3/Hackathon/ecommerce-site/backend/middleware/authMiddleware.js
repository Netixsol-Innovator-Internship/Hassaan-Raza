import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { asyncHandler } from "../utils/errorHandler.js"

// Protect routes - verify JWT token
export const protect = asyncHandler(async (req, res, next) => {
    let token

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from token
            const user = await User.findById(decoded.id)
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found",
                })
            }

            // Check if user is active
            if (!user.isActive) {
                return res.status(401).json({
                    success: false,
                    message: "Account is deactivated",
                })
            }

            req.user = user
            next()
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, token failed",
            })
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, no token provided",
        })
    }
})

// Admin only middleware
export const adminOnly = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admin privileges required.",
        })
    }
})

// Optional auth middleware (for routes that work with or without auth)
export const optionalAuth = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.id)

            if (user && user.isActive) {
                req.user = user
            }
        } catch (error) {
            // Token is invalid, but we continue without user
            req.user = null
        }
    }

    next()
})
