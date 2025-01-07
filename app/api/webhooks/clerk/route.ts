import { NextResponse } from 'next/server'

import { createUserByWebhook } from '@/actions/user'
import { userAdapter } from '@/data/adapters/clerk'
// import { supabaseAdmin } from '@/lib/supabaseClient'
import { redis } from '@/lib/upstash'
// import { clerkClient } from '@clerk/nextjs/server'

import { handleError } from '@/utils/handle-errors'
import { validateWebhook } from '@/utils/svix'

export async function POST(req: Request) {
  console.log('Webhook POST request received')

  const { payload, eventType } = await validateWebhook(req)

  if (eventType === 'user.created') {
    const client = userAdapter(payload?.data)
    try {
      if (!client.publicMetadata.org_id) await redis.set(client.id, false)
      await createUserByWebhook(payload?.data)
      console.log(`${client.email} - User created successfully`)
      return NextResponse.json(
        { message: 'User created successfully' },
        { status: 200 },
      )
    } catch (error) {
      return handleError('Error creating user', error)
    }
  }
  if (eventType === 'organization.created') {
    // const orgId = payload?.data?.id
    // const { data } = await supabaseAdmin
    //   .from('subscriptions')
    //   .select('status')
    //   .eq('org_id', orgId)
    //   .single()
    // const client = await clerkClient()
    // client.organizations.updateOrganizationMetadata(orgId, {
    //   publicMetadata: {
    //     subscriptionStatus: data?.status,
    //   },
    // })
  }

  return NextResponse.json(
    { message: 'Webhook processed successfully' },
    { status: 200 },
  )
}
