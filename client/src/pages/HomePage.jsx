import { Link } from 'react-router-dom'
import { ArrowRight, Utensils, CalendarCheck, ShoppingBag } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Discover & Book the
            <span className="text-orange-500"> Best Restaurants</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Browse top restaurants, view menus, book tables, and order food — all from one place.
          </p>
          <Link
            to="/restaurants"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-colors shadow-lg shadow-orange-200"
          >
            Explore Restaurants
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-orange-50">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Utensils size={28} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Browse Menus</h3>
              <p className="text-gray-600">Explore curated menus from top restaurants in your area.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-orange-50">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CalendarCheck size={28} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Book a Table</h3>
              <p className="text-gray-600">Reserve a table for any date and time that suits you.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-orange-50">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={28} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Order Online</h3>
              <p className="text-gray-600">Add items to your cart and place an order in seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-8">Create your free account and start exploring today.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/register"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              Create Account
            </Link>
            <Link to="/restaurants"
              className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-medium px-6 py-3 rounded-xl transition-colors">
              Browse Restaurants
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
