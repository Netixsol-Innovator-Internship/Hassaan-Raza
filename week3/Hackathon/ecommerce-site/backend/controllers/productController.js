import Product from "../models/Product.js"
import { asyncHandler } from "../utils/errorHandler.js"
import { validationResult } from "express-validator"

// @desc    Get all products with filtering, search, and pagination
// @route   GET /api/products
// @access  Public

// export const getProducts = asyncHandler(async (req, res) => {
//   const {
//     collection,
//     origin,
//     flavour,
//     quality,
//     caffeine,
//     search,
//     page = 1,
//     limit = 12,
//     sort = "-createdAt",
//     minPrice,
//     maxPrice,
//   } = req.query

//   // Build query object
//   const query = { isActive: true }

//   // Filter by collection
//   if (collection) {
//     query.collection = { $regex: collection, $options: "i" }
//   }

//   // Filter by origin
//   if (origin) {
//     query.origin = { $regex: origin, $options: "i" }
//   }

//   // Filter by flavour
//   if (flavour) {
//     query.flavour = { $regex: flavour, $options: "i" }
//   }

//   // Filter by quality
//   if (quality) {
//     query.quality = quality
//   }

//   // Filter by caffeine level
//   if (caffeine) {
//     query.caffeine = caffeine
//   }

//   // Price range filter
//   if (minPrice || maxPrice) {
//     query.price = {}
//     if (minPrice) query.price.$gte = Number.parseFloat(minPrice)
//     if (maxPrice) query.price.$lte = Number.parseFloat(maxPrice)
//   }

//   // Text search
//   if (search) {
//     query.$text = { $search: search }
//   }

//   // Calculate pagination
//   const pageNum = Number.parseInt(page, 10)
//   const limitNum = Number.parseInt(limit, 10)
//   const skip = (pageNum - 1) * limitNum

//   // Execute query with pagination
//   const products = await Product.find(query).sort(sort).skip(skip).limit(limitNum).lean()

//   // Get total count for pagination
//   const total = await Product.countDocuments(query)
//   const totalPages = Math.ceil(total / limitNum)

//   // Get unique filter values for frontend
//   const filterOptions = await Product.aggregate([
//     { $match: { isActive: true } },
//     {
//       $group: {
//         _id: null,
//         collections: { $addToSet: "$collection" },
//         origins: { $addToSet: "$origin" },
//         flavours: { $addToSet: "$flavour" },
//         qualities: { $addToSet: "$quality" },
//         caffeinelevels: { $addToSet: "$caffeine" },
//         priceRange: {
//           $push: {
//             min: { $min: "$price" },
//             max: { $max: "$price" },
//           },
//         },
//       },
//     },
//   ])

//   res.status(200).json({
//     success: true,
//     count: products.length,
//     pagination: {
//       currentPage: pageNum,
//       totalPages,
//       totalProducts: total,
//       hasNextPage: pageNum < totalPages,
//       hasPrevPage: pageNum > 1,
//     },
//     filters: filterOptions[0] || {},
//     data: products,
//   })
// })

// // 2nd Deepseek
// export const getProducts = asyncHandler(async (req, res) => {
//   const {
//     collection,
//     origin,
//     flavour,
//     quality,
//     caffeine,
//     organic,
//     search,
//     page = 1,
//     limit = 12,
//     sort = "newest",
//     minPrice,
//     maxPrice,
//   } = req.query

//   const query = { isActive: true }

//   // Collection filter
//   if (collection) {
//     query.collection = { $in: collection.split(",") }
//   }

//   // Origin filter
//   if (origin) {
//     query.origin = { $in: origin.split(",") }
//   }

//   // Flavour filter
//   if (flavour) {
//     query.flavour = { $in: flavour.split(",") }
//   }

//   // Quality filter
//   if (quality) {
//     query.quality = { $in: quality.split(",") }
//   }

//   // Caffeine filter
//   if (caffeine) {
//     query.caffeine = { $in: caffeine.split(",") }
//   }

//   // Organic filter
//   if (organic) {
//     query.Organic = organic === "true"
//   }

//   // Price range
//   if (minPrice || maxPrice) {
//     query.price = {}
//     if (minPrice) query.price.$gte = Number(minPrice)
//     if (maxPrice) query.price.$lte = Number(maxPrice)
//   }

//   // Text search
//   if (search) {
//     query.$text = { $search: search }
//   }

