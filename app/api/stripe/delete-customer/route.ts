import { NextResponse } from 'next/server'

import stripe from '@/lib/stripe'
import { z } from 'zod'

// Esquema de validação com Zod
const deleteCustomerSchema = z.object({
  customerId: z.string(),
})

export async function POST(req: Request) {
  try {
    // Parse e validação dos dados recebidos
    const body = await req.json()

    const { customerId } = deleteCustomerSchema.parse(body)

    // Deletando cliente no Stripe
    const stripeCustomer = await stripe.customers.del(customerId)

    // Retornando o cliente deletado
    return NextResponse.json({ customer: stripeCustomer }, { status: 200 })
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
    console.error('Erro ao deletar cliente no Stripe:', errorMessage)
    return NextResponse.json(
      { error: `Erro ao deletar cliente no Stripe: ${errorMessage}` },
      { status: 500 },
    )
  }
}
