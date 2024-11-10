import Image from 'next/image'
import Link from 'next/link'

import { logotipo } from '@/images'

import { APP_ROUTES } from '@/app/constants'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center bg-gray-100 sm:min-h-screen">
      <div className="mx-auto h-screen w-full px-4 sm:h-auto sm:px-10 md:max-w-xl">
        <div className="mb-8 mt-10 flex justify-center sm:mt-0">
          <Image src={logotipo} alt="Logo" width={300} priority />
        </div>
        <div className="w-full rounded-lg bg-white pb-2 shadow">
          {children}
          <div className="mx-2 flex justify-center rounded-lg bg-slate-100 py-6">
            <span className="text-sm font-normal text-gray-500">
              Não possui conta?{' '}
              <Link
                href={APP_ROUTES.public.signUp}
                className="font-bold text-red-layout transition-colors hover:text-black"
              >
                Criar uma conta
              </Link>
            </span>
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-center text-xs font-normal text-gray-500 sm:flex-row">
          © Mesa Certa <span className="mx-2"> · </span>
          <Link href="#" className="hover:text-black">
            Política de privacidade
          </Link>
          <span className="mx-2"> · </span>
          <Link href="#" className="hover:text-black">
            Termos e condições
          </Link>
        </div>
      </div>
    </div>
  )
}
