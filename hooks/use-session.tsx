'use client'

import React, { createContext, useContext, ReactNode } from 'react'

import { User } from '@supabase/supabase-js'

interface SessionContextProps {
  children: ReactNode
  session: User
}

interface SessionContext {
  session: User
}

const CreateSessionContext = createContext<SessionContext | undefined>(
  undefined,
)

function SessionProvider({ children, session }: SessionContextProps) {
  return (
    <CreateSessionContext.Provider value={{ session }}>
      {children}
    </CreateSessionContext.Provider>
  )
}

function useSession() {
  const context = useContext(CreateSessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}

export { SessionProvider, useSession }
