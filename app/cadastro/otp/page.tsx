'use client'

import { Suspense } from 'react'

import useOtpCodeModel from './otp.model'
import FormOtpCode from './otp.view'

export default function Page() {
  const methods = useOtpCodeModel()
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <FormOtpCode {...methods} />
    </Suspense>
  )
}
