import { NextResponse } from 'next/server'

export function handleError(logMessage: string, error: unknown): NextResponse {
  console.error(logMessage, error)
  const errorMessage = error instanceof Error ? error.message : 'Unknown error'
  return NextResponse.json({ error: errorMessage }, { status: 500 })
}
