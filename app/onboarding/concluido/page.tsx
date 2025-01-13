'use client'

import Image from 'next/image'

import { congratulations, logotipo } from '@/images'

import useFormModel from './form.model'
import Form from './form.view'

export default function Page() {
  const methods = useFormModel()
  return (
    <div className="space-y-8">
      <div className="w-full rounded-lg bg-white p-10 shadow">
        <div className="mb-8 flex flex-col items-center justify-center space-y-10">
          <Image src={logotipo} alt="Logo" width={200} />
          <Image src={congratulations} alt="Logo" width={200} />
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold">
              Assinatura ativa com sucesso
            </h3>
            <p className="text-gray-500">
              Agora, vamos começar configurando sua organização.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full rounded-lg bg-white p-10 shadow">
        <Form {...methods} />
      </div>
    </div>
  )
}
