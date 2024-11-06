import Link from 'next/link'

import { FormMessage } from '@/components/form-message'
import { InputPassword } from '@/components/input-password'
import { SubmitButton } from '@/components/submit-button'
import { Input, Label } from '@/components/ui'

import { APP_ROUTES } from '@/app/constants'

import { messages } from '../messages'
import useSignInModel from './signIn.model'

type LoginViewProps = ReturnType<typeof useSignInModel>

export default function SignInPage(props: LoginViewProps) {
  return (
    <form
      className="space-y-6 px-4 py-6 sm:px-10 sm:py-8"
      onSubmit={props.handleSubmit}
    >
      <h4 className="text-xl font-semibold tracking-tight text-gray-700">
        Entre na sua conta
      </h4>
      <FormMessage translations={messages} />
      <div className="space-y-3">
        <Label htmlFor="email">E-mail</Label>
        <Input
          name="email"
          placeholder="joao@exemplo.com"
          className="h-14"
          required
        />
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <Label htmlFor="password">Senha</Label>
          <Link
            href={APP_ROUTES.public.reset}
            className="text-red-layout transition-colors hover:text-black"
          >
            <Label className="hover:cursor-pointer">Esqueceu sua senha?</Label>
          </Link>
        </div>
        <InputPassword
          name="password"
          placeholder="••••••••"
          className="h-14"
          type="password"
        />
      </div>
      <SubmitButton className="h-12 w-full">Entrar</SubmitButton>
    </form>
  )
}
