const { validationResult } = require("express-validator")

// Middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    // Format errors for better readability
    const formattedErrors = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
      value: error.value,
    }))

    return res.status(400).json({
      success: false,
      data: null,
      message: "Validation failed",
      errors: formattedErrors,
    })
  }

  next()
}

module.exports = { handleValidationErrors }
