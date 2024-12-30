import { NextResponse } from 'next/server'

import stripe from '@/lib/stripe'
import Stripe from 'stripe'
import { clerkClient } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabaseClient'

export async function POST(req: Request) {
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

    const client = await clerkClient()

    switch (type) {
      case 'customer.created': {
        const customer = data.object as Stripe.Customer
        const {
          data: [user],
        } = await client.users.getUserList({
          emailAddress: [customer.email as string],
        })
        if (user.id) {
          console.log('Customer Stripe', user)
          await client.users.updateUser(user.id, {
            publicMetadata: {
              stripeCustomerId: customer.id,
            },
          })
          await stripe.customers.update(customer.id, {
            preferred_locales: ['pt-BR'],
            metadata: {
              userId: user.id,
            },
          })
          console.log('Customer created', customer.email)
        }
        break
      }

      case 'checkout.session.completed': {
        const session = data.object as Stripe.Checkout.Session
        supabaseAdmin.from('subscriptions').insert([
          {
            status: session.payment_status,
            user_id: session.metadata?.userId,
            customer_id: session.customer as string,
            customer_email: session.customer_email as string,
            stripe_subscription_id: session.subscription,
          },
        ])
        console.log('Checkout session completed', session.customer_email)
        break
      }
    }

    return new NextResponse('Webhook processed', { status: 200 })
  } catch {
    return new NextResponse('Internal error', { status: 500 })
  }
}
