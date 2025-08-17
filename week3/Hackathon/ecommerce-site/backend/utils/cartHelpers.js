import Product from "../models/Product.js"

// Helper function to validate cart items against current product data
export const validateCartItems = async (cartItems) => {
    const validationResults = []

    for (const item of cartItems) {
        const product = await Product.findById(item.product)

        const result = {
            itemId: item._id,
            productId: item.product,
            isValid: true,
            issues: [],
        }

        // Check if product exists and is active
        if (!product || !product.isActive) {
            result.isValid = false
            result.issues.push("Product is no longer available")
        } else {
            // Check stock availability
            if (product.stock < item.quantity) {
                result.isValid = false
                result.issues.push(`Insufficient stock. Available: ${product.stock}, Requested: ${item.quantity}`)
            }

            // Check if price has changed
            if (product.price !== item.price) {
                result.issues.push(`Price changed from $${item.price} to $${product.price}`)
                result.priceUpdate = {
                    oldPrice: item.price,
                    newPrice: product.price,
                }
            }
        }

        validationResults.push(result)
    }

    return validationResults
}

// Helper function to calculate cart totals
export const calculateCartTotals = (cartItems) => {
    const totals = cartItems.reduce(
        (acc, item) => {
            acc.totalItems += item.quantity
            acc.totalAmount += item.price * item.quantity
            acc.itemCount += 1
            return acc
        },
        { totalItems: 0, totalAmount: 0, itemCount: 0 },
    )

    return {
        ...totals,
        totalAmount: Math.round(totals.totalAmount * 100) / 100, // Round to 2 decimal places
    }
}

// Helper function to check if cart item can be added
export const canAddToCart = async (productId, requestedQuantity, existingQuantity = 0) => {
    const product = await Product.findById(productId)

    if (!product || !product.isActive) {
        return {
            canAdd: false,
            reason: "Product not found or unavailable",
        }
    }

    const totalQuantity = requestedQuantity + existingQuantity

    if (product.stock < totalQuantity) {
        return {
            canAdd: false,
            reason: `Insufficient stock. Available: ${product.stock}, Requested: ${totalQuantity}`,
            availableQuantity: Math.max(0, product.stock - existingQuantity),
        }
    }

    return {
        canAdd: true,
        product,
    }
}
