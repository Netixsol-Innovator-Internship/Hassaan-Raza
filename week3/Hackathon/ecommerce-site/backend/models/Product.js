import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      min: [0, "Price cannot be negative"],
    },
    weight: {
      type: String,
      required: [true, "Please provide product weight"],
      trim: true,
    },
    collection: {
      type: String,
      required: [true, "Please specify tea collection"],
      enum: ["Green Tea", "Black Tea", "White Tea", "Oolong Tea", "Herbal Tea", "Pu-erh Tea"],
      trim: true,
    },
    origin: {
      type: String,
      required: [true, "Please specify tea origin"],
      trim: true,
    },
    flavour: {
      type: String,
      required: [true, "Please specify tea flavour"],
      trim: true,
    },
    quality: {
      type: String,
      required: [true, "Please specify tea quality"],
      enum: ["Premium", "Standard", "Organic", "Fair Trade"],
      trim: true,
    },
    caffeine: {
      type: String,
      required: [true, "Please specify caffeine level"],
      enum: ["High", "Medium", "Low", "Caffeine-Free"],
      trim: true,
    },
    Organic: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "/tea-product.png",
    },
    stock: {
      type: Number,
      required: [true, "Please provide stock quantity"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for search functionality
productSchema.index({
  name: "text",
  description: "text",
  collection: "text",
  origin: "text",
  flavour: "text",
})

export default mongoose.model("Product", productSchema)
