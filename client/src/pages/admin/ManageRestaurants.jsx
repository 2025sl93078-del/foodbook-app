import { useEffect, useState } from 'react'
import { getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } from '../../services/restaurantService.js'
import { Plus, Edit2, Trash2, X } from 'lucide-react'
import Loader from '../../components/Loader.jsx'

const emptyForm = { name: '', location: '', description: '', cuisine: '', rating: '', priceRange: '', openingHours: '', phoneNumber: '', imageUrl: '' }

export default function ManageRestaurants() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { load() }, [])

  const load = () => {
    setLoading(true)
    getRestaurants().then(r => setRestaurants(r.data)).finally(() => setLoading(false))
  }

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowForm(true); setError('') }
  const openEdit = (r) => {
    setForm({ ...r, rating: r.rating ?? '' })
    setEditing(r.id)
    setShowForm(true)
    setError('')
  }
  const closeForm = () => { setShowForm(false); setEditing(null) }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = { ...form, rating: form.rating ? Number(form.rating) : null }
      if (editing) {
        await updateRestaurant(editing, payload)
      } else {
        await createRestaurant(payload)
      }
      closeForm()
      load()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return
    try {
      await deleteRestaurant(id)
      setRestaurants(prev => prev.filter(r => r.id !== id))
    } catch {
      alert('Failed to delete restaurant')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Restaurants</h1>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium transition-colors">
          <Plus size={18} />
          Add Restaurant
        </button>
      </div>

      {loading ? <Loader /> : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Name</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Cuisine</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Location</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map(r => (
                <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{r.name}</td>
                  <td className="px-5 py-3 text-gray-500 hidden md:table-cell">{r.cuisine}</td>
                  <td className="px-5 py-3 text-gray-500 hidden md:table-cell truncate max-w-48">{r.location}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(r)}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => handleDelete(r.id, r.name)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                {editing ? 'Edit Restaurant' : 'Add Restaurant'}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">{error}</div>
            )}
            <form onSubmit={handleSave} className="space-y-3">
              {[
                { key: 'name', label: 'Name', required: true },
                { key: 'location', label: 'Location', required: true },
                { key: 'cuisine', label: 'Cuisine' },
                { key: 'priceRange', label: 'Price Range (e.g. $, $$, $$$)' },
                { key: 'rating', label: 'Rating (0–5)', type: 'number', step: '0.1', min: '0', max: '5' },
                { key: 'openingHours', label: 'Opening Hours' },
                { key: 'phoneNumber', label: 'Phone Number' },
                { key: 'imageUrl', label: 'Image URL' },
              ].map(({ key, label, required, ...rest }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type="text"
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                    required={required}
                    {...rest}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm}
                  className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-medium transition-colors disabled:opacity-60">
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
