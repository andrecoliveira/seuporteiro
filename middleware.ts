import { NextResponse } from 'next/server'

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

import { APP_ROUTES } from './app/constants'

const isProtectedRoute = createRouteMatcher(['/painel(.*)'])

const privateRoute = APP_ROUTES.private.painel
const signInRoute = APP_ROUTES.public.signIn
const pricingRoute = APP_ROUTES.private.subscription

export default clerkMiddleware(async (auth, req) => {
  const { userId, getToken } = await auth()

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        // Get the custom Supabase token from Clerk
        fetch: async (url, options = {}) => {
          const clerkToken = await getToken({
            template: 'supabase',
          })

          // Insert the Clerk Supabase token into the headers
          const headers = new Headers(options?.headers)
          headers.set('Authorization', `Bearer ${clerkToken}`)

          // Now call the default fetch
          return fetch(url, {
            ...options,
            headers,
          })
        },
      },
    },
  )

  const { data: subscription } = await client
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()

  if (req.nextUrl.pathname === '/' && !userId) {
    return NextResponse.redirect(new URL(signInRoute, req.url))
  }

  if (userId) {
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
