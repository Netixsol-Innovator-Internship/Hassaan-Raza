"use client"

import { createContext, useContext, useState, useEffect } from "react"
import api from "../utils/api"
import toast from "react-hot-toast"
import { useAuth } from "./AuthContext"

const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}

export const TaskProvider = ({ children }) => {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({})

  const fetchTasks = async (filters = {}) => {
    if (!user) return

    setLoading(true)
    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, value)
        }
      })

      const response = await api.get(`/api/tasks?${params}`)
      const tasksData = response.data?.data?.tasks || response.data?.tasks || []
      setTasks(Array.isArray(tasksData) ? tasksData : [])
      setPagination(response.data?.data?.pagination || {})
    } catch (error) {
      console.error("Error fetching tasks:", error)
      toast.error("Failed to fetch tasks")
      setTasks([]) // Set empty array on error to prevent undefined issues
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    if (!user) return

    console.log("[v0] Fetching stats for user:", user?.name)
    try {
      const response = await api.get("/api/tasks/stats")
      console.log("[v0] Stats API response:", response.data)
      setStats(response.data) // Store the full response structure
    } catch (error) {
      console.error("[v0] Error fetching stats:", error)
      console.log("[v0] Stats error response:", error.response?.data)
      toast.error("Failed to fetch statistics")
    }
  }

  const createTask = async (taskData) => {
    try {
      if (!taskData.title || taskData.title.trim() === "") {
        return { success: false, error: "Task title is required" }
      }

      console.log("[v0] Creating task with data:", taskData)
      const response = await api.post("/api/tasks", taskData)
      console.log("[v0] Create task API response:", response.data)

      if (response.data && response.data.success) {
        const newTask = response.data.data
        if (newTask && (newTask._id || newTask.id)) {
          setTasks((prev) => [newTask, ...prev])
          toast.success("Task created successfully!")
          fetchStats() // Refresh stats
          console.log("[v0] Task created successfully:", newTask)
          return { success: true, data: newTask }
        }
      }

      console.log("[v0] Invalid task response structure:", response.data)
      return { success: false, error: "Invalid response from server" }
    } catch (error) {
      console.error("[v0] Create task error:", error)
      console.log("[v0] Create task error response:", error.response?.data)
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to create task"
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const updateTask = async (taskId, taskData) => {
    try {
      if (!taskData.title || taskData.title.trim() === "") {
        return { success: false, error: "Task title is required" }
      }

      const response = await api.put(`/api/tasks/${taskId}`, taskData)

      if (response.data && response.data.success) {
        const updatedTask = response.data.data
        if (updatedTask && (updatedTask._id || updatedTask.id)) {
          setTasks((prev) => prev.map((task) => (task._id === taskId ? updatedTask : task)))
          toast.success("Task updated successfully!")
          fetchStats() // Refresh stats
          return { success: true, data: updatedTask }
        }
      }

      console.log("[v0] Update task response:", response.data)
      return { success: false, error: "Invalid response from server" }
    } catch (error) {
      console.error("Update task error:", error)
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "Failed to update task"
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/api/tasks/${taskId}`)
      setTasks((prev) => prev.filter((task) => task._id !== taskId))
      toast.success("Task deleted successfully!")
      fetchStats() // Refresh stats
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "Failed to delete task" }
    }
  }

  const toggleTaskComplete = async (taskId, completed) => {
    try {
      const response = await api.put(`/api/tasks/${taskId}`, { completed })
      setTasks((prev) => prev.map((task) => (task._id === taskId ? response.data.data.task : task)))
      toast.success(`Task marked as ${completed ? "completed" : "pending"}!`)
      fetchStats() // Refresh stats
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || "Failed to update task" }
    }
  }

  useEffect(() => {
    if (user) {
      fetchTasks()
      fetchStats()
    }
  }, [user])

  const value = {
    tasks,
    stats,
    loading,
    pagination,
    fetchTasks,
    fetchStats,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
