import { NextResponse } from 'next/server'

import stripe from '@/lib/stripe'
import Stripe from 'stripe'

// Função para validar variáveis de ambiente
function validateEnvVars() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY não está configurada.')
  }
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('STRIPE_WEBHOOK_SECRET não está configurada.')
  }
}

// Função principal para lidar com eventos do Stripe
export async function POST(req: Request) {
  try {
    validateEnvVars()

    const body = await req.text()
    const signature = req.headers.get('Stripe-signature') as string

    if (!signature) {
      return new NextResponse('Signature header missing', { status: 400 })
    }

    // Verifique e construa o evento Stripe
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      )
    } catch (err) {
      console.error('Erro ao validar o webhook:', err)
      return new NextResponse('Invalid signature', { status: 400 })
    }

    // Desestrutura o objeto de evento
    const { type, data } = event
    const session = data.object as Stripe.Checkout.Session

    // Lógica baseada no tipo de evento
    switch (type) {
      case 'customer.created': {
        const customer = data.object as Stripe.Customer
        console.log(`Novo cliente criado: ${customer.id}`)
        console.log(`Email do cliente: ${customer.email}`)
        // Adicione lógica aqui, como salvar o cliente no banco de dados
        break
      }

      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(session)
        break

      default:
        console.log(`Evento não tratado: ${type}`)
        break
    }

    return new NextResponse('Evento processado com sucesso', { status: 200 })
  } catch (error) {
    console.error('Erro no webhook:', error)
    return new NextResponse('Erro interno', { status: 500 })
  }
}

// Função separada para processar eventos específicos
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  console.log(`Pagamento concluído para a sessão: ${session.id}`)
  // Adicione aqui lógica adicional, como salvar no banco de dados ou enviar e-mail.
}
