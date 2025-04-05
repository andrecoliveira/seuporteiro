import { NextResponse } from 'next/server'

// import { createUserByWebhook } from '@/actions/user'
import { userAdapter } from '@/data/adapters/clerk'
import { supabaseClient } from '@/lib/supabaseClient'

import { handleError } from '@/utils/handle-errors'
import { validateWebhook } from '@/utils/svix'

export async function POST(req: Request) {
  console.log('Webhook POST request received')

  try {
    const { payload, eventType } = await validateWebhook(req)

    if (eventType === 'user.created') {
      const client = userAdapter(payload?.data)
      // await createUserByWebhook(payload?.data)
      const { error, data } = await supabaseClient.from('users').insert([
        {
          email: payload?.data.email_addresses[0].email_address,
          user_id: payload?.data.id,
          first_name: payload?.data.first_name,
          last_name: payload?.data.last_name,
          profile_image_url: payload?.data.profile_image_url,
        },
      ])
      console.log({ error, data })
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
