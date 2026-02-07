import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Supabase credentials missing. Local data will be used as fallback.')
  }
}

// Helper to create chainable mock methods
const createChainableMock = () => {
  const mock: any = {
    select: () => mock,
    eq: () => mock,
    order: () => Promise.resolve({ data: [], error: null }),
    then: (resolve: any) => resolve({ data: [], error: null }),
  }
  return mock
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
    from: () => createChainableMock()
  } as any
