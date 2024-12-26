import { supabaseClient } from '@/lib/supabaseClient'

export const createTenant = async (stripeCustomerId: string) => {
  const { data, error } = await supabaseClient
    .from('tenants')
    .insert([
      {
        stripe_customer_id: stripeCustomerId,
      },
    ])
    .select('id')
    .single()
  if (error) {
    console.error('Error inserting tenant into Supabase:', error)
    throw new Error(error.message)
  }
  return data
}
