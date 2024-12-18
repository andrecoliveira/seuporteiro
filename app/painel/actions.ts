'use server'

import { cache } from 'react'

import stripe from '@/lib/stripe'
import Stripe from 'stripe'

import { createClient } from '@/utils/supabase/server'

export const getUser = cache(async () => {
  const supabase = await createClient()
  const user = await supabase.auth.getUser()
  if (!user) return { data: null }
  const { data } = await supabase
    .from('user')
    .select('role, tenant_id(*)')
    .eq('id', user.data.user?.id)
    .single()
  if (!data) return { data: null }
  return {
    data: {
      user,
      tenant: {
        ...data.tenant_id,
      },
    },
  }
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
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  },
)
