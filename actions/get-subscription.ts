import { createClient } from '@/utils/supabase/server'

export async function getSubscription(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()
  return data
}
