import { NextResponse } from 'next/server'

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

import { APP_ROUTES } from './app/constants'

import { redis } from './lib/upstash'

const isProtectedRoute = createRouteMatcher(['/painel(.*)', '/onboarding(.*)'])
const isApiRoute = (pathname: string) => pathname.startsWith('/api')
const isOnboardingRoute = (pathname: string) =>
  pathname.startsWith('/onboarding')

function redirectTo(url: string, req: Request) {
  return NextResponse.rewrite(new URL(url, req.url))
}

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const pathname = req.nextUrl.pathname

  // Permitir acesso às rotas da API
  if (isApiRoute(pathname)) {
    return NextResponse.next()
  }

  // Verifica se o usuário está autenticado
  if (!userId) {
    if (pathname === '/' || isProtectedRoute(req)) {
      return NextResponse.rewrite(new URL(APP_ROUTES.public.signIn, req.url))
    }
    return NextResponse.next()
  }

  // Verifica status de onboarding no Redis
  const onboarding = await redis.get<number>(userId)

  if (onboarding) {
    if (onboarding === 1 && pathname === APP_ROUTES.private.onboarding.plans) {
      return redirectTo(APP_ROUTES.private.onboarding.plans, req)
    }

    const onboardingRoutes: Record<number, string> = {
      1: APP_ROUTES.private.onboarding.initial,
      2: APP_ROUTES.private.onboarding.accomplished,
    }
    const targetRoute =
      onboardingRoutes[onboarding] || APP_ROUTES.private.painel
    return redirectTo(targetRoute, req)
  }

  // Se não for rota protegida e estiver autenticado, redireciona para o painel
  if (
    req.nextUrl.pathname === '/' ||
    !isProtectedRoute(req) ||
    isOnboardingRoute(pathname)
  ) {
    return NextResponse.redirect(new URL(APP_ROUTES.private.painel, req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
