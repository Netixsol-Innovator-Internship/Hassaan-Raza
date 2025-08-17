import Product from "../models/Product.js"
import { asyncHandler } from "./errorHandler.js"

const sampleProducts = [
    {
        name: "Earl Grey Supreme",
        description:
            "A classic Earl Grey blend with bergamot oil and cornflower petals. Perfect for afternoon tea with a sophisticated citrus aroma.",
        price: 24.99,
        weight: "100g",
        collection: "Black Tea",
        origin: "Sri Lanka",
        flavour: "Citrus Bergamot",
        quality: "Premium",
        caffeine: "High",
        stock: 50,
        image: "/tea-earl-grey.png",
    },
    {
        name: "Dragon Well Green Tea",
        description:
            "Authentic Chinese green tea with a delicate, sweet flavor and beautiful flat-leaf appearance. Hand-picked from the hills of Hangzhou.",
        price: 32.99,
        weight: "100g",
        collection: "Green Tea",
        origin: "China",
        flavour: "Sweet Vegetal",
        quality: "Premium",
        caffeine: "Medium",
        stock: 35,
        image: "/tea-dragon-well.png",
    },
    {
        name: "Chamomile Dreams",
        description:
            "Pure chamomile flowers creating a soothing, honey-like herbal tea. Perfect for relaxation and bedtime rituals.",
        price: 18.99,
        weight: "50g",
        collection: "Herbal Tea",
        origin: "Egypt",
        flavour: "Honey Floral",
        quality: "Organic",
        caffeine: "Caffeine-Free",
        stock: 75,
        image: "/tea-chamomile.png",
    },
    {
        name: "Royal Pu-erh",
        description:
            "Aged dark tea from Yunnan province with rich, earthy flavors and smooth finish. A true connoisseur's choice.",
        price: 45.99,
        weight: "100g",
        collection: "Pu-erh Tea",
        origin: "China",
        flavour: "Earthy Smooth",
        quality: "Premium",
        caffeine: "Medium",
        stock: 20,
        image: "/tea-puerh.png",
    },
    {
        name: "Himalayan White Tea",
        description:
            "Rare white tea from high-altitude gardens with subtle sweetness and delicate silver buds. Minimally processed for pure flavor.",
        price: 55.99,
        weight: "50g",
        collection: "White Tea",
        origin: "Nepal",
        flavour: "Subtle Sweet",
        quality: "Premium",
        caffeine: "Low",
        stock: 15,
        image: "/tea-white.png",
    },
    {
        name: "Iron Goddess Oolong",
        description:
            "Traditional Chinese oolong with complex floral notes and lasting sweetness. Semi-oxidized for perfect balance.",
        price: 38.99,
        weight: "100g",
        collection: "Oolong Tea",
        origin: "China",
        flavour: "Floral Complex",
        quality: "Premium",
        caffeine: "Medium",
        stock: 30,
        image: "/tea-oolong.png",
    },
    {
        name: "English Breakfast Blend",
        description: "Robust morning blend of Ceylon and Assam teas. Strong, malty flavor perfect with milk and sugar.",
        price: 22.99,
        weight: "100g",
        collection: "Black Tea",
        origin: "India",
        flavour: "Malty Robust",
        quality: "Standard",
        caffeine: "High",
        stock: 60,
        image: "/tea-english-breakfast.png",
    },
    {
        name: "Jasmine Phoenix Pearls",
        description:
            "Hand-rolled green tea pearls scented with fresh jasmine flowers. Elegant floral aroma with smooth green tea base.",
        price: 42.99,
        weight: "100g",
        collection: "Green Tea",
        origin: "China",
        flavour: "Jasmine Floral",
        quality: "Premium",
        caffeine: "Medium",
        stock: 25,
        image: "/tea-jasmine.png",
    },
    {
        name: "Peppermint Fresh",
        description:
            "Pure peppermint leaves providing refreshing, cooling sensation. Naturally caffeine-free and perfect for digestion.",
        price: 16.99,
        weight: "50g",
        collection: "Herbal Tea",
        origin: "Morocco",
        flavour: "Cool Minty",
        quality: "Organic",
        caffeine: "Caffeine-Free",
        stock: 80,
        image: "/tea-peppermint.png",
    },
    {
        name: "Fair Trade Ceylon",
        description:
            "Ethically sourced black tea from Sri Lankan highlands. Bright, citrusy flavor supporting sustainable farming practices.",
        price: 26.99,
        weight: "100g",
        collection: "Black Tea",
        origin: "Sri Lanka",
        flavour: "Bright Citrusy",
        quality: "Fair Trade",
        caffeine: "High",
        stock: 45,
        image: "/tea-ceylon.png",
    },
]

export const seedProducts = asyncHandler(async () => {
    try {
        const existingProducts = await Product.countDocuments()

        if (existingProducts === 0) {
            await Product.insertMany(sampleProducts)
            console.log("✅ Sample products seeded successfully")
            console.log(`📦 Added ${sampleProducts.length} tea products to the database`)
        } else {
            console.log("✅ Products already exist in database")
        }
    } catch (error) {
        console.error("❌ Error seeding products:", error.message)
    }
})
