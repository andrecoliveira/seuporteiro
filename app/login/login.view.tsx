import Link from 'next/link'
import { APP_ROUTES } from '@/app/constants'
import LoginForm from './login.form'
import { LoginViewProps } from './login.type'

export default function LoginView(props: LoginViewProps) {
  return (
    <>
      <LoginForm {...props} />
      <div className="sm:p-5">
        <Link href={APP_ROUTES.public.passwordRecovery}>
          <button className="w-full cursor-pointer rounded-lg px-5 py-4 text-sm font-normal text-gray-500 ring-inset transition duration-200 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
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
                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
              />
            </svg>
            <span className="ml-1 inline-block">Esqueceu a senha?</span>
          </button>
        </Link>
      </div>
    </>
  )
}
