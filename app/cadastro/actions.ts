'use server'

import { createClient } from '@/utils/supabase/server'

import { InformationForm, Tenant, User, TenantMember } from './signUp.types'

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

export const emailAlreadyExists = async (email: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tenant')
    .select('contact_email')
    .or(`contact_email.eq.${email.toLowerCase()}`)
    .single()
  return { data, error }
}

export const createTenant = async (formData: Partial<Tenant>) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tenant')
    .insert([formData])
    .select()
    .single()
  return { data, error }
}

export const deleteTenant = async (tenantId: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tenant')
    .delete()
    .match({ id: tenantId })
  return { data, error }
}

export const createUser = async (formData: Partial<User>) => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('user').insert([formData])
  return { data, error }
}

export const deleteUser = async (userId: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('user')
    .delete()
    .match({ id: userId })
  return { data, error }
}

export const createTenantMember = async (formData: TenantMember) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tenant_members')
    .insert([formData])
  return { data, error }
}

export const deleteTenantMember = async (tenantMemberId: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tenant_members')
    .delete()
    .match({ id: tenantMemberId })
  return { data, error }
}
