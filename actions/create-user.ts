'use server'

import { User } from '@/types/user'

import { createClient } from '@/utils/supabase/server'

export const createtUser = async (formData: User) => {
  const supabase = await createClient()
  try {
    const response = await supabase.from('user').insert([
      {
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        profile_image_url: formData.profileImageUrl,
        user_id: formData.userId,
        customer_id: formData.customerId,
      },
    ])
    if (response.error) throw new Error(response.error.message)
    const message = `Task successfully added! - ${formData.firstName} ${formData.lastName} (${formData.email})`
    console.log(message)
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message)
    throw new Error('An unexpected error occurred.')
  }
}
