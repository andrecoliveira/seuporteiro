import { NextResponse } from 'next/server'

import stripe from '@/lib/stripe'
import { redis } from '@/lib/upstash'
import Stripe from 'stripe'

// TODOS
// Prevenção de duplicações
// Lock distribuído
// Analytics de eventos
// Cache de sessões
// Fila de processamento
// Rastreamento de erros
// Cache de dados do cliente

// Cache keys
const WEBHOOK_CACHE_KEY = 'stripe:webhook:'
const EVENT_PROCESSING_KEY = 'stripe:processing:'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get('Stripe-signature') as string

    // Prevent duplicate webhook processing
    const eventHash = Buffer.from(signature).toString('base64')
    const isDuplicate = await redis.get(`${WEBHOOK_CACHE_KEY}${eventHash}`)
    if (isDuplicate) {
      return new NextResponse('Event already processed', { status: 200 })
    }

    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      )
    } catch {
      await redis.incr('stripe:webhook:errors')
      return new NextResponse('Invalid signature', { status: 400 })
    }

    // Set processing lock
    const processingKey = `${EVENT_PROCESSING_KEY}${event.id}`
    const lockAcquired = await redis.set(processingKey, 'processing', {
      nx: true,
      ex: 60, // 1 minute lock
    })

    if (!lockAcquired) {
      return new NextResponse('Event being processed', { status: 202 })
    }

    const { type, data } = event
    const session = data.object as Stripe.Checkout.Session

    // Track webhook events for analytics
    await redis.hincrby('stripe:webhook:events', type, 1)

    switch (type) {
      case 'customer.created': {
        const customer = data.object as Stripe.Customer
        await redis.hset(`stripe:customers:${customer.id}`, {
          email: customer.email,
          created: Date.now(),
        })
        break
      }

      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(session)
        // Cache successful checkout sessions
        await redis.set(
          `stripe:checkout:${session.id}`,
          { status: 'completed', timestamp: Date.now() },
          { ex: 86400 }, // 24 hours
        )
        break
    }

    // Mark webhook as processed
    await redis.set(`${WEBHOOK_CACHE_KEY}${eventHash}`, 'processed', {
      ex: 86400, // 24 hours
    })
    await redis.del(processingKey)

    return new NextResponse('Webhook processed', { status: 200 })
  } catch {
    await redis.incr('stripe:webhook:errors')
    return new NextResponse('Internal error', { status: 500 })
  }
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  await redis.lpush('stripe:checkout:queue', {
    sessionId: session.id,
    timestamp: Date.now(),
  })
}

// Analytics helper
export async function getWebhookStats() {
  const [events, errors] = await Promise.all([
    redis.hgetall('stripe:webhook:events'),
    redis.get('stripe:webhook:errors'),
  ])
  return { events, errors }
}
