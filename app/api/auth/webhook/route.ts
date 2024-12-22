import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { createCustomer } from '@/actions/create-customer'
import { createtUser } from '@/actions/create-user'
import { WebhookEvent } from '@clerk/nextjs/server'
import { Webhook } from 'svix'

export async function POST(req: Request) {
  console.log('Webhook POST request received')
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local',
    )
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: 'Error occurred -- no svix headers' },
      { status: 400 },
    )
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return NextResponse.json(
      { error: 'Error verifying webhook' },
      { status: 400 },
    )
  }

  // Get the ID and type
  const eventType = evt.type
  console.log('Webhook event type:', eventType)

  const {
    email_addresses,
    first_name: firstName,
    last_name: lastName,
    profile_image_url: profileImageUrl,
    id: userId,
  } = payload?.data || {}

  const email = email_addresses?.[0]?.email_address

  if (eventType === 'user.created') {
    try {
      const stripeCustomerId = await createCustomer({
        email,
        firstName,
        lastName,
        userId,
      })
      await createtUser({
        email,
        firstName,
        lastName,
        profileImageUrl,
        userId,
        customerId: stripeCustomerId || null,
      })
      return NextResponse.json(
        { message: 'User created successfully' },
        { status: 200 },
      )
    } catch (error) {
      console.error('Error creating user:', error)
      return NextResponse.json(
        { error: 'Error creating user' },
        { status: 500 },
      )
    }
  }

  console.log('Webhook processed successfully')
  return NextResponse.json(
    { message: 'Webhook processed successfully' },
    { status: 200 },
  )
}
