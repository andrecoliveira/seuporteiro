import { type NextRequest, NextResponse } from 'next/server'

import { APP_ROUTES } from '@/app/constants'

import { createClient } from './server'

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    const response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = await createClient()

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser()

    // public routes
    if (
      request.nextUrl.pathname.startsWith(APP_ROUTES.private.painel) &&
      user.error
    ) {
      return NextResponse.redirect(
        new URL(APP_ROUTES.public.signIn, request.url),
      )
    }

    if (request.nextUrl.pathname === '/' && user.error) {
      return NextResponse.redirect(
        new URL(APP_ROUTES.public.signIn, request.url),
      )
    }

    // private routes
    if (request.nextUrl.pathname === '/' && !user.error) {
      return NextResponse.redirect(
        new URL(APP_ROUTES.private.painel, request.url),
      )
    }

    return response
  } catch {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}
