'use server'

import { createClient } from '@/utils/supabase/server'

import { InformationForm, AccountForm } from './signUp.types'

export const informationAlreadyExists = async (formData: InformationForm) => {
  const supabase = await createClient()
  const { cnpj, pathname } = formData
  const { data, error } = await supabase
    .from('tenant')
    .select('cnpj, pathname')
    .or(`pathname.eq.${pathname.toLowerCase()},cnpj.eq.${cnpj}`)
    .single()
  return { data, error }
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

export const sendOtpCode = async (email: string, token: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  })
  return { data, error }
}

export const createTenant = async (formData: InformationForm) => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('tenant').insert([formData])
  return { data, error }
}

export const createUser = async (formData: AccountForm) => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('user').insert([formData])
  return { data, error }
}

export const createTenantMember = async (formData: AccountForm) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tenant_members')
    .insert([formData])
  return { data, error }
}
