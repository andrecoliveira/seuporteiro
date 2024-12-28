import { NextResponse } from 'next/server'

import { createTenant } from '@/actions/create-tenant'
import { updateUser } from '@/actions/user'
import stripe from '@/lib/stripe'
import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.text()
    const signature = req.headers.get('Stripe-signature') as string

    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      )
    } catch {
      return new NextResponse('Invalid signature', { status: 400 })
    }

    const { type, data } = event

    switch (type) {
      case 'customer.created': {
        const customer = data.object as Stripe.Customer
        console.log('Customer created', customer.email)
        const { data: tenant } = await createTenant(customer.id)
        await updateUser(userId, { tenant_id: tenant.id })
        await stripe.customers.update(customer.id, {
          metadata: { tenant_id: tenant.id, user_id: userId },
        })
        break
      }

      case 'checkout.session.completed': {
        const session = data.object as Stripe.Checkout.Session
        console.log('Checkout session completed', session.customer_email)
        break
      }
    }

    return new NextResponse('Webhook processed', { status: 200 })
  } catch {
    return new NextResponse('Internal error', { status: 500 })
  }
}
