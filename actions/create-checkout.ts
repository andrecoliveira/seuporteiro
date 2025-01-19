'use server'

import stripe from '@/lib/stripe'

type CreateCheckoutOptions = {
  customerEmail: string
  userId: string
  priceId: string
}

export const createCheckout = async ({
  customerEmail,
  userId,
  priceId,
}: CreateCheckoutOptions) => {
  try {
    if (!userId && !customerEmail) {
      throw new Error('Either userId or customerEmail is required')
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      locale: 'pt-BR',
      customer_email: customerEmail,
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/concluido`,
      allow_promotion_codes: true,
      payment_method_types: ['card'],
      currency: 'BRL',
      metadata: {
        userId,
      },
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/planos`,
      phone_number_collection: { enabled: true },
    })
    return session.url
  } catch (error) {
    console.error('Checkout error:', error)
  }
}
