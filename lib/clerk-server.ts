import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

export function createClientServer(token: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      // Get the custom Supabase token from Clerk
      fetch: async (url, options = {}) => {
        // Insert the Clerk Supabase token into the headers
        const headers = new Headers(options?.headers)
        headers.set('Authorization', `Bearer ${token}`)

        // Now call the default fetch
        return fetch(url, {
          ...options,
          headers,
        })
      },
    },
  })
}

export async function getAuth() {
  const { getToken, userId } = await auth()
  const token = await getToken({
    template: 'supabase',
  })
  return {
    token,
    userId,
  }
}

export async function createClerkSupabaseClientSsr() {
  // The `useAuth()` hook is used to access the `getToken()` method
  const { getToken } = await auth()
  const token = await getToken({
    template: 'supabase',
  })
  return createClientServer(token as string)
}
