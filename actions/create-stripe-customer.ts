import stripe from '@/lib/stripe'
import { User } from '@/types/user'

export async function createStripeCustomer(
  formData: Omit<User, 'profileImageUrl' | 'stripeCustomerId'>,
) {
  try {
    const stripeCustomer = await stripe.customers.create({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      description: 'Cadastrado por Mesa Certa',
      preferred_locales: ['pt-BR'],
      metadata: { user_id: formData.userId },
    })
    if (!stripeCustomer.id) throw new Error('Error creating customer')
    return stripeCustomer
  } catch (error) {
    console.error('Error creating Stripe customer:', error)
    throw error
  }
}
