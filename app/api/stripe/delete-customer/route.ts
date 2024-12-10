import { NextResponse } from 'next/server'

import stripe from '@/lib/stripe'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validação dos dados recebidos
    const { customerId } = body

    if (!customerId) {
      return NextResponse.json(
        { error: 'customer_id obrigatório.' },
        { status: 400 },
      )
    }

    // Deletando cliente no Stripe
    const stripeCustomer = await stripe.customers.del(customerId)

    // Retornando o cliente criado
    return NextResponse.json({ customer: stripeCustomer }, { status: 201 })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    console.error('Erro ao deletar cliente no Stripe:', errorMessage)
    return NextResponse.json(
      { error: `Erro ao deletar cliente no Stripe: ${errorMessage}` },
      { status: 500 },
    )
  }
}
