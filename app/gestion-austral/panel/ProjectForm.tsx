'use client'

import { useState } from 'react'
import { Project, ProjectCategory, ProjectStatus, categoryLabels } from '@/types/project'
import { createProject, updateProject, uploadImage } from './actions'
import { formatNumber } from '@/lib/utils'

interface ProjectFormProps {
  project?: Project
  onSuccess: () => void
  onCancel: () => void
}

export default function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    category: project?.category || 'galpones' as ProjectCategory,
    status: project?.status || 'Publicado' as ProjectStatus,
    location: project?.location || '',
    image: project?.image || '',
    year: project?.year || new Date().getFullYear(),
    area: project?.area || '',
    client: project?.client || '',
    highlights: project?.highlights?.join(', ') || '',
  })
  const [isUploading, setIsUploading] = useState(false)
  const [gallery, setGallery] = useState<string[]>(project?.images || [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const projectData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      status: formData.status,
      location: formData.location,
      image: formData.image,
      images: gallery,
      year: formData.year,
      area: formData.area,
      client: formData.client,
      highlights: formData.highlights.split(',').map(h => h.trim()).filter(h => h),
    }

    const result = project
      ? await updateProject(project.id, projectData as any)
      : await createProject(projectData as any)

    if (result.success) {
      onSuccess()
    } else {
      console.error('Error saving project:', result.error)
      alert('Error saving project: ' + (result.error || 'Unknown error'))
      setLoading(false)
    }
  }

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new (window as any).Image()
        img.src = event.target?.result
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const MAX_WIDTH = 1200
          let width = img.width
          let height = img.height

          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(new File([blob], file.name, { type: 'image/jpeg' }))
              } else {
                resolve(file)
              }
            },
            'image/jpeg',
            0.5
          )
        }
      }
    })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    if (!formData.title) {
      alert('Por favor ingresa un título primero para crear la carpeta')
      return
    }

    setIsUploading(true)
    const newImages = [...gallery]

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const compressedFile = await compressImage(file)

      const uploadData = new FormData()
      uploadData.append('file', compressedFile)
      const result = await uploadImage(uploadData, formData.title) as { success: boolean, public_id?: string, error?: string }
      if (result.success && result.public_id) {
        newImages.push(result.public_id)
        if (!formData.image) {
          setFormData(prev => ({ ...prev, image: result.public_id! }))
        }
      }
    }

    setGallery(newImages)
    setIsUploading(false)
  }

  const removeFromGallery = (publicId: string) => {
    const newGallery = gallery.filter(id => id !== publicId)
    setGallery(newGallery)
    if (formData.image === publicId) {
      setFormData({ ...formData, image: newGallery[0] || '' })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-10 border border-slate-200">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900">{project ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-black">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 px-1 text-slate-700">Título</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-600 transition-all outline-none border text-slate-900 placeholder:text-slate-400"
                placeholder="Ej: Galpón Industrial Puerto Montt"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2 px-1 text-slate-700">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:border-blue-600 outline-none border text-slate-900"
                >
                  <option value="galpones">Galpones</option>
                  <option value="radieres">Radieres</option>
                  <option value="otros">Otros</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 px-1 text-slate-700">Estado</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:border-blue-600 outline-none border text-slate-900"
                >
                  <option value="Publicado">Publicado</option>
                  <option value="Borrador">Borrador</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2 px-1 text-slate-700">Año</label>
                <input
                  type="number"
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-600 transition-all outline-none border text-slate-900"
                  placeholder="2024"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 px-1 text-slate-700">Área (m²)</label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-600 transition-all outline-none border text-slate-900 placeholder:text-slate-400"
                  placeholder="Ej: 5,000 m²"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 px-1 text-slate-700">Ubicación</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-600 transition-all outline-none border text-slate-900 placeholder:text-slate-400"
                placeholder="Ej: Puerto Montt, Región de Los Lagos"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 px-1 text-slate-700">Cliente</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-600 transition-all outline-none border text-slate-900 placeholder:text-slate-400"
                placeholder="Ej: Aceros del Sur S.A."
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2 px-1">
                <div>
                  <label className="block text-sm font-bold text-slate-700">Fotos del Proyecto</label>
                  <p className="text-xs text-slate-500 mt-0.5">Haz clic en una foto para seleccionarla como principal</p>
                </div>
                <label className={`text-xs font-bold cursor-pointer transition-all ${isUploading ? 'text-slate-400' : 'text-blue-600 hover:text-blue-800'
                  }`}>
                  {isUploading ? 'Subiendo...' : '+ Subir Fotos'}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>

              <div className="relative grid grid-cols-3 gap-2 min-h-[150px] max-h-[300px] overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200">
                {isUploading && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center animate-in fade-in duration-300">
                    <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Subiendo...</p>
                  </div>
                )}
                {gallery.length > 0 ? (
                  gallery.map((publicId) => (
                    <div key={publicId} className="relative group aspect-square">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: publicId })}
                        className={`relative w-full h-full rounded-lg overflow-hidden border-3 transition-all ${formData.image === publicId
                          ? 'border-blue-600 ring-2 ring-blue-600/30'
                          : 'border-transparent hover:border-slate-300'
                          }`}
                      >
                        <img
                          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_200,h_200,g_auto,q_auto,f_auto/${publicId}`}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                        {formData.image === publicId && (
                          <div className="absolute inset-x-0 bottom-0 bg-blue-600 text-white text-[10px] font-bold py-1 text-center uppercase tracking-wide">
                            ✓ Principal
                          </div>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromGallery(publicId)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                      >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
                    <p className="text-slate-400 text-sm italic">Sube las fotos del proyecto</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 px-1 text-slate-700">Highlights (separados por coma)</label>
              <input
                type="text"
                value={formData.highlights}
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-600 transition-all outline-none border text-slate-900 placeholder:text-slate-400"
                placeholder="Ej: 14m Altura, Pisos Super Planos, ISO 9001"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 px-1 text-slate-700">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-600 transition-all outline-none border h-28 resize-none text-slate-900 placeholder:text-slate-400"
                placeholder="Descripción detallada del proyecto..."
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || !formData.image}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl font-black shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50"
          >
            {loading ? 'Guardando...' : project ? 'Actualizar Proyecto' : 'Crear Proyecto'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
