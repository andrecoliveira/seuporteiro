import { NextResponse } from 'next/server'

import { edgeConfig } from '@/actions/edge-config'
import { supabaseAdmin } from '@/lib/supabaseClient'
import { clerkClient } from '@clerk/nextjs/server'

import { validateWebhook } from '@/utils/svix'

// Tipos para os dados de e-mail
interface EmailAddress {
  email_address: string
}

// Tipos para o payload de um usuário no evento `user.created`
interface UserCreatedPayload {
  id: string
  email_addresses: EmailAddress[]
  first_name: string
  last_name: string
  profile_image_url: string
  public_metadata: {
    org_id?: string
  }
}

// Tipos para o payload de uma organização no evento `organization.created`
interface OrganizationCreatedPayload {
  id: string
}

// Tipo para o payload geral do webhook
type WebhookPayload = UserCreatedPayload | OrganizationCreatedPayload

// Tipos para os eventos suportados
type EventType = 'user.created' | 'organization.created'

// Lista de eventos suportados
const SUPPORTED_EVENTS: EventType[] = ['user.created', 'organization.created']

// Helper para lidar com respostas JSON
const jsonResponse = (data: unknown, status = 200) =>
  NextResponse.json(data, { status })

// Type guard para verificar se o evento é suportado
function isSupportedEvent(eventType: string): eventType is EventType {
  return SUPPORTED_EVENTS.includes(eventType as EventType)
}

// Type guard para verificar se o payload é do tipo `OrganizationCreatedPayload`
function isOrganizationCreatedPayload(
  payload: WebhookPayload,
): payload is OrganizationCreatedPayload {
  return 'id' in payload && Object.keys(payload).length === 1
}

// Função para processar eventos `user.created`
async function handleUserCreated(payload: UserCreatedPayload): Promise<string> {
  const {
    id: userId,
    email_addresses: emailAddresses,
    first_name: firstName,
    last_name: lastName,
    profile_image_url: profileImageUrl,
    public_metadata: publicMetadata,
  } = payload

  const email = emailAddresses?.[0]?.email_address

  if (!email) {
    throw new Error('Email is missing in user payload')
  }

  // Verifica se o usuário possui `org_id` no metadata
  if (!publicMetadata?.org_id) {
    await edgeConfig({
      operation: 'create',
      key: userId,
      value: false,
    })
  }

  // Insere o usuário no Supabase
  const { error } = await supabaseAdmin.from('users').insert([
    {
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      profile_image_url: profileImageUrl,
      email,
    },
  ])

  if (error) {
    throw new Error(`Error inserting user into Supabase: ${error.message}`)
  }

  console.log(`${email} - User created successfully`)
  return 'User created successfully'
}

// Função para processar eventos `organization.created`
async function handleOrganizationCreated(
  payload: OrganizationCreatedPayload,
): Promise<string> {
  const orgId = payload.id

  const { data, error } = await supabaseAdmin
    .from('subscriptions')
    .select('status')
    .eq('org_id', orgId)
    .single()

  if (error) {
    throw new Error(`Error fetching subscription status: ${error.message}`)
  }

  const client = await clerkClient()
  await client.organizations.updateOrganizationMetadata(orgId, {
    publicMetadata: {
      subscriptionStatus: data?.status,
    },
  })

  return `Organization ${orgId} updated successfully with status: ${data?.status}`
}

export async function POST(req: Request) {
  try {
    console.log('Webhook POST request received')

    // Valida o webhook e extrai o payload
    const {
      payload,
      eventType,
    }: { payload: WebhookPayload; eventType: string } =
      await validateWebhook(req)

    // Verifica se o evento é suportado
    if (!isSupportedEvent(eventType)) {
      console.warn(`Unsupported event type: ${eventType}`)
      return jsonResponse(
        { message: `Event type '${eventType}' is not supported` },
        400,
      )
    }

    // Identifica e processa o evento correspondente
    if (eventType === 'user.created') {
      if ('email_addresses' in payload) {
        const message = await handleUserCreated(payload)
        return jsonResponse({ message })
      }
    }

    if (
      eventType === 'organization.created' &&
      isOrganizationCreatedPayload(payload)
    ) {
      const message = await handleOrganizationCreated(payload)
      return jsonResponse({ message })
    }

    console.warn(`Invalid payload for event type: ${eventType}`)
    return jsonResponse(
      { message: `Invalid payload for event type '${eventType}'` },
      400,
    )
  } catch (error) {
    console.error('Error processing webhook:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    return jsonResponse({ error: errorMessage }, 500)
  }
}
