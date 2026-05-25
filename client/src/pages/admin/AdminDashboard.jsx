import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRestaurants } from '../../services/restaurantService.js'
import { getRestaurantOrders } from '../../services/orderService.js'
import { LayoutDashboard, Store, ShoppingBag } from 'lucide-react'

export default function AdminDashboard() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRestaurants().then(r => setRestaurants(r.data)).finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard size={28} className="text-orange-500" />
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Store size={22} className="text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Restaurants</p>
              <p className="text-2xl font-bold text-gray-900">{restaurants.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nav cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/admin/restaurants"
          className="bg-white hover:bg-orange-50 rounded-2xl border border-gray-100 hover:border-orange-200 p-6 transition-colors group">
          <div className="flex items-center gap-3 mb-2">
            <Store size={22} className="text-orange-500" />
            <h3 className="font-bold text-gray-900 group-hover:text-orange-600">Manage Restaurants</h3>
          </div>
          <p className="text-sm text-gray-500">Add, edit, or delete restaurants and their menus</p>
        </Link>

        <Link to="/admin/orders"
          className="bg-white hover:bg-orange-50 rounded-2xl border border-gray-100 hover:border-orange-200 p-6 transition-colors group">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag size={22} className="text-orange-500" />
            <h3 className="font-bold text-gray-900 group-hover:text-orange-600">Manage Orders</h3>
          </div>
          <p className="text-sm text-gray-500">View all orders and update their status</p>
        </Link>
      </div>

      {/* Restaurant list preview */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Restaurants</h2>
        {loading ? null : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Name</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Cuisine</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Rating</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map(r => (
                  <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-900">{r.name}</td>
                    <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{r.cuisine}</td>
                    <td className="px-5 py-3 text-gray-500 hidden md:table-cell">⭐ {r.rating}</td>
                    <td className="px-5 py-3">
                      <Link to={`/restaurants/${r.id}`}
                        className="text-orange-500 hover:text-orange-700 text-xs font-medium">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
