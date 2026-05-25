import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = useCallback((menuItem, restaurantId, restaurantName) => {
    setItems(prev => {
      // If cart has items from a different restaurant, clear first
      if (prev.length > 0 && prev[0].restaurantId !== restaurantId) {
        if (!window.confirm(`Your cart has items from "${prev[0].restaurantName}". Clear cart and add from "${restaurantName}"?`)) {
          return prev
        }
        return [{ ...menuItem, restaurantId, restaurantName, quantity: 1 }]
      }
      const existing = prev.find(i => i.id === menuItem.id)
      if (existing) {
        return prev.map(i => i.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...menuItem, restaurantId, restaurantName, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((menuItemId) => {
    setItems(prev => prev.filter(i => i.id !== menuItemId))
  }, [])

  const updateQuantity = useCallback((menuItemId, quantity) => {
    if (quantity < 1) {
      removeItem(menuItemId)
      return
    }
    setItems(prev => prev.map(i => i.id === menuItemId ? { ...i, quantity } : i))
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const restaurantId = items[0]?.restaurantId ?? null
  const restaurantName = items[0]?.restaurantName ?? null

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      total, itemCount, restaurantId, restaurantName
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
