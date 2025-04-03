import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui'
import { enjoy, logotipo } from '@/images'
import { currentUser } from '@clerk/nextjs/server'

import { APP_ROUTES } from '../constants'

function Greetings({ firstName }: Readonly<{ firstName: string }>) {
  return (
    <div className="space-y-2 text-center">
      <h3 className="text-xl font-semibold">
        Olá {firstName}, obrigado por se inscrever!
      </h3>
      <p className="text-gray-500">
        Estamos prontos para ajudá-lo a oferecer experiências incríveis aos seus
        clientes. Vamos começar?
      </p>
    </div>
  )
}

function Steps() {
  return (
    <div className="mt-4 space-y-6 rounded-lg bg-gray-100 p-8">
      <div className="flex gap-4">
        <div>
          <div className="text-primary-color flex h-8 w-8 items-center justify-center rounded-full bg-white font-bold">
            1
          </div>
        </div>
        <div>
          <h4 className="text-md font-semibold">Assine um plano</h4>
          <p className="text-sm text-gray-500">
            Selecione o plano que atenda às necessidades do seu negócio
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <div className="text-primary-color flex h-8 w-8 items-center justify-center rounded-full bg-white font-bold">
            2
          </div>
        </div>
        <div>
          <h4 className="text-md font-semibold">Crie sua organização</h4>
          <p className="text-sm text-gray-500">
            Complete o formulário cadastrando as informações do seu negócio
          </p>
        </div>
      </div>
    </div>
  )
}

export default async function Page() {
  const user = await currentUser()

  return (
    <div className="w-full rounded-lg bg-white p-10 shadow">
      <div className="flex flex-col items-center justify-center space-y-10">
        <Image src={logotipo} alt="Logo" width={200} />
        <Image src={enjoy} alt="Logo" width={200} />
        <Greetings firstName={user?.firstName || ''} />
      </div>
      <div className="mt-12">
        <h3 className="text-left text-lg font-semibold">Próximos passos</h3>
        <Steps />
      </div>
      <Link href={APP_ROUTES.private.onboarding.plans}>
        <Button className="mt-8 h-12 w-full">Continuar</Button>
      </Link>
    </div>
  )
}
