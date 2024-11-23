import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'Mesa Certa',
  description: 'Encontre sua mesa para qualquer ocasião',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" expand richColors />
      </body>
    </html>
  )
}
