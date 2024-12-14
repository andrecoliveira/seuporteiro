'use client'

import { Suspense } from 'react'

import useInformationsModel from './informacoes.model'
import FormInformation from './informacoes.view'

export default function Page() {
  const methods = useInformationsModel()
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <FormInformation {...methods} />
    </Suspense>
  )
}
