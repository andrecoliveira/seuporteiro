import { NextResponse } from 'next/server'

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

import { APP_ROUTES } from './app/constants'

const isProtectedRoute = createRouteMatcher(['/painel(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  if (!userId) {
    if (req.nextUrl.pathname === '/' || isProtectedRoute(req)) {
      return NextResponse.rewrite(new URL(APP_ROUTES.public.signIn, req.url))
    }
    return NextResponse.next()
  }

  if (req.nextUrl.pathname === '/' || !isProtectedRoute(req)) {
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
