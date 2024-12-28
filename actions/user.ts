import { supabaseAdmin } from '@/lib/supabaseClient'
import { User } from '@/types/user'

export const getUserByEmail = async (email: string) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', email)
    .single()
  if (error) {
    console.error('Error getting user from Supabase:', error)
    throw new Error(error.message)
  }
  return data
}

export const createtUser = async (formData: Partial<User>) => {
  const response = await supabaseAdmin.from('users').insert([formData])
  if (response.error) {
    console.error('Error inserting user into Supabase:', response.error)
    throw new Error(response.error.message)
  }
}

export const updateUser = async (userId: string, formData: Partial<User>) => {
  const response = await supabaseAdmin
    .from('users')
    .update(formData)
    .eq('user_id', userId)
  if (response.error) {
    console.error('Error updating user in Supabase:', response.error)
    throw new Error(response.error.message)
  }
}
