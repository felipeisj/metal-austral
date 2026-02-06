'use client'

import { useEffect, useState, useCallback } from 'react'
import { deleteProject, deleteClient } from './actions'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Project, categoryLabels, categoryIcons } from '@/types/project'
import { Client } from '@/types/client'
import ProjectForm from './ProjectForm'
import ClientForm from './ClientForm'
import { getCloudinaryUrl } from '@/lib/cloudinary-helper'

type Tab = 'projects' | 'clients'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [user, setUser] = useState<any>(null)
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false)
  const [isClientFormOpen, setIsClientFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | undefined>()
  const [editingClient, setEditingClient] = useState<Client | undefined>()
  const router = useRouter()

  const fetchProjects = useCallback(async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID)
      .order('created_at', { ascending: false })

    if (data) setProjects(data)
  }, [])

  const fetchClients = useCallback(async () => {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .eq('company_id', process.env.NEXT_PUBLIC_COMPANY_ID)
      .order('order', { ascending: true })

    if (data) setClients(data)
  }, [])

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/gestion-austral')
      } else {
        setUser(user)
        fetchProjects()
        fetchClients()
      }
    }
    checkUser()
  }, [router, fetchProjects, fetchClients])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleDeleteProject = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      const result = await deleteProject(id)
      if (result.success) {
        fetchProjects()
      }
    }
  }

  const handleDeleteClient = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      const result = await deleteClient(id)
      if (result.success) {
        fetchClients()
      }
    }
  }

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-400">Cargando...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 font-medium">Gestión de proyectos y clientes Metal Austral</p>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
              Volver al sitio
            </Link>
            <Link href="/proyectos" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Ver Proyectos
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-black hover:bg-slate-900 hover:text-white transition-all"
            >
              Salir
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'projects'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
          >
            📁 Proyectos ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'clients'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
          >
            🏢 Clientes ({clients.length})
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900 leading-tight">Proyectos</h2>
              <button
                onClick={() => {
                  setEditingProject(undefined)
                  setIsProjectFormOpen(true)
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-black hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg active:scale-95 shadow-blue-200"
              >
                Nuevo Proyecto
              </button>
            </div>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-slate-400 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden shrink-0">
                        <img
                          src={getCloudinaryUrl(proj.image, 'adminThumb')}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{categoryIcons[proj.category]}</span>
                          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{categoryLabels[proj.category]}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${proj.status === 'Publicado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {proj.status}
                          </span>
                        </div>
                        <h4 className="font-black text-slate-900">{proj.title}</h4>
                        <p className="text-sm text-slate-500 font-medium">{proj.location} • {proj.year}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(proj)
                          setIsProjectFormOpen(true)
                        }}
                        className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-lg transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-lg transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                No hay proyectos registrados aún. ¡Crea el primero!
              </p>
            )}
          </section>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900 leading-tight">Clientes Destacados</h2>
              <button
                onClick={() => {
                  setEditingClient(undefined)
                  setIsClientFormOpen(true)
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-black hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg active:scale-95 shadow-blue-200"
              >
                Nuevo Cliente
              </button>
            </div>

            {clients.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {clients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-slate-400 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl overflow-hidden shrink-0">
                        {client.logo ? (
                          <img
                            src={getCloudinaryUrl(client.logo, 'thumbnail')}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          client.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-blue-600">{client.year}</span>
                          <span className="text-xs font-bold text-slate-400">• Orden: {client.order}</span>
                        </div>
                        <h4 className="font-black text-slate-900">{client.name}</h4>
                        <p className="text-sm text-slate-500 font-medium line-clamp-1">{client.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingClient(client)
                          setIsClientFormOpen(true)
                        }}
                        className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-lg transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-lg transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                No hay clientes registrados aún. ¡Agrega el primero!
              </p>
            )}
          </section>
        )}

        {isProjectFormOpen && (
          <ProjectForm
            project={editingProject}
            onSuccess={() => {
              setIsProjectFormOpen(false)
              fetchProjects()
            }}
            onCancel={() => setIsProjectFormOpen(false)}
          />
        )}

        {isClientFormOpen && (
          <ClientForm
            client={editingClient}
            onSuccess={() => {
              setIsClientFormOpen(false)
              fetchClients()
            }}
            onCancel={() => setIsClientFormOpen(false)}
          />
        )}
      </div>
    </div>
  )
}
