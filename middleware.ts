import { NextResponse } from 'next/server'

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// import { get } from '@vercel/edge-config'

import { APP_ROUTES } from './app/constants'

import { redis } from './lib/upstash'

// Rotas protegidas
const isProtectedRoute = createRouteMatcher(['/painel(.*)', '/assinatura(.*)'])

// Verifica se o usuário possui uma assinatura ativa
async function hasActiveSubscription(userId: string): Promise<boolean> {
  // const subscription = await get(userId)
  const subscription = await redis.get(userId)
  return Boolean(subscription)
}

// Redireciona para a rota apropriada
function redirectTo(url: string, req: Request) {
  return NextResponse.rewrite(new URL(url, req.url))
}

// Middleware principal
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  // Redireciona usuários não autenticados
  if (!userId) {
    if (req.nextUrl.pathname === '/' || isProtectedRoute(req)) {
      return redirectTo(APP_ROUTES.public.signIn, req)
    }
    return NextResponse.next()
  }

  // Verifica assinatura ativa
  const hasSubscription = await hasActiveSubscription(userId)

  // Redireciona para /assinatura se a assinatura não for válida
  if (!hasSubscription) {
    return redirectTo(APP_ROUTES.private.subscription, req)
  }

  // Redireciona para /painel somente se o usuário está autenticado e tem assinatura
  if (req.nextUrl.pathname === '/' || !isProtectedRoute(req)) {
    return redirectTo(APP_ROUTES.private.painel, req)
  }

  // Permite continuar para rotas protegidas
  return NextResponse.next()
})

// Configuração para roteamento
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
