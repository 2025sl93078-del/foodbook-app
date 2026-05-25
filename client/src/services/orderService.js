import api from './api'

export const createOrder = (data) => api.post('/orders', data)
export const getUserOrders = () => api.get('/orders/user')
export const getRestaurantOrders = (restaurantId) => api.get(`/orders/restaurant/${restaurantId}`)
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status })
