import { NextResponse } from 'next/server'

import { createStripeCustomer } from '@/actions/create-stripe-customer'
import { createTenant } from '@/actions/create-tenant'
import { createtUser } from '@/actions/create-user'

import { validateWebhook } from '@/utils/svix'

export async function POST(req: Request) {
  console.log('Webhook POST request received')

  // Validar payload e headers usando o svix-utils
  const { payload, eventType } = await validateWebhook(req)

  // Extração de dados do payload
  const {
    email_addresses,
    first_name: firstName,
    last_name: lastName,
    profile_image_url: profileImageUrl,
    id: clerkId,
  } = payload?.data || {}
  const email = email_addresses?.[0]?.email_address

  if (eventType === 'user.created') {
    try {
      // Criar cliente no Stripe
      const stripeCustomer = await createStripeCustomer({
        email,
        firstName,
        lastName,
        clerkId,
      })

      // Criar tenant no Supabase
      const tenant = await createTenant(stripeCustomer.id)

      // Criar usuário no Supabase
      await createtUser({
        email,
        firstName,
        lastName,
        profileImageUrl,
        clerkId,
        tenantId: tenant.id,
      })

      return NextResponse.json(
        { message: 'User created successfully' },
        { status: 200 },
      )
    } catch (error) {
      console.error('Error creating user:', error)
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
  }

  console.log(`${email_addresses} - Webhook processed successfully`)
  return NextResponse.json(
    { message: 'Webhook processed successfully' },
    { status: 200 },
  )
}
