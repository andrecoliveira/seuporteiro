'use server'

import stripe from '@/lib/stripe'
import { User } from '@/types/user'

export const createCustomer = async (
  formData: Omit<User, 'profileImageUrl'>,
) => {
  try {
    const stripeCustomer = await stripe.customers.create({
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      description: 'Cadastrado por Mesa Certa',
      preferred_locales: ['pt-BR'],
      metadata: { user_id: formData.userId },
    })
    if (!stripeCustomer.id) throw new Error('Error creating customer')
    console.log('Customer successfully created!', stripeCustomer)
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message)
    throw new Error('An unexpected error occurred.')
  }
}
