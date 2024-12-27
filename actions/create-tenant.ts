import { supabaseAdmin } from '@/lib/supabaseClient'

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!,
// )

export const createTenant = async (stripeCustomerId: string) => {
  const { data, error } = await supabaseAdmin
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
  return { data, error }
}
