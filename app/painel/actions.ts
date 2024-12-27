'use server'

import { cache } from 'react'

import stripe from '@/lib/stripe'
import Stripe from 'stripe'

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
