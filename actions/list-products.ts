import stripe from '@/lib/stripe'
import Stripe from 'stripe'

export const listProducts = async (): Promise<Stripe.Product[]> => {
  const response = await stripe.products.list({
    ids: ['prod_REfvvWHpjRAnxe', 'prod_REfwONSNKYkpVm'],
  })
  if (!response) console.error('Error listing products')
  return response.data
}
