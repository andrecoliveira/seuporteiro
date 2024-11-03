'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Form } from './login.type'
import { APP_ROUTES } from '@/app/constants'

export async function login(values: Form): Promise<string | void> {
  const supabase = await createClient()
  const response = await supabase.auth.signInWithPassword(values)
  if (response.error) return response.error.code
  revalidatePath(APP_ROUTES.private.painel, 'layout')
  redirect(APP_ROUTES.private.painel)
}
