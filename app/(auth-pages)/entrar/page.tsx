'use client'

import { Suspense } from 'react'

import useSignInModel from './signIn.model'
import SignInPage from './signIn.view'

export default function Page() {
  const methods = useSignInModel()
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SignInPage {...methods} />
    </Suspense>
  )
}
