import { headers } from 'next/headers'

import { WebhookEvent } from '@clerk/nextjs/server'
import { Webhook } from 'svix'

export async function validateWebhook(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local',
    )
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new Error('Missing svix headers')
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const webhook = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = webhook.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (error) {
    console.error('Error verifying webhook:', error)
    throw new Error('Invalid webhook signature')
  }

  return { payload, eventType: evt.type }
}
