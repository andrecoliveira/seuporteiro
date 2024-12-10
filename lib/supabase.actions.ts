'use server'

import { AccountForm } from '@/app/cadastro/signUp.types'
import { APP_ROUTES } from '@/app/constants'
import { encodedRedirect } from '@/utils/encoded-redirect'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    return encodedRedirect('error', APP_ROUTES.public.signIn, error.code)
  }
  return redirect(APP_ROUTES.private.painel)
}

export const signUp = async (formData: AccountForm) => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        fullName: formData.legalResponsibleName,
      },
    },
  })
  return { data, error }
}

export const verifyOtpCode = async (email: string, token: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  })
  return { data, error }
}

export const deleteSupabaseUser = async (id: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.admin.deleteUser(id)
  return { data, error }
}

export const signOutAction = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/')
}
