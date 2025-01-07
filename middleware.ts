import { NextResponse } from 'next/server'

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

import { APP_ROUTES } from './app/constants'

import { redis } from './lib/upstash'

const isProtectedRoute = createRouteMatcher(['/painel(.*)', '/assinatura(.*)'])

async function hasActiveSubscription(userId: string): Promise<boolean> {
  const subscription = await redis.get(userId)
  return Boolean(subscription)
}

function redirectTo(url: string, req: Request) {
  return NextResponse.rewrite(new URL(url, req.url))
}

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  if (!userId) {
    if (req.nextUrl.pathname === '/' || isProtectedRoute(req)) {
      return redirectTo(APP_ROUTES.public.signIn, req)
    }
    return NextResponse.next()
  }

  const hasSubscription = await hasActiveSubscription(userId)

  // Redireciona para /assinatura se a assinatura não for válida
  if (!hasSubscription) {
    return redirectTo(APP_ROUTES.private.subscription, req)
  }

  // Redireciona para /painel somente se o usuário está autenticado e tem assinatura
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
