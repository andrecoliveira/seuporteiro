'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Form } from './login.type'
import { APP_ROUTES } from '@/app/constants'

export async function login(values: Form) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword(values)

  if (error) redirect('/error')

  revalidatePath(APP_ROUTES.private.painel, 'layout')
  redirect(APP_ROUTES.private.painel)
}
