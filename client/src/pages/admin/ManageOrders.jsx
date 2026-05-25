import { useEffect, useState } from 'react'
import { getRestaurants } from '../../services/restaurantService.js'
import { getRestaurantOrders, updateOrderStatus } from '../../services/orderService.js'
import Loader from '../../components/Loader.jsx'

const STATUS_COLORS = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-orange-100 text-orange-700',
  READY: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
}

const NEXT_STATUS = {
  PENDING: 'CONFIRMED',
  CONFIRMED: 'PREPARING',
  PREPARING: 'READY',
  READY: 'DELIVERED',
}

export default function ManageOrders() {
  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getRestaurants().then(r => {
      setRestaurants(r.data)
      if (r.data.length > 0) {
        setSelectedRestaurant(r.data[0].id)
      }
    })
  }, [])

  useEffect(() => {
    if (!selectedRestaurant) return
    setLoading(true)
    getRestaurantOrders(selectedRestaurant)
      .then(r => setOrders(r.data))
      .finally(() => setLoading(false))
  }, [selectedRestaurant])

  const handleAdvance = async (orderId, currentStatus) => {
    const next = NEXT_STATUS[currentStatus]
    if (!next) return
    try {
      const { data } = await updateOrderStatus(orderId, next)
      setOrders(prev => prev.map(o => o.id === orderId ? data : o))
    } catch {
      alert('Failed to update order')
    }
  }

  const handleCancel = async (orderId) => {
    if (!window.confirm('Cancel this order?')) return
    try {
      const { data } = await updateOrderStatus(orderId, 'CANCELLED')
      setOrders(prev => prev.map(o => o.id === orderId ? data : o))
    } catch {
      alert('Failed to cancel order')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Orders</h1>

      {/* Restaurant selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Restaurant</label>
        <select
          value={selectedRestaurant || ''}
          onChange={e => setSelectedRestaurant(Number(e.target.value))}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
        >
          {restaurants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      </div>

      {loading ? <Loader /> : orders.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📦</p>
          <p>No orders for this restaurant</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-900">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[order.status] || ''}`}>
                  {order.status}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                {order.items?.map(i => (
                  <p key={i.menuItemId}>{i.menuItemName} × {i.quantity} — ${(i.price * i.quantity).toFixed(2)}</p>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-orange-500">Total: ${order.totalAmount?.toFixed(2)}</span>
                <div className="flex gap-2">
                  {NEXT_STATUS[order.status] && (
                    <button
                      onClick={() => handleAdvance(order.id, order.status)}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                    >
                      → {NEXT_STATUS[order.status]}
                    </button>
                  )}
                  {['PENDING', 'CONFIRMED', 'PREPARING'].includes(order.status) && (
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
