import Link from 'next/link'

import { InputPassword } from '@/components/input-password'
import { SubmitButton } from '@/components/submit-button'
import { Input, Label } from '@/components/ui'

import { APP_ROUTES } from '@/app/constants'

import { SignUpViewProps } from '../signUp.types'

export default function BasicInformationPage(props: SignUpViewProps) {
  const {
    basicInformation: { form, onSubmit },
  } = props
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <span className="text-xs">
          PASSO <strong>1</strong> DE <strong>2</strong>
        </span>
        <h4 className="text-xl font-semibold tracking-tight text-gray-700">
          Crie sua conta
        </h4>
        <p className="text-sm text-gray-500">
          Forneça as informações iniciais para começarmos
        </p>
      </div>
      <div className="mt-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="firstName">Nome</Label>
            <Input
              required
              {...form.register('firstName')}
              disabled={form.formState.isSubmitting}
              className="h-14"
              type="text"
              placeholder="Ex: João"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastName">Sobrenome</Label>
            <Input
              required
              {...form.register('lastName')}
              disabled={form.formState.isSubmitting}
              className="h-14"
              type="text"
              placeholder="Ex: Pedro Filho"
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            required
            {...form.register('emailAddress')}
            disabled={form.formState.isSubmitting}
            placeholder="joao@exemplo.com.br"
            className="h-14"
            type="email"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="name">Senha</Label>
          <InputPassword
            type="password"
            required
            {...form.register('password')}
            disabled={form.formState.isSubmitting}
            placeholder="••••••••"
            className="h-14"
          />
        </div>
      </div>
      <div id="clerk-captcha" />
      <SubmitButton
        className="mt-12 h-12 w-full"
        isLoading={form.formState.isSubmitting}
      >
        Continuar
      </SubmitButton>
      <div className="mt-8 flex justify-center">
        <span className="text-sm font-normal text-gray-500">
          Já tem uma conta?{' '}
          <Link
            href={APP_ROUTES.public.signIn}
            className="font-bold text-red-layout transition-colors hover:text-black"
          >
            Entrar
          </Link>
        </span>
      </div>
    </form>
  )
}
