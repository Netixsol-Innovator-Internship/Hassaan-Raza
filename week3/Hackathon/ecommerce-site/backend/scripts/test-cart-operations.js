// Test script for cart operations
// Run with: node scripts/test-cart-operations.js

import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "../models/User.js"
import Product from "../models/Product.js"
import Cart from "../models/Cart.js"

dotenv.config()

const testCartOperations = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("✅ Connected to MongoDB")

        // Find a test user and product
        const user = await User.findOne({ role: "user" })
        const product = await Product.findOne({ isActive: true })

        if (!user || !product) {
            console.log("❌ Need at least one user and one product to test cart operations")
            return
        }

        console.log(`🧪 Testing cart operations for user: ${user.email}`)
        console.log(`📦 Using product: ${product.name}`)

        // Test 1: Create/Add to cart
        let cart = await Cart.findOne({ user: user._id })
        if (cart) {
            await Cart.deleteOne({ user: user._id })
            console.log("🗑️  Cleared existing cart")
        }

        cart = new Cart({
            user: user._id,
            items: [
                {
                    product: product._id,
                    quantity: 2,
                    price: product.price,
                },
            ],
        })
        await cart.save()
        console.log("✅ Cart created with 2 items")

        // Test 2: Add another item
        const anotherProduct = await Product.findOne({
            _id: { $ne: product._id },
            isActive: true,
        })

        if (anotherProduct) {
            cart.items.push({
                product: anotherProduct._id,
                quantity: 1,
                price: anotherProduct.price,
            })
            await cart.save()
            console.log("✅ Added another product to cart")
        }

        // Test 3: Update quantity
        cart.items[0].quantity = 3
        await cart.save()
        console.log("✅ Updated first item quantity to 3")

        // Test 4: Get cart with populated products
        const populatedCart = await Cart.findOne({ user: user._id }).populate("items.product", "name price collection")

        console.log("📋 Cart contents:")
        populatedCart.items.forEach((item, index) => {
            console.log(`   ${index + 1}. ${item.product.name} - Qty: ${item.quantity} - Price: $${item.price}`)
        })
        console.log(`💰 Total: $${populatedCart.totalAmount}`)
        console.log(`📦 Total Items: ${populatedCart.totalItems}`)

        // Test 5: Remove an item
        cart.items.splice(0, 1)
        await cart.save()
        console.log("✅ Removed first item from cart")

        // Test 6: Clear cart
        cart.items = []
        await cart.save()
        console.log("✅ Cart cleared")

        console.log("🎉 All cart operations tested successfully!")
    } catch (error) {
        console.error("❌ Error testing cart operations:", error.message)
    } finally {
        await mongoose.disconnect()
        console.log("👋 Disconnected from MongoDB")
    }
}

testCartOperations()
