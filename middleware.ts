import { NextResponse } from 'next/server'

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define as rotas protegidas
const isProtectedRoute = createRouteMatcher(['/painel(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  // Se o usuário acessar a rota raiz e não estiver autenticado, redirecione para "/entrar"
  if (req.nextUrl.pathname === '/' && !userId) {
    return NextResponse.redirect(new URL('/entrar', req.url))
  }

  // Se o usuário estiver autenticado e a rota atual não for "/painel", redirecione para "/painel"
  if (userId && !req.nextUrl.pathname.startsWith('/painel')) {
    return NextResponse.redirect(new URL('/painel', req.url))
  }

  // Se o usuário não estiver autenticado e tentar acessar uma rota protegida, redirecione para "/entrar"
  if (!userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL('/entrar', req.url))
  }

  // Permite o acesso à rota atual
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Aplica o middleware para todas as rotas relevantes
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
