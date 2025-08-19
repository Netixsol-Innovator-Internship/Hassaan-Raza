const Task = require("../models/task")

// @desc    Get all tasks for authenticated user
// @route   GET /api/tasks
// @access  Private
const getAllTasks = async (req, res, next) => {
  try {
    const { completed, priority, search, page = 1, limit = 10 } = req.query

    // Build query object - only get tasks for authenticated user
    const query = { user: req.user.id }

    // Add filters if provided
    if (completed !== undefined) {
      query.completed = completed === "true"
    }

    if (priority) {
      query.priority = priority
    }

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    // Calculate pagination
    const skip = (Number.parseInt(page) - 1) * Number.parseInt(limit)

    // Execute query with pagination and sorting
    const tasks = await Task.find(query)
      .sort({ createdAt: -1 }) // Most recent first
      .skip(skip)
      .limit(Number.parseInt(limit))
      .populate("user", "name email") // Include user info

    // Get total count for pagination info
    const totalTasks = await Task.countDocuments(query)
    const totalPages = Math.ceil(totalTasks / Number.parseInt(limit))

    res.status(200).json({
      success: true,
      data: {
        tasks,
        pagination: {
          currentPage: Number.parseInt(page),
          totalPages,
          totalTasks,
          hasNextPage: Number.parseInt(page) < totalPages,
          hasPrevPage: Number.parseInt(page) > 1,
        },
      },
      message: "Tasks retrieved successfully",
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id, // Ensure user can only access their own tasks
    }).populate("user", "name email")

    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found or you don't have permission to access it",
      })
    }

    res.status(200).json({
      success: true,
      data: task,
      message: "Task retrieved successfully",
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    // Add user ID to task data
    const taskData = {
      ...req.body,
      user: req.user.id,
    }

    const task = await Task.create(taskData)

    // Populate user info in response
    await task.populate("user", "name email")

    res.status(201).json({
      success: true,
      data: task,
      message: "Task created successfully",
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id, // Ensure user can only update their own tasks
      },
      req.body,
      {
        new: true, // Return updated document
        runValidators: true, // Run model validations
      },
    ).populate("user", "name email")

    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found or you don't have permission to update it",
      })
    }

    res.status(200).json({
      success: true,
      data: task,
      message: "Task updated successfully",
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // Ensure user can only delete their own tasks
    })

    if (!task) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Task not found or you don't have permission to delete it",
      })
    }

    res.status(200).json({
      success: true,
      data: null,
      message: "Task deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get task statistics for authenticated user
// @route   GET /api/tasks/stats
// @access  Private
const getStats = async (req, res, next) => {
  try {
    // Get all tasks for the authenticated user
    const userTasks = await Task.find({ user: req.user.id })

    // Calculate statistics
    const total = userTasks.length
    const completed = userTasks.filter((task) => task.completed).length
    const pending = total - completed

    // Priority breakdown
    const priorityStats = {
      high: userTasks.filter((task) => task.priority === "high").length,
      medium: userTasks.filter((task) => task.priority === "medium").length,
      low: userTasks.filter((task) => task.priority === "low").length,
    }

    // Overdue tasks (past due date and not completed)
    const now = new Date()
    const overdue = userTasks.filter((task) => task.dueDate && task.dueDate < now && !task.completed).length

    // Tasks due today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const dueToday = userTasks.filter(
      (task) => task.dueDate && task.dueDate >= today && task.dueDate < tomorrow && !task.completed,
    ).length

    // Recent activity (tasks created in last 7 days)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const recentTasks = userTasks.filter((task) => task.createdAt >= weekAgo).length

    res.status(200).json({
      success: true,
      data: {
        total,
        completed,
        pending,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
        priorityStats,
        overdue,
        dueToday,
        recentTasks,
      },
      message: "Task statistics retrieved successfully",
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getStats,
}
