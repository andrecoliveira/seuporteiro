'server only'

import { createClient } from '../server'

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
    const { data, error } = await supabase
      .from('user')
      .insert([
        {
          email,
          first_name,
          last_name,
          profile_image_url,
          user_id,
        },
      ])
      .select()

    console.log('data', data)
    console.log('error', error)

    if (error?.code) return error
    return data
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('An unexpected error occurred.')
  }
}
