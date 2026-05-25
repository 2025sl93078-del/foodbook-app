import { useEffect, useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { getRestaurants } from '../services/restaurantService.js'
import RestaurantCard from '../components/RestaurantCard.jsx'
import Loader from '../components/Loader.jsx'

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([])
  const [allRestaurants, setAllRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('All')

  useEffect(() => {
    getRestaurants().then(({ data }) => {
      setAllRestaurants(data)
      setRestaurants(data)
    }).finally(() => setLoading(false))
  }, [])

  const cuisines = useMemo(() => {
    const unique = [...new Set(allRestaurants.map(r => r.cuisine).filter(Boolean))].sort()
    return ['All', ...unique]
  }, [allRestaurants])

  const fetchRestaurants = async (query) => {
    setLoading(true)
    try {
      const { data } = await getRestaurants(query)
      setRestaurants(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchRestaurants(search || undefined)
  }

  const filtered = cuisine === 'All'
    ? restaurants
    : restaurants.filter(r => r.cuisine === cuisine)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Restaurants</h1>
      <p className="text-gray-500 mb-6">Discover and order from the best places near you</p>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-xl">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or cuisine..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
          />
        </div>
        <button type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-medium transition-colors">
          Search
        </button>
      </form>

      {/* Cuisine filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {cuisines.map(c => (
          <button
            key={c}
            onClick={() => setCuisine(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              cuisine === c
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">🍽️</p>
          <p className="text-lg">No restaurants found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>
      )}
    </div>
  )
}
