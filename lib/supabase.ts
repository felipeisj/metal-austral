import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Supabase credentials missing. Local data will be used as fallback.')
  }
}

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
    auth: {
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      signOut: async () => ({ error: null }),
      signInWithPassword: async () => ({ data: { user: null, session: null }, error: new Error('Supabase not configured') }),
    },
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
        eq: () => ({
          order: () => Promise.resolve({ data: [], error: null }),
          eq: () => Promise.resolve({ data: [], error: null }),
          select: () => Promise.resolve({ data: [], error: null }),
        }),
      }),
      insert: () => ({
        select: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      }),
      update: () => ({
        eq: () => ({
          eq: () => ({
            select: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
          }),
        }),
      }),
      delete: () => ({
        eq: () => ({
          eq: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        }),
      }),
    })
  } as any
