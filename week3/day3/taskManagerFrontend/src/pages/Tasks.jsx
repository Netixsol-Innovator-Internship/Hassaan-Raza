"use client"

import { useState, useEffect } from "react"
import { useTask } from "../contexts/TaskContext"
import { Plus, Search, Edit2, Trash2, Calendar, AlertCircle, CheckCircle2 } from "lucide-react"
import { format, isAfter, isToday } from "date-fns"
import TaskModal from "../components/TaskModal"

const Tasks = () => {
  const { tasks, loading, fetchTasks, deleteTask, toggleTaskComplete } = useTask()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filters, setFilters] = useState({
    search: "",
    completed: "",
    priority: "",
    page: 1,
    limit: 10,
  })

  useEffect(() => {
    fetchTasks(filters)
  }, [filters])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page when filtering
    }))
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId)
    }
  }

  const handleToggleComplete = async (taskId, completed) => {
    await toggleTaskComplete(taskId, !completed)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTask(null)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const isOverdue = (dueDate) => {
    if (!dueDate) return false
    return isAfter(new Date(), new Date(dueDate))
  }

  const TaskCard = ({ task }) => (
    <div className={`card p-4 ${task.completed ? "opacity-75" : ""}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => handleToggleComplete(task._id, task.completed)}
            className={`mt-1 p-1 rounded-full transition-colors ${
              task.completed ? "text-green-600 hover:text-green-700" : "text-gray-400 hover:text-green-600"
            }`}
          >
            {task.completed ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <div className="h-5 w-5 border-2 border-gray-300 rounded-full hover:border-green-600"></div>
            )}
          </button>
          <div className="flex-1">
            <h3 className={`font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
              {task.title}
            </h3>
            {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
            <div className="flex items-center space-x-4 mt-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}
              >
                {task.priority}
              </span>
              {task.dueDate && (
                <div
                  className={`flex items-center text-xs ${
                    isOverdue(task.dueDate) && !task.completed
                      ? "text-red-600"
                      : isToday(new Date(task.dueDate))
                        ? "text-orange-600"
                        : "text-gray-500"
                  }`}
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  {format(new Date(task.dueDate), "MMM dd, yyyy")}
                  {isOverdue(task.dueDate) && !task.completed && <AlertCircle className="h-3 w-3 ml-1" />}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEditTask(task)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteTask(task._id)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="input-field pl-10"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          <select
            className="input-field"
            value={filters.completed}
            onChange={(e) => handleFilterChange("completed", e.target.value)}
          >
            <option value="">All Tasks</option>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
          <select
            className="input-field"
            value={filters.priority}
            onChange={(e) => handleFilterChange("priority", e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <select
            className="input-field"
            value={filters.limit}
            onChange={(e) => handleFilterChange("limit", Number.parseInt(e.target.value))}
          >
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first task.</p>
          <div className="mt-6">
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks
            .filter((task) => task && task._id)
            .map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
        </div>
      )}

      {/* Task Modal */}
      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} task={editingTask} />
    </div>
  )
}

export default Tasks
