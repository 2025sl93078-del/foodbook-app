import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, Star, Clock, Phone, CalendarCheck, ShoppingBag } from 'lucide-react'
import { getRestaurant, getMenu } from '../services/restaurantService.js'
import MenuItemCard from '../components/MenuItemCard.jsx'
import Loader from '../components/Loader.jsx'
import { useCart } from '../context/CartContext.jsx'

const CATEGORY_ORDER = ['Starters', 'Pizza', 'Pasta', 'Mains', 'Rice', 'Bread', 'Rolls', 'Nigiri', 'Ramen', 'Noodles', 'Curries', 'Burgers', 'Sandwiches', 'Tacos', 'Burritos', 'Quesadillas', 'Dim Sum', 'Rice & Noodles', 'Sides', 'Drinks', 'Dessert']
const FOOD_FALLBACK = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop'
const RESTAURANT_FALLBACK = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop'

export default function RestaurantDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [restaurant, setRestaurant] = useState(null)
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const { itemCount, restaurantId } = useCart()

  useEffect(() => {
    const load = async () => {
      try {
        const [rRes, mRes] = await Promise.all([getRestaurant(id), getMenu(id)])
        setRestaurant(rRes.data)
        setMenu(mRes.data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <Loader />
  if (!restaurant) return <div className="text-center py-16 text-gray-400">Restaurant not found</div>

  const categories = [...new Set(menu.map(i => i.category))].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a)
    const bi = CATEGORY_ORDER.indexOf(b)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })

  const filteredMenu = activeCategory === 'All' ? menu : menu.filter(i => i.category === activeCategory)

  const showCartBar = itemCount > 0 && restaurantId === Number(id)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner */}
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
        <img
          src={restaurant.imageUrl || RESTAURANT_FALLBACK}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={e => { e.target.src = RESTAURANT_FALLBACK; e.target.onerror = null }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <p className="text-orange-300 font-medium">{restaurant.cuisine}</p>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{restaurant.rating?.toFixed(1)} rating</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-orange-500" />
              <span>{restaurant.location}</span>
            </div>
            {restaurant.openingHours && (
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-green-500" />
                <span>{restaurant.openingHours}</span>
              </div>
            )}
            {restaurant.phoneNumber && (
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-blue-500" />
                <span>{restaurant.phoneNumber}</span>
              </div>
            )}
          </div>
          {restaurant.description && (
            <p className="text-gray-500 text-sm mt-3">{restaurant.description}</p>
          )}
        </div>
        <div className="bg-orange-50 rounded-2xl p-5 flex flex-col justify-center gap-3">
          <Link
            to={`/restaurants/${id}/book`}
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            <CalendarCheck size={18} />
            Book a Table
          </Link>
          <p className="text-center text-xs text-gray-500">
            Or order below and add items to your cart
          </p>
        </div>
      </div>

      {/* Menu */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu</h2>

      {/* Category tabs */}
      {categories.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-6">
          {['All', ...categories].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMenu.map(item => (
          <MenuItemCard
            key={item.id}
            item={item}
            restaurantId={Number(id)}
            restaurantName={restaurant.name}
          />
        ))}
      </div>

      {/* Floating cart bar */}
      {showCartBar && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-orange-300 transition-colors"
          >
            <ShoppingBag size={20} />
            View Cart ({itemCount} items)
          </button>
        </div>
      )}
    </div>
  )
}
