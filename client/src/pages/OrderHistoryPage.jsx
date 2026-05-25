import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { getUserOrders } from '../services/orderService.js'
import { getUserBookings, cancelBooking } from '../services/bookingService.js'
import Loader from '../components/Loader.jsx'
import { Package, CalendarCheck } from 'lucide-react'

const STATUS_COLORS = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-orange-100 text-orange-700',
  READY: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
}

const BOOKING_STATUS_COLORS = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
}

export default function OrderHistoryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = searchParams.get('tab') === 'bookings' ? 'bookings' : 'orders'
  const [orders, setOrders] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const [ordRes, bokRes] = await Promise.all([getUserOrders(), getUserBookings()])
        setOrders(ordRes.data)
        setBookings(bokRes.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return
    try {
      await cancelBooking(id)
      setBookings(b => b.map(bk => bk.id === id ? { ...bk, status: 'CANCELLED' } : bk))
    } catch (e) {
      alert('Failed to cancel booking')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Activity</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
        <button
          onClick={() => setSearchParams({})}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === 'orders' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Package size={16} />
          Orders
        </button>
        <button
          onClick={() => setSearchParams({ tab: 'bookings' })}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === 'bookings' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <CalendarCheck size={16} />
          Bookings
        </button>
      </div>

      {loading ? <Loader /> : tab === 'orders' ? (
        orders.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Package size={40} className="mx-auto mb-3 text-gray-300" />
            <p>No orders yet</p>
            <Link to="/restaurants" className="text-orange-500 text-sm mt-2 inline-block hover:underline">
              Browse restaurants
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{order.restaurantName}</p>
                    <p className="text-sm text-gray-500">
                      Order #{order.id} · {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[order.status] || ''}`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {order.items?.map(i => (
                    <span key={i.menuItemId} className="mr-3">
                      {i.menuItemName} × {i.quantity}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                  <span className="text-sm text-gray-500">{order.items?.length} item(s)</span>
                  <span className="font-bold text-orange-500">${order.totalAmount?.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        bookings.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <CalendarCheck size={40} className="mx-auto mb-3 text-gray-300" />
            <p>No bookings yet</p>
            <Link to="/restaurants" className="text-orange-500 text-sm mt-2 inline-block hover:underline">
              Book a table
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-gray-900">{booking.restaurantName}</p>
                    <p className="text-sm text-gray-500">{booking.restaurantLocation}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${BOOKING_STATUS_COLORS[booking.status] || ''}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  <p>📅 {new Date(booking.bookingTime).toLocaleString()}</p>
                  <p>👥 {booking.guestCount} guest(s)</p>
                  {booking.specialRequests && <p className="text-gray-400">📝 {booking.specialRequests}</p>}
                </div>
                {booking.status === 'CONFIRMED' && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    Cancel booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}
