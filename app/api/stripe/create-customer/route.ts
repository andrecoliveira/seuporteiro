import { NextResponse } from 'next/server'

import stripe from '@/lib/stripe'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validação dos dados recebidos
    const { email, legalResponsibleName, tenantName, userId } = body

    if (!email || !legalResponsibleName || !userId || !tenantName) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios.' },
        { status: 400 },
      )
    }

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
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    console.error('Erro ao criar cliente no Stripe:', errorMessage)
    return NextResponse.json(
      { error: `Erro ao criar cliente no Stripe: ${errorMessage}` },
      { status: 500 },
    )
  }
}
