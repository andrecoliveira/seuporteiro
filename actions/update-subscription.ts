import { supabaseAdmin } from '@/lib/supabaseClient'
import Stripe from 'stripe'

export async function updateSubscription(subscription: Stripe.Subscription) {
  const subscriptionData = {
    stripe_subscription_id: subscription.id,
    stripe_customer_id: subscription.customer as string,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    user_id: subscription.metadata.user_id,
    updated_at: new Date().toISOString(),
    tenant_id: subscription.metadata.tenant_id,
  }

  const { error } = await supabaseAdmin
    .from('subscriptions')
    .upsert(subscriptionData, {
      onConflict: 'stripe_subscription_id',
    })

  if (error) throw error
}
