'use server'

import { createClerkSupabaseClientSsr } from '@/lib/clerk-server'

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
  const supabase = await createClerkSupabaseClientSsr()

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

    console.log('Task successfully added!', response)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('An unexpected error occurred.')
  }
}
