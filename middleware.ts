import { NextResponse } from 'next/server'

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

import { APP_ROUTES } from './app/constants'

import { getSubscription } from './actions/get-subscription'

const isProtectedRoute = createRouteMatcher(['/painel(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  const privateRoute = APP_ROUTES.private.painel
  const signInRoute = APP_ROUTES.public.signIn
  const pricingRoute = APP_ROUTES.private.subscription

  if (req.nextUrl.pathname === '/' && !userId) {
    return NextResponse.redirect(new URL(signInRoute, req.url))
  }

  if (userId) {
    const subscription = await getSubscription(userId)

    // Se não tiver assinatura e não estiver na página de pricing
    if (!subscription && !req.nextUrl.pathname.startsWith(pricingRoute)) {
      return NextResponse.redirect(new URL(pricingRoute, req.url))
    }

    // Se tiver assinatura mas não estiver no painel
    if (subscription && !req.nextUrl.pathname.startsWith(privateRoute)) {
      return NextResponse.redirect(new URL(privateRoute, req.url))
    }
  }

  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL(signInRoute, req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
