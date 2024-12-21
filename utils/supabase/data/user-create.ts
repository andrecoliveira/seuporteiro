'use server'

import { createClient } from '@/utils/supabase/server'

interface UserCreateProps {
  email: string
  first_name: string
  last_name: string
  profile_image_url: string
  user_id: string
}

export const userCreate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: UserCreateProps) => {
  const supabase = await createClient()

  try {
    const response = await supabase.from('user').insert([
      {
        email,
        first_name,
        last_name,
        profile_image_url,
        user_id,
      },
    ])

    if (!response.error) {
      console.log('Task successfully added!', response)
    } else {
      throw new Error(response.error.message)
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('An unexpected error occurred.')
  }
}
