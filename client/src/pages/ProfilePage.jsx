import { useAuth } from '../context/AuthContext.jsx'
import { User, Mail, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
            <User size={28} className="text-orange-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <Mail size={18} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-700">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <Shield size={18} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Role</p>
              <p className="text-sm font-medium text-gray-700 capitalize">{user?.role?.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link to="/orders"
          className="bg-orange-50 hover:bg-orange-100 text-orange-700 font-medium text-center py-4 rounded-xl transition-colors">
          📦 My Orders
        </Link>
        <Link to="/orders?tab=bookings"
          className="bg-orange-50 hover:bg-orange-100 text-orange-700 font-medium text-center py-4 rounded-xl transition-colors">
          📅 My Bookings
        </Link>
      </div>
    </div>
  )
}