//   // Pagination
//   const pageNum = Number(page)
//   const limitNum = Number(limit)
//   const skip = (pageNum - 1) * limitNum

//   // Sorting
//   let sortOption = { createdAt: -1 }
//   if (sort === "price-low") sortOption = { price: 1 }
//   if (sort === "price-high") sortOption = { price: -1 }
//   if (sort === "popular") sortOption = { rating: -1 }

//   // Fetch products
//   const products = await Product.find(query)
//     .sort(sortOption)
//     .skip(skip)
//     .limit(limitNum)
//     .lean()

//   const total = await Product.countDocuments(query)
//   const totalPages = Math.ceil(total / limitNum)

//   // Get unique filter values
//   const filterOptions = await Product.aggregate([
//     { $match: { isActive: true } },
//     {
//       $group: {
//         _id: null,
//         collections: { $addToSet: "$collection" },
//         origins: { $addToSet: "$origin" },
//         flavours: { $addToSet: "$flavour" },
//         qualities: { $addToSet: "$quality" },
//         caffeineLevels: { $addToSet: "$caffeine" },
//         minPrice: { $min: "$price" },
//         maxPrice: { $max: "$price" },
//       },
//     },
//   ])

//   res.status(200).json({
//     success: true,
//     count: products.length,
//     pagination: {
//       currentPage: pageNum,
//       totalPages,
//       totalProducts: total,
//     },
//     filters: filterOptions[0] || {},
//     data: products,
//   })
// })

// 3rd with search
// @desc    Get all products with filtering
// @route   GET /api/products
// @access  Public
// export const getProducts = asyncHandler(async (req, res) => {
//   const {
//     collection,  // Comma-separated string (e.g., "Black Tea,Green Tea")
//     origin,
//     flavour,
//     quality,
//     caffeine,
//     organic,
//     search,
//     page = 1,
//     limit = 12,
//     sort = "newest",
//     minPrice,
//     maxPrice,
//   } = req.query;

//   const query = { isActive: true };

//   // Collection filter (handle comma-separated values)
//   if (collection) {
//     query.collection = { 
//       $in: collection.split(',').map(item => item.trim())
//     };
//   }

//   // Origin filter
//   if (origin) {
//     query.origin = { 
//       $in: origin.split(',').map(item => item.trim())
//     };
//   }

//   // Flavour filter
//   if (flavour) {
//     query.flavour = { 
//       $in: flavour.split(',').map(item => item.trim())
//     };
//   }

//   // Quality filter
//   if (quality) {
//     query.quality = { 
//       $in: quality.split(',').map(item => item.trim())
//     };
//   }

//   // Caffeine filter
//   if (caffeine) {
//     query.caffeine = { 
//       $in: caffeine.split(',').map(item => item.trim())
//     };
//   }

//   // Organic filter
//   if (organic) {
//     query.Organic = organic === "true";
//   }

//   // Price range
//   if (minPrice || maxPrice) {
//     query.price = {};
//     if (minPrice) query.price.$gte = Number(minPrice);
//     if (maxPrice) query.price.$lte = Number(maxPrice);
//   }

//   // Text search
//   if (search) {
//     query.$text = { $search: search };
//   }

//   // Sorting
//   let sortOption = { createdAt: -1 }; // Default: newest first
//   switch (sort) {
//     case "price-low":
//       sortOption = { price: 1 };
//       break;
//     case "price-high":
//       sortOption = { price: -1 };
//       break;
//     case "popular":
//       sortOption = { rating: -1 };
//       break;
//   }

//   // Pagination
//   const pageNum = Number(page);
//   const limitNum = Number(limit);
//   const skip = (pageNum - 1) * limitNum;

//   // Execute query
//   const products = await Product.find(query)
//     .sort(sortOption)
//     .skip(skip)
//     .limit(limitNum)
//     .lean();

//   const total = await Product.countDocuments(query);

//   res.status(200).json({
//     success: true,
//     count: products.length,
//     pagination: {
//       currentPage: pageNum,
//       totalPages: Math.ceil(total / limitNum),
//       totalProducts: total,
//     },
//     data: products,
//   });
// });

