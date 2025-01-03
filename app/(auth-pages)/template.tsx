import Image from 'next/image'
import Link from 'next/link'

import { Skeleton } from '@/components/ui/skeleton'
import { logotipo } from '@/images'
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs'

import { APP_ROUTES } from '@/app/constants'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center bg-gray-100 sm:min-h-screen">
      <div className="mx-auto h-screen w-full px-4 sm:h-auto sm:px-10 md:max-w-xl">
        <div className="mb-8 mt-10 flex justify-center sm:mt-0">
          <Image src={logotipo} alt="Logo" width={300} priority />
        </div>
        <div className="w-full rounded-lg bg-white p-2 shadow">
          <ClerkLoading>
            <div className="px-4 py-6 sm:px-10 sm:py-8">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="mt-8 h-4 w-12" />
              <Skeleton className="mt-4 h-12 w-full" />
              <Skeleton className="mt-6 h-4 w-12" />
              <Skeleton className="mt-4 h-12 w-full" />
              <Skeleton className="mt-6 h-12 w-full" />
            </div>
          </ClerkLoading>
          <ClerkLoaded>{children}</ClerkLoaded>
          <div className="flex justify-center rounded-lg bg-slate-100 py-6">
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
