import { NextResponse } from 'next/server'

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

import { APP_ROUTES } from './app/constants'

import { redis } from './lib/upstash'

const isProtectedRoute = createRouteMatcher(['/painel(.*)', '/onboarding(.*)'])

function redirectTo(url: string, req: Request) {
  return NextResponse.redirect(new URL(url, req.url))
}

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  // Verifica se o usuário está autenticado
  if (!userId) {
    if (req.nextUrl.pathname === '/' || isProtectedRoute(req)) {
      return redirectTo(APP_ROUTES.public.signIn, req)
    }
    return NextResponse.next()
  }

  // Verifica status de onboarding no Redis
  const onboarding = await redis.get<number>(userId)

  if (onboarding) {
    if (
      onboarding === 1 &&
      req.nextUrl.pathname === APP_ROUTES.private.onboarding.plans
    ) {
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
  if (req.nextUrl.pathname === '/' || !isProtectedRoute(req)) {
    return redirectTo(APP_ROUTES.private.painel, req)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
