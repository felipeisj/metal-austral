'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/gestion-austral/panel')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white mb-2">Admin Access</h1>
          <p className="text-blue-200">Metal Austral - Gestión de Proyectos</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 text-red-200 rounded-2xl text-sm font-medium border border-red-500/30">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-blue-100 mb-2 px-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200/50 focus:bg-white/20 focus:border-blue-400 transition-all outline-none"
                placeholder="admin@metalaustral.cl"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-blue-100 mb-2 px-1">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200/50 focus:bg-white/20 focus:border-blue-400 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 rounded-2xl font-bold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-300 hover:text-white transition-colors text-sm font-medium">
            ← Volver al sitio
          </Link>
        </div>

        <p className="mt-4 text-center text-blue-400/50 text-xs">
          Protected by Supabase
        </p>
      </div>
    </div>
  )
}
