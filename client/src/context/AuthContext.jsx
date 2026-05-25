import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored && token) {
      setUser(JSON.parse(stored))
    }
    setLoading(false)
  }, [token])

  const login = (authData) => {
    const userData = {
      id: authData.userId,
      name: authData.name,
      email: authData.email,
      role: authData.role,
    }
    setToken(authData.token)
    setUser(userData)
    localStorage.setItem('token', authData.token)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const isAdmin = user?.role === 'ADMIN'
  const isAuthenticated = !!token && !!user

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
