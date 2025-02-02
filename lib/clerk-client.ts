import { useSession } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

export function useClerkSupabaseClient() {
  const { session } = useSession()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  // Create a custom supabase client that injects the Clerk Supabase token into the request headers
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      // Get the custom Supabase token from Clerk
      fetch: async (url, options = {}) => {
        const clerkToken = await session?.getToken({
          template: 'supabase',
        })

        // Insert the Clerk Supabase token into the headers
        const headers = new Headers(options?.headers)
        headers.set('Authorization', `Bearer ${clerkToken}`)

        // Now call the default fetch
        return fetch(url, {
          ...options,
          headers,
        })
      },
    },
  })
}
