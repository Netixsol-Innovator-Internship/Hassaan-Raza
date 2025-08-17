import { body } from "express-validator"

// Validation for user registration
export const validateRegister = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters")
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage("Name can only contain letters and spaces"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
]

// Validation for user login
export const validateLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email")
        .normalizeEmail(),

    body("password").notEmpty().withMessage("Password is required"),
]

// Validation for profile update
export const validateProfileUpdate = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters")
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage("Name can only contain letters and spaces"),

    body("email").optional().trim().isEmail().withMessage("Please provide a valid email").normalizeEmail(),
]

// Validation for product creation/update
export const validateProduct = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Product name must be between 2 and 100 characters"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Product description is required")
        .isLength({ min: 10, max: 1000 })
        .withMessage("Description must be between 10 and 1000 characters"),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number"),

    body("weight")
        .trim()
        .notEmpty()
        .withMessage("Weight is required")
        .matches(/^\d+(\.\d+)?\s*(g|kg|oz|lb)$/i)
        .withMessage("Weight must be in format like '100g', '1kg', '5oz', etc."),

    body("collection")
        .trim()
        .notEmpty()
        .withMessage("Collection is required")
        .isIn(["Green Tea", "Black Tea", "White Tea", "Oolong Tea", "Herbal Tea", "Pu-erh Tea"])
        .withMessage("Invalid tea collection"),

    body("origin")
        .trim()
        .notEmpty()
        .withMessage("Origin is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Origin must be between 2 and 50 characters"),

    body("flavour")
        .trim()
        .notEmpty()
        .withMessage("Flavour is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Flavour must be between 2 and 50 characters"),

    body("quality")
        .trim()
        .notEmpty()
        .withMessage("Quality is required")
        .isIn(["Premium", "Standard", "Organic", "Fair Trade"])
        .withMessage("Invalid quality option"),

    body("caffeine")
        .trim()
        .notEmpty()
        .withMessage("Caffeine level is required")
        .isIn(["High", "Medium", "Low", "Caffeine-Free"])
        .withMessage("Invalid caffeine level"),

    body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),

    body("image").optional().trim().isURL().withMessage("Image must be a valid URL"),
]

// Validation for cart operations
export const validateCartItem = [
    body("productId")
        .notEmpty()
        .withMessage("Product ID is required")
        .isMongoId()
        .withMessage("Invalid product ID format"),

    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1, max: 100 })
        .withMessage("Quantity must be between 1 and 100"),
]

// Validation for cart item update
export const validateCartUpdate = [
    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1, max: 100 })
        .withMessage("Quantity must be between 1 and 100"),
]
