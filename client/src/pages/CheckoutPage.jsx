import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { createOrder } from '../services/orderService.js'

export default function CheckoutPage() {
  const { items, total, restaurantId, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [orderId, setOrderId] = useState(null)

  if (items.length === 0 && !success) {
    navigate('/cart')
    return null
  }

  const handlePlaceOrder = async () => {
    setError('')
    setLoading(true)
    try {
      const payload = {
        restaurantId,
        items: items.map(i => ({ menuItemId: i.id, quantity: i.quantity })),
      }
      const { data } = await createOrder(payload)
      setOrderId(data.id)
      clearCart()
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <CheckCircle size={56} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-2">Order #{orderId} has been received.</p>
        <p className="text-gray-400 text-sm mb-8">We'll prepare your food right away.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/orders"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors">
            Track Orders
          </Link>
          <Link to="/restaurants"
            className="border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium transition-colors">
            Order Again
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      {/* Order items */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
        {items.map(item => (
          <div key={item.id} className="flex justify-between text-sm py-1.5">
            <span className="text-gray-700">{item.name} × {item.quantity}</span>
            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t border-gray-100 mt-3 pt-3">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Service fee</span>
            <span>$2.00</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-lg">
            <span>Total</span>
            <span className="text-orange-500">${(total + 2).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment placeholder */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Payment</h3>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500 text-center">
          💳 Payment integration coming soon — orders are confirmed instantly
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-4 rounded-2xl text-lg transition-colors"
      >
        {loading ? 'Placing Order...' : `Place Order · $${(total + 2).toFixed(2)}`}
      </button>
    </div>
  )
}
