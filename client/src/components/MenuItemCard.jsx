import { Plus, Minus, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function MenuItemCard({ item, restaurantId, restaurantName }) {
  const { items, addItem, removeItem, updateQuantity } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const cartItem = items.find(i => i.id === item.id)
  const qty = cartItem?.quantity ?? 0

  const handleAdd = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    addItem(item, restaurantId, restaurantName)
  }

  return (
    <div className="flex gap-4 bg-white rounded-xl p-4 border border-gray-100 hover:border-orange-200 transition-colors">
      <img
        src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop'}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg shrink-0 bg-gray-100"
        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop'; e.target.onerror = null }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-semibold text-gray-900">{item.name}</h4>
            {item.description && (
              <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
            )}
            <p className="text-orange-500 font-bold mt-2">${item.price?.toFixed(2)}</p>
          </div>
          <div className="shrink-0">
            {qty === 0 ? (
              <button
                onClick={handleAdd}
                className="w-9 h-9 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center transition-colors"
              >
                <Plus size={18} />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, qty - 1)}
                  className="w-8 h-8 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center font-bold text-gray-800">{qty}</span>
                <button
                  onClick={() => addItem(item, restaurantId, restaurantName)}
                  className="w-8 h-8 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
        {!item.isAvailable && (
          <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
            Unavailable
          </span>
        )}
      </div>
    </div>
  )
}
