import { NextResponse } from 'next/server'

import stripe from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabaseClient'
import { redis } from '@/lib/upstash'
import { Step } from '@/types/steps'
import { clerkClient } from '@clerk/nextjs/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature') as string

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    let event: Stripe.Event

    try {
      if (!signature || !webhookSecret) {
        return new Response('Webhook secret not found.', { status: 400 })
      }
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
      console.log(` Webhook received: ${event.type}`)
    } catch {
      return new Response(`Webhook Error`, { status: 400 })
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
        if (session.payment_status === 'paid') {
          const { error } = await supabaseAdmin.from('subscriptions').insert([
            {
              status: session.payment_status,
              user_id: session.metadata?.userId,
              customer_id: session.customer as string,
              customer_email: session.customer_email as string,
              stripe_subscription_id: session.subscription,
            },
          ])
          if (!error) {
            console.log('Checkout session completed', session.customer_email)
          }
        }
        if (session.metadata?.userId) {
          await redis.set(
            session.metadata?.userId,
            Step.ONBOARDING_ACCOMPLISHED,
          )
        }
        break
      }
    }

    return new NextResponse('Webhook processed', { status: 200 })
  } catch {
    return new NextResponse('Internal error', { status: 500 })
  }
}
