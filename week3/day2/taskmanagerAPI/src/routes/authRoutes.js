const express = require("express")
const { register, login, getMe } = require("../controllers/authController")
const { protect } = require("../middleware/auth")
const { validateRegister, validateLogin } = require("../middleware/validators")
const { handleValidationErrors } = require("../middleware/validateRequest")

const router = express.Router()

router.post("/register", validateRegister, handleValidationErrors, register)
router.post("/login", validateLogin, handleValidationErrors, login)

// Private routes
router.get("/me", protect, getMe)

module.exports = router
