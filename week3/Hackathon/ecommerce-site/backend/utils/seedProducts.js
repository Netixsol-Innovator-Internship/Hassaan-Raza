import Product from "../models/Product.js"
import { asyncHandler } from "./errorHandler.js"

const sampleProducts = [
  {
    "name": "Classic Earl Grey Black Tea",
    "description": "A premium black tea infused with bergamot oil for a citrusy aroma.",
    "price": 5.99,
    "weight": "100g",
    "collection": "Black Tea",
    "origin": "India",
    "flavour": "Citrus",
    "quality": "Premium",
    "caffeine": "Medium",
    "image": "https://github.com/Netixsol-Innovator-Internship/Kanza-Kashaf/blob/master/Week_3/Day_5/backend/images/Pic1.png?raw=true",
    "stock": 50,
    "isActive": true
  },
  {
    "name": "Jasmine Pearl Green Tea",
    "description": "Hand-rolled green tea scented with jasmine flowers for a floral taste.",
    "price": 7.50,
    "weight": "50g",
    "collection": "Green Tea",
    "origin": "China",
    "flavour": "Floral",
    "quality": "Organic",
    "caffeine": "Low",
    "image": "https://github.com/Netixsol-Innovator-Internship/Kanza-Kashaf/blob/master/Week_3/Day_5/backend/images/Pic2.png?raw=true",
    "stock": 30,
    "isActive": true
  },
  {
    "name": "Silver Needle White Tea",
    "description": "Delicate white tea made from young tea buds with a smooth finish.",
    "price": 9.80,
    "weight": "30g",
    "collection": "White Tea",
    "origin": "China",
    "flavour": "Smooth",
    "quality": "Premium",
    "caffeine": "Low",
    "image": "https://github.com/Netixsol-Innovator-Internship/Kanza-Kashaf/blob/master/Week_3/Day_5/backend/images/Pic3.png?raw=true",
    "stock": 20,
    "isActive": true
  },
  {
    "name": "Tie Guan Yin Oolong Tea",
    "description": "Semi-oxidized oolong tea with a rich, creamy texture.",
    "price": 8.20,
    "weight": "100g",
    "collection": "Oolong Tea",
    "origin": "Taiwan",
    "flavour": "Creamy",
    "quality": "Fair Trade",
    "caffeine": "Medium",
    "image": "https://github.com/Netixsol-Innovator-Internship/Kanza-Kashaf/blob/master/Week_3/Day_5/backend/images/Pic4.png?raw=true",
    "stock": 25,
    "isActive": true
  },
  {
    "name": "Peppermint Herbal Tea",
    "description": "Caffeine-free herbal tea with refreshing peppermint leaves.",
    "price": 4.50,
    "weight": "100g",
    "collection": "Herbal Tea",
    "origin": "USA",
    "flavour": "Minty",
    "quality": "Organic",
    "caffeine": "Caffeine-Free",
    "image": "https://github.com/Netixsol-Innovator-Internship/Kanza-Kashaf/blob/master/Week_3/Day_5/backend/images/Pic5.png?raw=true",
    "stock": 40,
    "isActive": true
  },
  {
    "name": "Aged Pu-erh Tea Cake",
    "description": "Fermented tea with earthy notes, aged for depth of flavor.",
    "price": 15.00,
    "weight": "250g",
    "collection": "Pu-erh Tea",
    "origin": "China",
    "flavour": "Earthy",
    "quality": "Premium",
    "caffeine": "High",
    "image": "https://github.com/Netixsol-Innovator-Internship/Kanza-Kashaf/blob/master/Week_3/Day_5/backend/images/Pic6.png?raw=true",
    "stock": 10,
    "isActive": true
  },
  {
    "name": "Masala Chai Black Tea",
    "description": "Spiced Indian tea blend with cinnamon, cardamom, and ginger.",
    "price": 6.20,
    "weight": "100g",
    "collection": "Black Tea",
    "origin": "India",
    "flavour": "Spicy",
    "quality": "Standard",
    "caffeine": "High",
    "image": "https://github.com/Netixsol-Innovator-Internship/Kanza-Kashaf/blob/master/Week_3/Day_5/backend/images/Pic7.png?raw=true",
    "stock": 35,
    "isActive": true
  },
  {
    "name": "Dragonwell Green Tea",
    "description": "Pan-fired Chinese green tea with chestnut undertones.",
    "price": 10.50,
    "weight": "50g",
    "collection": "Green Tea",
    "origin": "China",
    "flavour": "Nutty",
    "quality": "Premium",
    "caffeine": "Low",
    "image": "https://github.com/Netixsol-Innovator-Internship/Kanza-Kashaf/blob/master/Week_3/Day_5/backend/images/Pic8.png?raw=true",
    "stock": 15,
    "isActive": true
  },
  {
    "name": "Chamomile Herbal Tea",
    "description": "Calming herbal infusion with floral chamomile blossoms.",
    "price": 4.00,
    "weight": "100g",
    "collection": "Herbal Tea",
    "origin": "Egypt",
    "flavour": "Floral",
    "quality": "Organic",
    "caffeine": "Caffeine-Free",
    "image": "https://github.com/Netixsol-Innovator-Internship/Kanza-Kashaf/blob/master/Week_3/Day_5/backend/images/Pic9.png?raw=true",
    "stock": 45,
    "isActive": true
  },
  {
    "name": "Darjeeling First Flush",
    "description": "Rare Himalayan black tea with muscatel grape notes.",
    "price": 12.00,
    "weight": "50g",
    "collection": "Black Tea",
    "origin": "India",
    "flavour": "Fruity",
    "quality": "Premium",
    "caffeine": "Medium",
    "image": "https://github.com/Netixsol-Innovator-Internship/Kanza-Kashaf/blob/master/Week_3/Day_5/backend/images/Pic1.png?raw=true",
    "stock": 12,
    "isActive": true
  }
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
