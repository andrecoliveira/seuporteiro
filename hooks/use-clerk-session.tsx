import { useSession } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

export function useClerkSession() {
  const { session } = useSession()

  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
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
      },
    )
  }

  return createClerkSupabaseClient()
}
