import api from './api'

export const getRestaurants = (search) =>
  api.get('/restaurants', { params: search ? { search } : {} })

export const getRestaurant = (id) => api.get(`/restaurants/${id}`)

export const createRestaurant = (data) => api.post('/restaurants', data)
export const updateRestaurant = (id, data) => api.put(`/restaurants/${id}`, data)
export const deleteRestaurant = (id) => api.delete(`/restaurants/${id}`)

export const getMenu = (restaurantId) => api.get(`/restaurants/${restaurantId}/menu`)
export const createMenuItem = (restaurantId, data) => api.post(`/restaurants/${restaurantId}/menu`, data)
export const updateMenuItem = (restaurantId, itemId, data) => api.put(`/restaurants/${restaurantId}/menu/${itemId}`, data)
export const deleteMenuItem = (restaurantId, itemId) => api.delete(`/restaurants/${restaurantId}/menu/${itemId}`)
