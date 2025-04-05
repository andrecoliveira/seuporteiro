import { NextResponse } from 'next/server'

import { createUserByWebhook } from '@/actions/user'
import { userAdapter } from '@/data/adapters/clerk'

import { handleError } from '@/utils/handle-errors'
import { validateWebhook } from '@/utils/svix'

export async function POST(req: Request) {
  console.log('Webhook POST request received')

  try {
    const { payload, eventType } = await validateWebhook(req)

    if (eventType === 'user.created') {
      const client = userAdapter(payload?.data)
      await createUserByWebhook(payload?.data)
      console.log(`${client.email} - User created successfully`)
      return NextResponse.json(
        { message: 'User created successfully' },
        { status: 200 },
      )
    }

    return NextResponse.json(
      { message: 'Webhook processed successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Erro no webhook Clerk:', error)
    return handleError('Error creating user', error)
  }
}
