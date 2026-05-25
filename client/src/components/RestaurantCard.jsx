import { Link } from 'react-router-dom'
import { MapPin, Star, Clock } from 'lucide-react'

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurants/${restaurant.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
        <div className="relative h-48 overflow-hidden">
          <img
            src={restaurant.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop'}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop'; e.target.onerror = null }}
          />
          <div className="absolute top-3 right-3 bg-white rounded-lg px-2 py-1 flex items-center gap-1 shadow-sm">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold">{restaurant.rating?.toFixed(1) ?? '—'}</span>
          </div>
          {restaurant.priceRange && (
            <div className="absolute top-3 left-3 bg-white rounded-lg px-2 py-1 shadow-sm">
              <span className="text-sm font-medium text-gray-700">{restaurant.priceRange}</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-orange-500 transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-sm text-orange-500 font-medium mb-2">{restaurant.cuisine}</p>
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
            <MapPin size={14} className="shrink-0" />
            <span className="truncate">{restaurant.location}</span>
          </div>
          {restaurant.openingHours && (
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Clock size={12} />
              <span>{restaurant.openingHours}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
