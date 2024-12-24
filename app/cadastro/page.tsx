'use client'

import Link from 'next/link'
import { Suspense } from 'react'

import { ErrorMessage } from '@/components/error-message'
import { InputPassword } from '@/components/input-password'
import { SubmitButton } from '@/components/submit-button'
import { Button, Input, Label } from '@/components/ui'
import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'

import { cn } from '@/lib/utils'

import { APP_ROUTES } from '@/app/constants'

export default function Page() {
  return (
    <Suspense fallback={<>Carregando...</>}>
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name="start">
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
                    <Clerk.Field name="firstName" className="space-y-2">
                      <div className="space-y-1">
                        <Clerk.Label asChild>
                          <Label htmlFor="firstName">Nome</Label>
                        </Clerk.Label>
                        <Clerk.Input
                          required
                          asChild
                          className="h-14"
                          disabled={isGlobalLoading}
                        >
                          <Input />
                        </Clerk.Input>
                      </div>
                    </Clerk.Field>
                    <Clerk.Field name="lastName" className="space-y-2">
                      <div className="space-y-1">
                        <Clerk.Label asChild>
                          <Label htmlFor="lastName">Sobrenome</Label>
                        </Clerk.Label>
                        <Clerk.Input
                          required
                          asChild
                          className="h-14"
                          disabled={isGlobalLoading}
                        >
                          <Input />
                        </Clerk.Input>
                      </div>
                    </Clerk.Field>
                  </div>
                  <Clerk.Field name="emailAddress" className="space-y-2">
                    <div className="space-y-1">
                      <Clerk.Label asChild>
                        <Label htmlFor="email">E-mail</Label>
                      </Clerk.Label>
                      <Clerk.Input
                        type="email"
                        required
                        asChild
                        className="h-14"
                        disabled={isGlobalLoading}
                      >
                        <Input />
                      </Clerk.Input>
                      <ErrorMessage />
                    </div>
                  </Clerk.Field>
                  <Clerk.Field name="password" className="space-y-2">
                    <div className="space-y-1">
                      <Clerk.Label asChild>
                        <Label htmlFor="name">Senha</Label>
                      </Clerk.Label>
                      <Clerk.Input
                        type="password"
                        required
                        asChild
                        disabled={isGlobalLoading}
                        placeholder="••••••••"
                        className="h-14"
                      >
                        <InputPassword />
                      </Clerk.Input>
                      <ErrorMessage />
                    </div>
                  </Clerk.Field>
                </div>
                <div className="h-12">
                  <SignUp.Captcha className="empty:hidden" />
                </div>
                <SignUp.Action submit asChild>
                  <SubmitButton
                    className="h-12 w-full"
                    isLoading={isGlobalLoading}
                  >
                    Continuar
                  </SubmitButton>
                </SignUp.Action>
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
              </SignUp.Step>

              <SignUp.Step name="verifications">
                <SignUp.Strategy name="email_code">
                  <div className="space-y-1">
                    <span className="text-xs">
                      PASSO <strong>2</strong> DE <strong>2</strong>
                    </span>
                    <h4 className="text-xl font-semibold tracking-tight text-gray-700">
                      Quase lá!
                    </h4>
                    <p className="text-sm text-gray-500">
                      Insira o código de verificação enviado para o seu e-mail:
                    </p>
                  </div>
                  <div className="my-16">
                    <Clerk.Field name="code" className="space-y-2">
                      <div className="space-y-1">
                        <Clerk.Input
                          type="otp"
                          className="flex justify-center has-[:disabled]:opacity-50"
                          autoSubmit
                          render={({ value, status }) => {
                            return (
                              <div
                                data-status={status}
                                className={cn(
                                  'relative flex size-10 h-16 w-14 items-center justify-center border-y border-r border-input text-xl transition-all first:rounded-l-md first:border-l last:rounded-r-md',
                                  {
                                    'z-10 ring-2 ring-ring ring-offset-background':
                                      status === 'cursor' ||
                                      status === 'selected',
                                  },
                                )}
                              >
                                {value}
                                {status === 'cursor' && (
                                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                    <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                                  </div>
                                )}
                              </div>
                            )
                          }}
                        />
                      </div>
                    </Clerk.Field>
                    <Clerk.FieldError className="block text-sm text-destructive" />
                    <div className="mt-5 flex justify-center">
                      <SignUp.Action
                        asChild
                        resend
                        fallback={({ resendableAfter }) => (
                          <span className="text-sm text-gray-500">
                            Ainda não recebeu o código? Você pode reenviar em{' '}
                            <strong>{resendableAfter} segundos</strong>
                          </span>
                        )}
                      >
                        <Button type="button" variant="link">
                          Reenviar um novo código agora
                        </Button>
                      </SignUp.Action>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <SignUp.Action submit asChild>
                      <SubmitButton
                        className="h-12 w-1/2"
                        isLoading={isGlobalLoading}
                      >
                        Validar
                      </SubmitButton>
                    </SignUp.Action>
                  </div>
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </Suspense>
  )
}
