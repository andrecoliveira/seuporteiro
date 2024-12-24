import { cache } from 'react'

import { createClient } from '@/utils/supabase/server'

export const getSubscription = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()
  return data
})
