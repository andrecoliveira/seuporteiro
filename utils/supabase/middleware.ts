import { type NextRequest, NextResponse } from 'next/server'

import { APP_ROUTES } from '@/app/constants'
import { getSubscription, getTenant, getUser } from '@/app/painel/actions'

export const updateSession = async (request: NextRequest) => {
  try {
    // Cria uma resposta padrão
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    // Obtém a sessão do usuário
    const session = await getUser()

    // Define tipos de rota
    const isPrivatePanelRoute = request.nextUrl.pathname.startsWith(
      APP_ROUTES.private.painel,
    )
    const isRootRoute = request.nextUrl.pathname === '/'
    const isSubscriptionRoute =
      request.nextUrl.pathname === APP_ROUTES.private.subscription

    // **1. Usuário não autenticado (rotas públicas ou não permitidas)**
    if (session.error) {
      // Redireciona para a página de login se estiver em rotas privadas ou na raiz
      if (isPrivatePanelRoute || isRootRoute) {
        return NextResponse.redirect(
          new URL(APP_ROUTES.public.signIn, request.url),
        )
      }
      // Para rotas públicas, nenhuma ação é necessária
      return response
    }

    // **2. Usuário autenticado**
    const tenant = await getTenant(session.data.user?.id)

    // Obtém o status da assinatura se houver um `stripe_id`
    const subscriptionStatus = tenant.stripe_id
      ? await getSubscription(tenant.stripe_id, 'all')
      : null

    // Verifica se o status da assinatura existe e não é "active"
    if (!subscriptionStatus?.status && !isSubscriptionRoute) {
      return NextResponse.redirect(
        new URL(APP_ROUTES.private.subscription, request.url),
      )
    }

    // Redireciona para o painel se o usuário estiver em rotas públicas ou na raiz
    if (!isPrivatePanelRoute && !isSubscriptionRoute) {
      return NextResponse.redirect(
        new URL(APP_ROUTES.private.painel, request.url),
      )
    }

    // Retorna a resposta padrão
    return response
  } catch (error) {
    console.error('Erro ao atualizar a sessão:', error)

    // Retorna a resposta padrão em caso de erro
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}
