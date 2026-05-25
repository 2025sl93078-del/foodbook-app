import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'

import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import RestaurantsPage from './pages/RestaurantsPage.jsx'
import RestaurantDetailsPage from './pages/RestaurantDetailsPage.jsx'
import BookingPage from './pages/BookingPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrderHistoryPage from './pages/OrderHistoryPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import ManageRestaurants from './pages/admin/ManageRestaurants.jsx'
import ManageOrders from './pages/admin/ManageOrders.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/restaurants/:id/book" element={<BookingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/restaurants" element={<ManageRestaurants />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
        </Route>
      </Route>
    </Routes>
  )
}
