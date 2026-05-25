import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useState } from 'react'

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <span className="text-xl font-bold text-orange-500">FoodBook</span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/restaurants" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
              Restaurants
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-600 hover:text-orange-500 font-medium transition-colors flex items-center gap-1">
                <LayoutDashboard size={16} />
                Admin
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors">
                <ShoppingCart size={22} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors"
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <User size={16} className="text-orange-600" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">{user?.name}</span>
                  <ChevronDown size={16} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    <Link to="/profile" onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                      My Profile
                    </Link>
                    <Link to="/orders" onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                      My Orders
                    </Link>
                    <Link to="/orders?tab=bookings" onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                      My Bookings
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">
                        Admin Dashboard
                      </Link>
                    )}
                    <hr className="my-1 border-gray-100" />
                    <button onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login"
                  className="text-gray-600 hover:text-orange-500 font-medium text-sm transition-colors">
                  Login
                </Link>
                <Link to="/register"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