// query checked comma sepweated
export const getProducts = asyncHandler(async (req, res) => {
  const {
    collection,
    origin,
    flavour,
    quality,
    caffeine,
    organic,
    search,
    page = 1,
    limit = 12,
    sort = "newest",
    minPrice,
    maxPrice,
    category
  } = req.query;

  const query = { isActive: true };

  // Collection filter
  if (collection) {
    query.collection = { 
      $in: collection.split(',')
        .map(item => decodeURIComponent(item))
        .map(item => item.trim())
    };
  }

  // Origin filter
  if (origin) {
    query.origin = { 
      $in: origin.split(',')
        .map(item => decodeURIComponent(item))
        .map(item => item.trim())
    };
  }

  // Flavour filter
  if (flavour) {
    query.flavour = { 
      $in: flavour.split(',')
        .map(item => decodeURIComponent(item))
        .map(item => item.trim())
    };
  }

  // Quality filter
  if (quality) {
    query.quality = { 
      $in: quality.split(',')
        .map(item => decodeURIComponent(item))
        .map(item => item.trim())
    };
  }

  // Caffeine filter
  if (caffeine) {
    query.caffeine = { 
      $in: caffeine.split(',')
        .map(item => decodeURIComponent(item))
        .map(item => item.trim())
    };
  }

  // Organic filter
  if (organic) {
    query.Organic = organic === "true";
  }

  // Category filter
  if (category) {
    query.collection = category;
  }

  // Price range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Text search
  if (search) {
    query.$text = { $search: search };
  }

  // Sorting
  let sortOption = { createdAt: -1 }; // Default: newest first
  switch (sort) {
    case "price-low":
      sortOption = { price: 1 };
      break;
    case "price-high":
      sortOption = { price: -1 };
      break;
    case "popular":
      sortOption = { rating: -1 };
      break;
  }

  // Pagination
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  // Execute query
  const products = await Product.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limitNum)
    .lean();

  const total = await Product.countDocuments(query);

  res.status(200).json({
    success: true,
    count: products.length,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalProducts: total,
    },
    data: products,
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product || !product.isActive) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    })
  }

   res.status(200).json(product) // Changed this line

})

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    })
  }

  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  })
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    })
  }

  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    })
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  })
})

// @desc    Delete product (soft delete)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    })
  }

  // Soft delete - set isActive to false
  await Product.findByIdAndUpdate(req.params.id, { isActive: false })

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  })
})

// @desc    Get product statistics (Admin only)
// @route   GET /api/products/stats
// @access  Private/Admin
export const getProductStats = asyncHandler(async (req, res) => {
  const stats = await Product.aggregate([
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        activeProducts: {
          $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] },
        },
        averagePrice: { $avg: "$price" },
        totalStock: { $sum: "$stock" },
        collectionStats: {
          $push: {
            collection: "$collection",
            count: 1,
          },
        },
      },
    },
  ])

  const collectionBreakdown = await Product.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: "$collection",
        count: { $sum: 1 },
        averagePrice: { $avg: "$price" },
        totalStock: { $sum: "$stock" },
      },
    },
    { $sort: { count: -1 } },
  ])

  res.status(200).json({
    success: true,
    data: {
      overview: stats[0] || {},
      collectionBreakdown,
    },
  })
})

// @desc    Search products with advanced filters
// @route   GET /api/products/search
// @access  Public
export const searchProducts = asyncHandler(async (req, res) => {
  const { q, filters = {}, page = 1, limit = 12 } = req.query

  const query = { isActive: true }

  // Text search
  if (q) {
    query.$text = { $search: q }
  }

  // Apply filters
  if (filters.collection) query.collection = filters.collection
  if (filters.origin) query.origin = { $regex: filters.origin, $options: "i" }
  if (filters.quality) query.quality = filters.quality
  if (filters.caffeine) query.caffeine = filters.caffeine
  if (filters.minPrice || filters.maxPrice) {
    query.price = {}
    if (filters.minPrice) query.price.$gte = Number.parseFloat(filters.minPrice)
    if (filters.maxPrice) query.price.$lte = Number.parseFloat(filters.maxPrice)
  }

  const pageNum = Number.parseInt(page, 10)
  const limitNum = Number.parseInt(limit, 10)
  const skip = (pageNum - 1) * limitNum

  const products = await Product.find(query)
    .sort(q ? { score: { $meta: "textScore" } } : "-createdAt")
    .skip(skip)
    .limit(limitNum)

  const total = await Product.countDocuments(query)

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
    },
    data: products,
  })
})
