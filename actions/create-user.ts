import { User } from '@/types/user'
import { createClient } from '@supabase/supabase-js'

export const createtUser = async (formData: User) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
  const response = await supabase.from('user').insert([
    {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      profile_image_url: formData.profileImageUrl,
      user_id: formData.userId,
      stripe_customer_id: formData.stripeCustomerId,
    },
  ])
  if (response.error) {
    console.error('Error inserting user into Supabase:', response.error)
    throw new Error(response.error.message)
  }
}
