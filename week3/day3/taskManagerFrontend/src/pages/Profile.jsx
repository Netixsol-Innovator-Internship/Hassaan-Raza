"use client"
import { useAuth } from "../contexts/AuthContext"
import { useTask } from "../contexts/TaskContext"
import { User, Mail, Calendar, CheckSquare, Clock, AlertCircle } from "lucide-react"
import { format } from "date-fns"

const Profile = () => {
  const { user, loading } = useAuth()
  const { stats } = useTask()

  const userData = user?.data || user
  const statsData = stats?.data || stats

  console.log("[v0] Profile user data:", userData)
  console.log("[v0] Profile loading state:", loading)
  console.log("[v0] Profile stats raw:", stats)
  console.log("[v0] Profile statsData processed:", statsData)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Unable to load user profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="card p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{userData?.name || userData?.username || "User"}</h1>
            <p className="text-gray-600 flex items-center mt-1">
              <Mail className="h-4 w-4 mr-2" />
              {userData?.email || "No email provided"}
            </p>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-2" />
              Member since {userData?.createdAt ? format(new Date(userData.createdAt), "MMMM yyyy") : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Stats */}
      {statsData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-blue-600">{statsData.total || 0}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{statsData.completed || 0}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-indigo-600">{statsData.completionRate || 0}%</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-sm">{statsData.completionRate || 0}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Information */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-600">Full Name</span>
            <span className="text-sm text-gray-900">{userData?.name || userData?.username || "Not provided"}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-600">Email Address</span>
            <span className="text-sm text-gray-900">{userData?.email || "Not provided"}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-600">Account Created</span>
            <span className="text-sm text-gray-900">
              {userData?.createdAt ? format(new Date(userData.createdAt), "MMMM dd, yyyy") : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-sm font-medium text-gray-600">Last Updated</span>
            <span className="text-sm text-gray-900">
              {userData?.updatedAt ? format(new Date(userData.updatedAt), "MMMM dd, yyyy") : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      {statsData && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <CheckSquare className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-800">Total Tasks</p>
              <p className="text-lg font-bold text-blue-600">{statsData.total || 0}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckSquare className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-800">Completed</p>
              <p className="text-lg font-bold text-green-600">{statsData.completed || 0}</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-yellow-800">Pending</p>
              <p className="text-lg font-bold text-yellow-600">{statsData.pending || 0}</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-red-800">Overdue</p>
              <p className="text-lg font-bold text-red-600">{statsData.overdue || 0}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
