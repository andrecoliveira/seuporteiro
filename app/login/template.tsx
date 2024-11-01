import Image from 'next/image'
import Link from 'next/link'
import { logotipo } from '@/images'

import { APP_ROUTES } from '@/app/constants'

interface TemplateProps {
  children: React.ReactNode
}

export default async function Template({ children }: TemplateProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100">
      <div className="mx-auto px-4 sm:px-10 md:w-full md:max-w-md">
        <div className="mb-8 flex justify-center">
          <Image src={logotipo} alt="Logo" width={300} />
        </div>
        <div className="w-full divide-y divide-gray-200 rounded-lg sm:bg-white sm:shadow">
          {children}
        </div>
        <div className="p-5">
          <Link href={APP_ROUTES.public.home}>
            <button className="w-full cursor-pointer rounded-lg px-5 py-4 text-sm font-normal text-gray-500 ring-inset transition duration-200 hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline-block h-4 w-4 align-text-top"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="ml-1 inline-block">
                Retornar à página inicial
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
