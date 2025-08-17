// Generate additional test data for the Tea E-Commerce API
// Run with: node scripts/generate-test-data.js

import mongoose from "mongoose"
import dotenv from "dotenv"
import Product from "../models/Product.js"
import User from "../models/User.js"

dotenv.config()

const additionalProducts = [
    {
        name: "Royal Pu-erh Aged",
        description:
            "20-year aged Pu-erh tea with deep, complex earthy flavors and smooth finish. A true collector's item.",
        price: 89.99,
        weight: "357g",
        collection: "Pu-erh Tea",
        origin: "Yunnan, China",
        flavour: "Deep Earthy",
        quality: "Premium",
        caffeine: "Medium",
        stock: 8,
        image: "/tea-aged-puerh.png",
    },
    {
        name: "Himalayan Gold Tips",
        description: "Rare high-altitude black tea with golden tips. Exceptional quality with honey-like sweetness.",
        price: 65.99,
        weight: "50g",
        collection: "Black Tea",
        origin: "Nepal",
        flavour: "Honey Sweet",
        quality: "Premium",
        caffeine: "High",
        stock: 12,
        image: "/tea-gold-tips.png",
    },
    {
        name: "Organic Rooibos Vanilla",
        description: "Caffeine-free South African red bush tea with natural vanilla flavoring. Perfect evening tea.",
        price: 21.99,
        weight: "100g",
        collection: "Herbal Tea",
        origin: "South Africa",
        flavour: "Vanilla Sweet",
        quality: "Organic",
        caffeine: "Caffeine-Free",
        stock: 40,
        image: "/tea-rooibos.png",
    },
    {
        name: "Sencha Premium Grade",
        description: "First flush Japanese green tea with vibrant green color and fresh, grassy flavor profile.",
        price: 34.99,
        weight: "100g",
        collection: "Green Tea",
        origin: "Japan",
        flavour: "Fresh Grassy",
        quality: "Premium",
        caffeine: "Medium",
        stock: 28,
        image: "/tea-sencha.png",
    },
    {
        name: "Lavender Dreams",
        description: "Soothing herbal blend with dried lavender flowers. Promotes relaxation and peaceful sleep.",
        price: 19.99,
        weight: "75g",
        collection: "Herbal Tea",
        origin: "France",
        flavour: "Floral Lavender",
        quality: "Organic",
        caffeine: "Caffeine-Free",
        stock: 55,
        image: "/tea-lavender.png",
    },
    {
        name: "Milk Oolong Supreme",
        description: "Taiwanese high mountain oolong with natural creamy texture and floral notes. No milk added.",
        price: 52.99,
        weight: "100g",
        collection: "Oolong Tea",
        origin: "Taiwan",
        flavour: "Creamy Floral",
        quality: "Premium",
        caffeine: "Medium",
        stock: 18,
        image: "/tea-milk-oolong.png",
    },
    {
        name: "Fair Trade Breakfast Blend",
        description: "Ethically sourced morning blend supporting sustainable farming communities. Bold and energizing.",
        price: 23.99,
        weight: "200g",
        collection: "Black Tea",
        origin: "India",
        flavour: "Bold Malty",
        quality: "Fair Trade",
        caffeine: "High",
        stock: 65,
        image: "/tea-breakfast-blend.png",
    },
    {
        name: "White Peony Bai Mu Dan",
        description: "Delicate Chinese white tea with silvery buds and subtle sweetness. Light and refreshing.",
        price: 41.99,
        weight: "50g",
        collection: "White Tea",
        origin: "Fujian, China",
        flavour: "Subtle Sweet",
        quality: "Premium",
        caffeine: "Low",
        stock: 22,
        image: "/tea-white-peony.png",
    },
]

const testUsers = [
    {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: "Password123",
        role: "user",
    },
    {
        name: "Bob Smith",
        email: "bob@example.com",
        password: "Password123",
        role: "user",
    },
    {
        name: "Carol Davis",
        email: "carol@example.com",
        password: "Password123",
        role: "user",
    },
]

const generateTestData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("✅ Connected to MongoDB")

        // Add additional products
        const existingProductCount = await Product.countDocuments()
        console.log(`📦 Current products in database: ${existingProductCount}`)

        for (const productData of additionalProducts) {
            const existingProduct = await Product.findOne({ name: productData.name })
            if (!existingProduct) {
                await Product.create(productData)
                console.log(`✅ Added product: ${productData.name}`)
            } else {
                console.log(`⏭️  Product already exists: ${productData.name}`)
            }
        }

        // Add test users
        const existingUserCount = await User.countDocuments({ role: "user" })
        console.log(`👥 Current users in database: ${existingUserCount}`)

        for (const userData of testUsers) {
            const existingUser = await User.findOne({ email: userData.email })
            if (!existingUser) {
                await User.create(userData)
                console.log(`✅ Added user: ${userData.email}`)
            } else {
                console.log(`⏭️  User already exists: ${userData.email}`)
            }
        }

        const finalProductCount = await Product.countDocuments()
        const finalUserCount = await User.countDocuments()

        console.log("🎉 Test data generation completed!")
        console.log(`📊 Final counts:`)
        console.log(`   Products: ${finalProductCount}`)
        console.log(`   Users: ${finalUserCount}`)
    } catch (error) {
        console.error("❌ Error generating test data:", error.message)
    } finally {
        await mongoose.disconnect()
        console.log("👋 Disconnected from MongoDB")
    }
}

generateTestData()
