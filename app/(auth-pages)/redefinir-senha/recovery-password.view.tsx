'use client'

import Link from 'next/link'

import { InputPassword } from '@/components/input-password'
import { SubmitButton } from '@/components/submit-button'
import { Input, Label } from '@/components/ui'

import { APP_ROUTES } from '@/app/constants'

import useRecoveryPasswordModel from './recovery-password.model'

export type RecoveryPasswordProps = ReturnType<typeof useRecoveryPasswordModel>

export default function Page(props: RecoveryPasswordProps) {
  if (!props) return null
  const { form, successfulCreation, create, reset } = props
  return (
    <form
      className="space-y-6 px-4 py-6 sm:px-10 sm:py-8"
      onSubmit={form.handleSubmit(!successfulCreation ? create : reset)}
    >
      {!successfulCreation && (
        <>
          <div className="space-y-2">
            <h4 className="text-xl font-semibold tracking-tight text-gray-700">
              Redefinir sua senha
            </h4>
            <p className="text-sm text-gray-500">
              Insira o endereço de e-mail associado à sua conta e lhe enviaremos
              um código para redefinir sua senha.
            </p>
          </div>
          <div className="space-y-3">
            <Label htmlFor="email">E-mail</Label>
            <Input
              {...form.register('email')}
              placeholder="joao@exemplo.com"
              className="h-14"
              required
            />
            {form.formState.errors.email && (
              <span className="block text-sm text-destructive">
                {form.formState.errors.email?.message}
              </span>
            )}
          </div>
          <SubmitButton
            className="h-12 w-full"
            isLoading={form.formState.isSubmitting}
          >
            Continuar
          </SubmitButton>
          <div className="flex justify-center">
            <Link
              href={APP_ROUTES.public.signIn}
              className="text-primary-color transition-colors hover:text-black"
            >
              <Label className="hover:cursor-pointer">
                Retornar para entrar
              </Label>
            </Link>
          </div>
        </>
      )}

      {successfulCreation && (
        <>
          <div className="space-y-2">
            <h4 className="text-xl font-semibold tracking-tight text-gray-700">
              Redefinir sua senha
            </h4>
            <p className="text-sm text-gray-500">
              Utilize o código enviado para o email{' '}
              <strong>{form.getValues('email')}</strong>
            </p>
          </div>
          <div className="space-y-3">
            <Label htmlFor="password">Nova senha</Label>
            <InputPassword
              type="password"
              {...form.register('password')}
              className="h-14"
              required
            />
            {form.formState.errors.password && (
              <span className="block text-sm text-destructive">
                {form.formState.errors.password?.message}
              </span>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="code">Código</Label>
            <Input {...form.register('code')} className="h-14" required />
            {form.formState.errors.code && (
              <span className="block text-sm text-destructive">
                {form.formState.errors.code?.message}
              </span>
            )}
          </div>
          <SubmitButton
            className="h-12 w-full"
            isLoading={form.formState.isSubmitting}
          >
            Redefinir
          </SubmitButton>
        </>
      )}
    </form>
  )
}
