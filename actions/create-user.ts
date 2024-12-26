import { User } from '@/types/user'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export const createtUser = async (
  formData: Omit<User, 'stripeCustomerId' | 'tenantId'>,
) => {
  const response = await supabase.from('users').insert([
    {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      profile_image_url: formData.profileImageUrl,
      clerk_id: formData.clerkId,
    },
  ])
  if (response.error) {
    console.error('Error inserting user into Supabase:', response.error)
    throw new Error(response.error.message)
  }
}
