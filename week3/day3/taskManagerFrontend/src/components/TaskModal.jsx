"use client"

import { useState, useEffect } from "react"
import { useTask } from "../contexts/TaskContext"
import { X, Calendar } from "lucide-react"

const TaskModal = ({ isOpen, onClose, task = null }) => {
  const { createTask, updateTask } = useTask()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const isEditing = !!task

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : "",
      })
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      })
    }
    setError("")
  }, [task, isOpen])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const taskData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
    }

    console.log("[v0] TaskModal submitting data:", taskData)
    console.log("[v0] Is editing:", isEditing)

    const result = isEditing ? await updateTask(task._id, taskData) : await createTask(taskData)

    console.log("[v0] TaskModal API result:", result)

    if (result.success) {
      console.log("[v0] TaskModal closing modal after success")
      onClose()
    } else {
      console.log("[v0] TaskModal showing error:", result.error)
      setError(result.error)
    }

    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{isEditing ? "Edit Task" : "Create New Task"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">{error}</div>}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="input-field"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="input-field resize-none"
              placeholder="Enter task description (optional)"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="input-field"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                id="dueDate"
                name="dueDate"
                className="input-field"
                value={formData.dueDate}
                onChange={handleChange}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal
