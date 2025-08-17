import Cart from "../models/Cart.js"
import Product from "../models/Product.js"
import { asyncHandler } from "../utils/errorHandler.js"
import { validationResult } from "express-validator"

// @desc    Add product to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    })
  }

  const { productId, quantity } = req.body
  const userId = req.user.id

  // Check if product exists and is active
  const product = await Product.findById(productId)
  if (!product || !product.isActive) {
    return res.status(404).json({
      success: false,
      message: "Product not found or unavailable",
    })
  }

  // Check if enough stock is available
  if (product.stock < quantity) {
    return res.status(400).json({
      success: false,
      message: `Only ${product.stock} items available in stock`,
    })
  }

  // Find or create user's cart
  let cart = await Cart.findOne({ user: userId }).populate("items.product")

  if (!cart) {
    // Create new cart
    cart = new Cart({
      user: userId,
      items: [
        {
          product: productId,
          quantity,
          price: product.price,
        },
      ],
    })
  } else {
    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex((item) => item.product._id.toString() === productId)

    if (existingItemIndex > -1) {
      // Update quantity of existing item
      const newQuantity = cart.items[existingItemIndex].quantity + quantity

      // Check total quantity against stock
      if (product.stock < newQuantity) {
        return res.status(400).json({
          success: false,
          message: `Cannot add ${quantity} more items. Only ${
            product.stock - cart.items[existingItemIndex].quantity
          } more available`,
        })
      }

      cart.items[existingItemIndex].quantity = newQuantity
      cart.items[existingItemIndex].price = product.price // Update price in case it changed
    } else {
      // Add new item to cart
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      })
    }
  }

  await cart.save()

  // Populate cart with product details for response
  await cart.populate("items.product")

  res.status(200).json({
    success: true,
    message: "Product added to cart successfully",
    data: cart,
  })
})

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const cart = await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    select: "name price image collection weight stock isActive",
  })

  if (!cart) {
    return res.status(200).json({
      success: true,
      data: {
        user: userId,
        items: [],
        totalAmount: 0,
        totalItems: 0,
      },
    })
  }

  // Filter out inactive products and update cart
  const activeItems = cart.items.filter((item) => item.product && item.product.isActive)

  if (activeItems.length !== cart.items.length) {
    cart.items = activeItems
    await cart.save()
  }

  res.status(200).json({
    success: true,
    data: cart,
  })
})

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
export const updateCartItem = asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    })
  }

  const { quantity } = req.body
  const { itemId } = req.params
  const userId = req.user.id

  const cart = await Cart.findOne({ user: userId }).populate("items.product")

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    })
  }

  const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId)

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Item not found in cart",
    })
  }

  const item = cart.items[itemIndex]
  const product = item.product

  // Check if product is still active
  if (!product || !product.isActive) {
    return res.status(400).json({
      success: false,
      message: "Product is no longer available",
    })
  }

  // Check stock availability
  if (product.stock < quantity) {
    return res.status(400).json({
      success: false,
      message: `Only ${product.stock} items available in stock`,
    })
  }

  // Update quantity and price
  cart.items[itemIndex].quantity = quantity
  cart.items[itemIndex].price = product.price // Update price in case it changed

  await cart.save()

  res.status(200).json({
    success: true,
    message: "Cart item updated successfully",
    data: cart,
  })
})

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
export const removeFromCart = asyncHandler(async (req, res) => {
  const { itemId } = req.params
  const userId = req.user.id

  const cart = await Cart.findOne({ user: userId })

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    })
  }

  const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId)

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Item not found in cart",
    })
  }

  // Remove item from cart
  cart.items.splice(itemIndex, 1)
  await cart.save()

  // Populate cart with product details for response
  await cart.populate("items.product")

  res.status(200).json({
    success: true,
    message: "Item removed from cart successfully",
    data: cart,
  })
})

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const cart = await Cart.findOne({ user: userId })

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    })
  }

  cart.items = []
  await cart.save()

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
    data: cart,
  })
})

// @desc    Get cart summary (items count and total)
// @route   GET /api/cart/summary
// @access  Private
export const getCartSummary = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const cart = await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    select: "isActive",
  })

  if (!cart) {
    return res.status(200).json({
      success: true,
      data: {
        totalItems: 0,
        totalAmount: 0,
        itemCount: 0,
      },
    })
  }

  // Filter active items only
  const activeItems = cart.items.filter((item) => item.product && item.product.isActive)

  const summary = {
    totalItems: activeItems.reduce((total, item) => total + item.quantity, 0),
    totalAmount: activeItems.reduce((total, item) => total + item.price * item.quantity, 0),
    itemCount: activeItems.length,
  }

  res.status(200).json({
    success: true,
    data: summary,
  })
})

// @desc    Validate cart items (check stock and active status)
// @route   POST /api/cart/validate
// @access  Private
export const validateCart = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const cart = await Cart.findOne({ user: userId }).populate("items.product")

  if (!cart) {
    return res.status(200).json({
      success: true,
      data: {
        isValid: true,
        issues: [],
      },
    })
  }

  const issues = []
  const validItems = []

  for (const item of cart.items) {
    const product = item.product

    if (!product || !product.isActive) {
      issues.push({
        itemId: item._id,
        issue: "Product is no longer available",
        action: "remove",
      })
    } else if (product.stock < item.quantity) {
      issues.push({
        itemId: item._id,
        productName: product.name,
        issue: `Only ${product.stock} items available, but ${item.quantity} requested`,
        action: "reduce_quantity",
        maxQuantity: product.stock,
      })

      if (product.stock > 0) {
        validItems.push({
          ...item.toObject(),
          quantity: product.stock,
        })
      }
    } else {
      validItems.push(item)
    }
  }

  // Update cart if there are issues
  if (issues.length > 0) {
    cart.items = validItems
    await cart.save()
  }

  res.status(200).json({
    success: true,
    data: {
      isValid: issues.length === 0,
      issues,
      updatedCart: issues.length > 0 ? cart : null,
    },
  })
})
