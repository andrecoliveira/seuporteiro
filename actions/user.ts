import { supabaseClient } from '@/lib/supabaseClient'
import { User } from '@/types/user'

export async function createUserByWebhook(user: User) {
  const { error } = await supabaseClient.from('users').insert([
    {
      email: user.email_addresses[0].email_address,
      user_id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_image_url: user.profile_image_url,
    },
  ])
  if (error) throw new Error(error.message)
}
