import Link from 'next/link'

import { SubmitButton } from '@/components/submit-button'
import { Input, Label } from '@/components/ui'

import { APP_ROUTES } from '@/app/constants'

export default function Page() {
  return (
    <form className="space-y-6 px-4 py-6 sm:px-10 sm:py-8">
      <div className="space-y-2">
        <h4 className="text-xl font-semibold tracking-tight text-gray-700">
          Redefinir sua senha
        </h4>
        <p className="text-sm text-gray-500">
          Insira o endereço de e-mail associado à sua conta e lhe enviaremos um
          link para redefinir sua senha.
        </p>
      </div>
      {/* <FormMessage translations={messages} /> */}
      <div className="space-y-3">
        <Label htmlFor="email">E-mail</Label>
        <Input
          name="email"
          placeholder="joao@exemplo.com"
          className="h-14"
          required
        />
      </div>
      <SubmitButton className="h-12 w-full">Continuar</SubmitButton>
      <div className="flex justify-center">
        <Link
          href={APP_ROUTES.public.signIn}
          className="text-red-layout transition-colors hover:text-black"
        >
          <Label className="hover:cursor-pointer">Retornar para entrar</Label>
        </Link>
      </div>
    </form>
  )
}
