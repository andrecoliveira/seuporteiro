'use client'

import { Suspense } from 'react'

import useAccountModel from './conta.model'
import FormAccount from './conta.view'

export default function Page() {
  const methods = useAccountModel()
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <FormAccount {...methods} />
    </Suspense>
  )
}
