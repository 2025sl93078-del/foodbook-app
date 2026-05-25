import { useCart } from '../context/CartContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart, restaurantName } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add items from a restaurant to get started</p>
        <Link to="/restaurants"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors">
          Browse Restaurants
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 transition-colors">
          Clear cart
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
        <div className="px-4 py-3 bg-orange-50 border-b border-orange-100">
          <p className="text-sm font-medium text-orange-700">
            From: <span className="font-bold">{restaurantName}</span>
          </p>
        </div>

        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4 px-4 py-4 border-b border-gray-50 last:border-0">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.name}
                className="w-16 h-16 object-cover rounded-lg shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900">{item.name}</p>
              <p className="text-orange-500 font-bold">${item.price?.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
              >
                <Minus size={12} />
              </button>
              <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
              >
                <Plus size={12} />
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="w-7 h-7 text-red-400 hover:text-red-600 flex items-center justify-center ml-1 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <div className="flex justify-between text-gray-600 mb-2">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 mb-3">
          <span>Service fee</span>
          <span>$2.00</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-gray-900 border-t border-gray-100 pt-3">
          <span>Total</span>
          <span className="text-orange-500">${(total + 2).toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={() => navigate('/checkout')}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl text-lg transition-colors"
      >
        Proceed to Checkout
      </button>
    </div>
  )
}
