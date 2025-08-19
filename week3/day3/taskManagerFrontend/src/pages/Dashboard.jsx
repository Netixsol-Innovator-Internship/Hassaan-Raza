"use client"
import { useTask } from "../contexts/TaskContext"
import { useAuth } from "../contexts/AuthContext"
import { CheckSquare, Clock, AlertCircle, TrendingUp, Calendar, Activity } from "lucide-react"

const Dashboard = () => {
  const { stats, loading } = useTask()
  const { user } = useAuth()

  console.log("[v0] Dashboard render - loading:", loading, "stats:", stats, "user:", user?.name)

  const StatCard = ({ title, value, icon: Icon, color, description }) => (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
        <div className={`p-3 rounded-full ${color.replace("text-", "bg-").replace("-600", "-100")}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  )

  if (loading || !stats || !stats.data) {
    console.log("[v0] Dashboard showing loading state - loading:", loading, "stats:", stats)
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const statsData = stats.data
  const safeStats = {
    totalTasks: statsData?.total || 0,
    completedTasks: statsData?.completed || 0,
    pendingTasks: statsData?.pending || 0,
    overdueTasks: statsData?.overdue || 0,
    dueTodayTasks: statsData?.dueToday || 0,
    recentActivity: statsData?.recentTasks || 0,
    completionRate: statsData?.completionRate || 0,
    priorityBreakdown: statsData?.priorityStats || { high: 0, medium: 0, low: 0 },
  }

  console.log("[v0] Dashboard processed stats:", safeStats)

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-primary-100 mt-1">Here's an overview of your tasks and productivity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={safeStats.totalTasks}
          icon={CheckSquare}
          color="text-blue-600"
          description="All your tasks"
        />
        <StatCard
          title="Completed"
          value={safeStats.completedTasks}
          icon={CheckSquare}
          color="text-green-600"
          description={`${safeStats.completionRate}% completion rate`}
        />
        <StatCard
          title="Pending"
          value={safeStats.pendingTasks}
          icon={Clock}
          color="text-yellow-600"
          description="Tasks in progress"
        />
        <StatCard
          title="Overdue"
          value={safeStats.overdueTasks}
          icon={AlertCircle}
          color="text-red-600"
          description="Need attention"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Due Today"
          value={safeStats.dueTodayTasks}
          icon={Calendar}
          color="text-orange-600"
          description="Tasks due today"
        />
        <StatCard
          title="Recent Activity"
          value={safeStats.recentActivity}
          icon={Activity}
          color="text-purple-600"
          description="Created in last 7 days"
        />
        <StatCard
          title="Completion Rate"
          value={`${safeStats.completionRate}%`}
          icon={TrendingUp}
          color="text-indigo-600"
          description="Overall progress"
        />
      </div>

      {/* Priority Breakdown */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-red-800">High Priority</p>
              <p className="text-2xl font-bold text-red-600">{safeStats.priorityBreakdown.high}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-yellow-800">Medium Priority</p>
              <p className="text-2xl font-bold text-yellow-600">{safeStats.priorityBreakdown.medium}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-green-800">Low Priority</p>
              <p className="text-2xl font-bold text-green-600">{safeStats.priorityBreakdown.low}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckSquare className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => (window.location.href = "/tasks")} className="btn-primary">
            View All Tasks
          </button>
          <button onClick={() => (window.location.href = "/tasks?filter=pending")} className="btn-secondary">
            View Pending Tasks
          </button>

          <button
            onClick={() => (window.location.href = "/tasks?filter=overdue")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            View Overdue Tasks
          </button>
        </div>
      </div> */}
    </div>
  )
}

export default Dashboard
