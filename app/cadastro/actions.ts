'use server'

import { createClient } from '@/utils/supabase/server'

import { InformationForm } from './signUp.types'

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
