import Image from 'next/image'
import Link from 'next/link'

import { logotipo } from '@/images'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100">
      <div className="mx-auto sm:px-10 md:w-full md:max-w-xl">
        <div className="mb-8 flex justify-center">
          <Image src={logotipo} alt="Logo" width={300} priority />
        </div>
        <div className="w-full divide-y divide-gray-200 rounded-lg sm:bg-white sm:px-10 sm:py-8 sm:shadow">
          {children}
        </div>
        <div className="mt-8 flex justify-center">
          <span className="text-sm font-normal text-gray-500">
            Não possui conta?{' '}
            <Link
              href="#"
              className="text-red-layout transition-colors hover:text-black"
            >
              Criar uma conta
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
