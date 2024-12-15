'use client'

import { Suspense } from 'react'

import useSignUpModel from './signUp.model'
import SignUpPage from './signUp.view'

export default function Page() {
  const methods = useSignUpModel()
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SignUpPage {...methods} />
    </Suspense>
  )
}
