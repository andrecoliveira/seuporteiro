import { NextResponse } from 'next/server'

import stripe from '@/lib/stripe'
import { z } from 'zod'

// Esquema de validação com Zod
const customerSchema = z.object({
  email: z.string(),
  legalResponsibleName: z.string(),
  tenantName: z.string(),
  userId: z.string(),
})

export async function POST(req: Request) {
  try {
    // Parse e validação dos dados recebidos
    const body = await req.json()

    const { email, legalResponsibleName, tenantName, userId } =
      customerSchema.parse(body)

    // Preparando o payload para criar o cliente no Stripe
    const stripeCustomerPayload = {
      name: legalResponsibleName,
      email,
      description: 'Cadastrado por Mesa Certa',
      preferred_locales: ['pt-BR'],
      metadata: {
        user_id: userId,
        tenant_name: tenantName,
      },
    }

    // Criando o cliente no Stripe
    const stripeCustomer = await stripe.customers.create(stripeCustomerPayload)

    // Retornando o cliente criado
    return NextResponse.json({ customer: stripeCustomer }, { status: 201 })
  } catch (error) {
    // Tratando erros de validação do Zod
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Erro de validação.',
          details: error.errors.map((e) => ({
            path: e.path,
            message: e.message,
          })),
        },
        { status: 400 },
      )
    }

    // Tratando outros erros
    const errorMessage =
      error instanceof Error ? error.message : 'Erro desconhecido'
    console.error('Erro ao criar cliente no Stripe:', errorMessage)
    return NextResponse.json(
      { error: `Erro ao criar cliente no Stripe: ${errorMessage}` },
      { status: 500 },
    )
  }
}
