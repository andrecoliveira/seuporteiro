import Link from 'next/link'

import { signInAction } from '@/app/(auth-pages)/actions'
import { FormMessage, Message } from '@/components/form-message'
import { InputPassword } from '@/components/input-password'
import { SubmitButton } from '@/components/submit-button'
import { Input, Label } from '@/components/ui'

import { APP_ROUTES } from '@/app/constants'

export default async function SignInPage(props: {
  searchParams: Promise<Message>
}) {
  const searchParams = await props.searchParams
  return (
    <>
      <form className="space-y-6 sm:p-5">
        <FormMessage message={searchParams} />
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            name="email"
            placeholder="joao@exemplo.com"
            className="h-14"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <InputPassword
            placeholder="••••••••"
            className="h-14"
            type="password"
          />
        </div>
        <SubmitButton formAction={signInAction} className="h-12 w-full">
          Entrar
        </SubmitButton>
      </form>
      <div className="mt-4 border-none sm:mt-0 sm:p-5">
        <Link href={APP_ROUTES.public.passwordRecovery}>
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
