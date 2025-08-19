const express = require("express")
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getStats,
} = require("../controllers/taskController")
const { protect } = require("../middleware/auth")
const {
  validateCreateTask,
  validateUpdateTask,
  validateObjectId,
  validateTaskQuery,
} = require("../middleware/validators")
const { handleValidationErrors } = require("../middleware/validateRequest")

const router = express.Router()

// All task routes are protected - user must be authenticated
router.use(protect)

router
  .route("/")
  .get(validateTaskQuery, handleValidationErrors, getAllTasks)
  .post(validateCreateTask, handleValidationErrors, createTask)

router.route("/stats").get(getStats)

router
  .route("/:id")
  .get(validateObjectId, handleValidationErrors, getTaskById)
  .put(validateObjectId, validateUpdateTask, handleValidationErrors, updateTask)
  .delete(validateObjectId, handleValidationErrors, deleteTask)

module.exports = router
