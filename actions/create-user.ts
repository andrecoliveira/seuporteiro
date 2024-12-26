import { supabaseClient } from '@/lib/supabaseClient'
import { User } from '@/types/user'

export const createtUser = async (formData: Omit<User, 'stripeCustomerId'>) => {
  const response = await supabaseClient.from('users').insert([
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
