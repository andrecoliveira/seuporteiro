import { supabaseAdmin } from '@/lib/supabaseClient'
import { User } from '@/types/user'

export async function createUserByWebhook(user: User) {
  const { error } = await supabaseAdmin.from('users').insert([user])
  if (error) throw new Error(error.message)
}
