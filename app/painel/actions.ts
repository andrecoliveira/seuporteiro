'use server'

import stripe from '@/lib/stripe'
import { createClient } from '@/utils/supabase/server'
import { cache } from 'react'
import { Tenant } from '../cadastro/signUp.types'
import Stripe from 'stripe'

export const getUser = cache(async () => {
  const supabase = await createClient()
  const user = await supabase.auth.getUser()
  if (!user) throw new Error('Usuário não autenticado.')
  return user
})

export const getTenant = cache(async (userId: string) => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('user')
    .select('role, tenant_id(*)')
    .eq('id', userId)
    .single()
  if (!data) throw new Error('Dados do usuário não encontrados.')
  return data.tenant_id as Partial<Tenant>
})

export const getSubscription = cache(
  async (stripeId: string, status: Stripe.SubscriptionListParams.Status) => {
    try {
      if (!stripeId) throw new Error('ID do cliente não encontrado.')
      if (!status) throw new Error('Status da assinatura não encontrado.')
      const subscription = await stripe.subscriptions.list({
        customer: stripeId,
        status: status,
        limit: 1,
      })
      return {
        status: subscription.data[0]?.status,
        subscription,
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      return {
        error: errorMessage,
      }
    }
  },
)
