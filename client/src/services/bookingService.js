import api from './api'

export const createBooking = (data) => api.post('/bookings', data)
export const getUserBookings = () => api.get('/bookings/user')
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`)
export const getRestaurantBookings = (restaurantId) => api.get(`/bookings/restaurant/${restaurantId}`)
