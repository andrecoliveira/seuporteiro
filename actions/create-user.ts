import { supabaseAdmin } from '@/lib/supabaseClient'
import { User } from '@/types/user'

export const createtUser = async (formData: Partial<User>) => {
  const response = await supabaseAdmin.from('users').insert([
    {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      profile_image_url: formData.profileImageUrl,
      user_id: formData.userId,
      tenant_id: formData.tenantId || null,
    },
  ])
  if (response.error) {
    console.error('Error inserting user into Supabase:', response.error)
    throw new Error(response.error.message)
  }
}
