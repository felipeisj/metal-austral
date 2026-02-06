'use client'

import { useState } from 'react'
import { createClient, updateClient, uploadImage } from './actions'
import { Client } from '@/types/client'
import { getCloudinaryUrl } from '@/lib/cloudinary-helper'

interface ClientFormProps {
  client?: Client
  onSuccess: () => void
  onCancel: () => void
}

export default function ClientForm({ client, onSuccess, onCancel }: ClientFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(
    client?.logo ? getCloudinaryUrl(client.logo, 'thumbnail') : null
  )
  const [formData, setFormData] = useState({
    name: client?.name || '',
    description: client?.description || '',
    year: client?.year || '',
    order: client?.order || 0,
    logo: client?.logo || ''
  })

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview
    const reader = new FileReader()
    reader.onloadend = () => setLogoPreview(reader.result as string)
    reader.readAsDataURL(file)

    // Upload
    setLoading(true)
    const fd = new FormData()
    fd.append('file', file)
    const result = await uploadImage(fd, `clients/${formData.name || 'logo'}`)
    if (result.success && 'public_id' in result && result.public_id) {
      setFormData({ ...formData, logo: result.public_id })
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const clientData = {
        name: formData.name,
        description: formData.description,
        year: formData.year,
        order: formData.order,
        logo: formData.logo || undefined
      }

      console.log('Submitting client data:', clientData)

      let result
      if (client?.id) {
        result = await updateClient(client.id, clientData)
      } else {
        result = await createClient({
          ...clientData,
          company_id: '' // Server action will override this
        })
      }

      console.log('Server response:', result)

      if (result.success) {
        onSuccess()
      } else {
        setError(result.error || 'Error desconocido al guardar')
      }
    } catch (err) {
      console.error('Error saving client:', err)
      setError('Error de conexión al guardar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">
              {client ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Logo (Opcional)
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center border-2 border-dashed border-slate-200">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Preview" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-3xl font-black text-slate-300">
                      {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
                    </span>
                  )}
                </div>
                <label className="cursor-pointer px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors">
                  Subir Logo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Nombre de la Empresa *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
                placeholder="Ej: Zerocorp SpA"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Año del Proyecto *
              </label>
              <input
                type="text"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
                placeholder="Ej: 2024 - 2025"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Descripción del Proyecto *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 resize-none"
                placeholder="Ej: Fabricación y montaje de galpón metálico de 500 m²"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Orden en Carousel
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
                placeholder="0"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Guardando...' : client ? 'Actualizar' : 'Crear Cliente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
