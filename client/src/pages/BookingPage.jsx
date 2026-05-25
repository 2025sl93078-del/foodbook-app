import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { CalendarCheck, Users, ChevronLeft } from 'lucide-react'
import { createBooking } from '../services/bookingService.js'
import { getRestaurant } from '../services/restaurantService.js'

export default function BookingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [restaurant, setRestaurant] = useState(null)
  const [form, setForm] = useState({
    date: '',
    time: '',
    guestCount: 2,
    specialRequests: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getRestaurant(id).then(r => setRestaurant(r.data)).catch(console.error)
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const bookingTime = `${form.date}T${form.time}:00`

    try {
      await createBooking({
        restaurantId: Number(id),
        bookingTime,
        guestCount: form.guestCount,
        specialRequests: form.specialRequests || null,
      })
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500 mb-6">
          Your table at <strong>{restaurant?.name}</strong> has been booked successfully.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/orders?tab=bookings"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors">
            View My Bookings
          </Link>
          <Link to="/restaurants"
            className="border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium transition-colors">
            Browse More
          </Link>
        </div>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <Link to={`/restaurants/${id}`} className="flex items-center gap-1 text-gray-500 hover:text-orange-500 mb-6 text-sm">
        <ChevronLeft size={16} />
        Back to restaurant
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
            <CalendarCheck size={20} className="text-orange-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Book a Table</h1>
            {restaurant && <p className="text-sm text-gray-500">{restaurant.name}</p>}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              min={today}
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Users size={14} className="inline mr-1" />
              Number of Guests
            </label>
            <select
              value={form.guestCount}
              onChange={e => setForm({ ...form, guestCount: Number(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Requests <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={form.specialRequests}
              onChange={e => setForm({ ...form, specialRequests: e.target.value })}
              rows={3}
              placeholder="Allergies, dietary requirements, special occasion..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
          >
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  )
}
