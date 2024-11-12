import Image from 'next/image'
import Link from 'next/link'

import { logotipo } from '@/images'

import { APP_ROUTES } from '@/app/constants'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-4 sm:px-10 lg:px-24">
        <div className="mb-10 flex justify-center px-10">
          <Image src={logotipo} alt="Logo" width={300} priority />
        </div>
        <div className="mb-8 space-y-1">
          <h4 className="text-xl font-semibold tracking-tight text-gray-700">
            Faça seu cadastro
          </h4>
          <p className="text-sm text-gray-500">
            Preencha com os dados do seu negócio
          </p>
        </div>
        {children}
        <div className="mt-8 flex justify-center">
          <span className="text-sm font-normal text-gray-500">
            Já tem uma conta?{' '}
            <Link
              href={APP_ROUTES.public.signIn}
              className="font-bold text-red-layout transition-colors hover:text-black"
            >
              Entrar
            </Link>
          </span>
        </div>
      </div>
      <div className="hidden content-center bg-red-layout px-24 lg:block">
        <h2 className="text-4xl font-bold text-white">
          Reserve sua mesa nos melhores restaurantes
        </h2>
        <h4 className="mt-4 text-red-200">
          Encontre e garanta seu lugar nos restaurantes mais desejados da
          cidade. Descubra novas experiências gastronômicas, personalize suas
          reservas e aproveite cada momento.
        </h4>
      </div>
    </div>
  )
}
