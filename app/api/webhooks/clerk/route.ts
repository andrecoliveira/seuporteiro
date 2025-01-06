import { NextResponse } from 'next/server'

import { edgeConfig } from '@/actions/edge-config'
import { supabaseAdmin } from '@/lib/supabaseClient'
import { clerkClient } from '@clerk/nextjs/server'

import { validateWebhook } from '@/utils/svix'

export async function POST(req: Request) {
  console.log('Webhook POST request received')

  // Validar payload e headers usando o svix-utils
  const { payload, eventType } = await validateWebhook(req)

  // Extração de dados do payload
  const {
    email_addresses,
    id,
    first_name,
    last_name,
    profile_image_url,
    public_metadata,
  } = payload?.data || {}
  const email = email_addresses?.[0]?.email_address

  if (eventType === 'user.created') {
    try {
      if (!public_metadata.org_id) {
        await edgeConfig({
          operation: 'create',
          key: id,
          value: false,
        })
      }
      const { error } = await supabaseAdmin.from('users').insert([
        {
          user_id: id,
          first_name,
          last_name,
          profile_image_url,
          email,
        },
      ])
      if (!error) console.log(`${email} - User created successfully`)
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
    const orgId = payload?.data?.id
    const { data } = await supabaseAdmin
      .from('subscriptions')
      .select('status')
      .eq('org_id', orgId)
      .single()
    const client = await clerkClient()
    client.organizations.updateOrganizationMetadata(orgId, {
      publicMetadata: {
        subscriptionStatus: data?.status,
      },
    })
  }

  return NextResponse.json(
    { message: 'Webhook processed successfully' },
    { status: 200 },
  )
}
