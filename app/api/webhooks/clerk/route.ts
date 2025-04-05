import { NextResponse } from 'next/server'

import { createUserByWebhook } from '@/actions/user'
import { userAdapter } from '@/data/adapters/clerk'

import { handleError } from '@/utils/handle-errors'
import { validateWebhook } from '@/utils/svix'

export async function POST(req: Request) {
  console.log('Webhook POST request received')

  const { payload, eventType } = await validateWebhook(req)

  if (eventType === 'user.created') {
    const client = userAdapter(payload?.data)
    console.log('payload', payload?.data)
    try {
      const { error, data } = await createUserByWebhook(payload?.data)
      console.log({ error, data })
      console.log(`${client.email} - User created successfully`)
      return NextResponse.json(
        { message: 'User created successfully' },
        { status: 200 },
      )
    } catch (error) {
      return handleError('Error creating user', error)
    }
  }

  return NextResponse.json(
    { message: 'Webhook processed successfully' },
    { status: 200 },
  )
}
