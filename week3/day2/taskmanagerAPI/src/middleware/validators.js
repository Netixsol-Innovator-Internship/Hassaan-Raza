const { body, param, query } = require("express-validator")

// User Registration Validation
const validateRegister = [
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
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
]

// User Login Validation
const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
]

// Task Creation Validation
const validateCreateTask = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),

  body("description").optional().trim().isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters"),

  body("completed").optional().isBoolean().withMessage("Completed must be a boolean value"),

  body("priority").optional().isIn(["low", "medium", "high"]).withMessage("Priority must be one of: low, medium, high"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date in ISO format")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("Due date cannot be in the past")
      }
      return true
    }),
]

// Task Update Validation
const validateUpdateTask = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Task title cannot be empty")
    .isLength({ min: 1, max: 100 })
    .withMessage("Title must be between 1 and 100 characters"),

  body("description").optional().trim().isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters"),

  body("completed").optional().isBoolean().withMessage("Completed must be a boolean value"),

  body("priority").optional().isIn(["low", "medium", "high"]).withMessage("Priority must be one of: low, medium, high"),

  body("dueDate").optional().isISO8601().withMessage("Due date must be a valid date in ISO format"),
]

// MongoDB ObjectId Validation
const validateObjectId = [param("id").isMongoId().withMessage("Invalid task ID format")]

// Query Parameter Validation for Tasks
const validateTaskQuery = [
  query("completed").optional().isBoolean().withMessage("Completed filter must be a boolean value"),

  query("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority filter must be one of: low, medium, high"),

  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),

  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),

  query("search")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Search term must be between 1 and 100 characters"),
]

module.exports = {
  validateRegister,
  validateLogin,
  validateCreateTask,
  validateUpdateTask,
  validateObjectId,
  validateTaskQuery,
}
