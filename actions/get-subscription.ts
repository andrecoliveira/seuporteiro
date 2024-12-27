import { cache } from 'react'

import { createClerkSupabaseClientSsr } from '@/lib/clerk-server'

export const getSubscription = cache(async (userId: string) => {
  const client = await createClerkSupabaseClientSsr()
  const { data, error } = await client
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()

  return { data, error }
})
