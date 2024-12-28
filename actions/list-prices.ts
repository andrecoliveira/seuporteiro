import stripe from '@/lib/stripe'
import Stripe from 'stripe'

export const listPrices = async (): Promise<Stripe.Price[]> => {
  const response = await stripe.prices.list({
    active: true,
  })
  if (!response) console.error('Error listing prices')
  return response.data
}
