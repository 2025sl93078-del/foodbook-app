import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍽️</span>
              <span className="text-xl font-bold text-white">FoodBook</span>
            </div>
            <p className="text-sm">
              Discover the best restaurants, book a table, and order food — all in one place.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
              <li><Link to="/restaurants" className="hover:text-orange-400 transition-colors">Restaurants</Link></li>
              <li><Link to="/login" className="hover:text-orange-400 transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-orange-400 transition-colors">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/orders" className="hover:text-orange-400 transition-colors">My Orders</Link></li>
              <li><Link to="/profile" className="hover:text-orange-400 transition-colors">Profile</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} FoodBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
