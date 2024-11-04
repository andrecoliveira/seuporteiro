import Image from 'next/image'
import Link from 'next/link'

import { logotipo } from '@/images'

export default async function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100">
      <div className="mx-auto px-4 sm:px-10 md:w-full md:max-w-md">
        <div className="mb-8 flex justify-center">
          <Image src={logotipo} alt="Logo" width={300} />
        </div>
        <div className="w-full divide-y divide-gray-200 rounded-lg sm:bg-white sm:shadow">
          {children}
        </div>
        <div className="mt-8 flex justify-center">
          <span className="text-sm font-normal text-gray-500">
            Ainda não possui cadastro?{' '}
            <Link
              href="#"
              className="text-blue-600 transition-colors hover:text-blue-800 hover:underline"
            >
              Cadastre-se
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}
