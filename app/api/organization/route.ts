import { NextResponse } from 'next/server'

import { createClerkSupabaseClientSsr } from '@/lib/clerk-server'
import { redis } from '@/lib/upstash'
import { clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  slug: z.string(),
  userId: z.string(),
})

export async function POST(req: Request) {
  try {
    const query = await req.json()
    const { success } = schema.safeParse(query)
    if (!success) {
      return new Response(JSON.stringify({ error: 'Parâmetros inválidos' }), {
        status: 400,
      })
    }
    const { name, slug, userId } = schema.parse(query)

    const client = await clerkClient()
    const response = await client.organizations.createOrganization({
      name,
      slug,
      publicMetadata: {
        userId,
      },
    })
    await client.organizations.createOrganizationMembership({
      organizationId: response.id,
      userId,
      role: 'org:admin',
    })
    const supabase = await createClerkSupabaseClientSsr()
    await supabase
      .from('subscriptions')
      .update({
        org_id: response.id,
      })
      .eq('user_id', userId)
    await supabase
      .from('users')
      .update({
        org_id: response.id,
      })
      .eq('user_id', userId)
    await redis.del(userId)
    return NextResponse.json(
      {
        message: 'Organização criada com sucesso.',
        organizationId: response.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Erro ao criar organização:', error)
    return NextResponse.json(
      { error: 'Erro interno ao criar organização.' },
      { status: 500 },
    )
  }
}
