import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminRoute() {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  if (loading) return null
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />
}
