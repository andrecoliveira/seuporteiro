import { NextResponse } from 'next/server'

import { validateWebhook } from '@/utils/svix'

export async function POST(req: Request) {
  console.log('Webhook POST request received')

  // Validar payload e headers usando o svix-utils
  const { payload, eventType } = await validateWebhook(req)

  // Extração de dados do payload
  const { email_addresses } = payload?.data || {}
  const email = email_addresses?.[0]?.email_address

  if (eventType === 'user.created') {
    try {
      console.log(`${email} - User created successfully`)
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
  if (eventType === 'organization.created') {
    console.log(payload)
  }

  return NextResponse.json(
    { message: 'Webhook processed successfully' },
    { status: 200 },
  )
}
