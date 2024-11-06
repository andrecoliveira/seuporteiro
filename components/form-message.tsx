'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface FormMessageProps {
  translations: Record<string, { title: string; description: string }>
}

export function FormMessage({ translations }: FormMessageProps) {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const error = searchParams.get('error')
  const messageParam = searchParams.get('message')

  if (success) {
    return (
      <div className="border-l-2 border-foreground px-4 text-foreground">
        {success}
      </div>
    )
  }

  if (error) {
    return (
      <Suspense fallback={<div>Carregando...</div>}>
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>{translations[error]?.title}</AlertTitle>
          <AlertDescription>
            {translations[error]?.description || error}
          </AlertDescription>
        </Alert>
      </Suspense>
    )
  }

  return <div className="border-l-2 px-4 text-foreground">{messageParam}</div>
}
