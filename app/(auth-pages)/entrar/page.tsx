'use client'

import { ErrorMessage } from '@/components/error-message'
import { InputPassword } from '@/components/input-password'
import { SubmitButton } from '@/components/submit-button'
import { Input, Label } from '@/components/ui'
import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'

export default function Page() {
  return (
    <SignIn.Root>
      <Clerk.Loading>
        {(isGlobalLoading) => (
          <div className="space-y-6 px-4 py-6 sm:px-10 sm:py-8">
            <h4 className="text-xl font-semibold tracking-tight text-gray-700">
              Entre na sua conta
            </h4>
            <SignIn.Step name="start" className="space-y-4">
              <div className="space-y-1">
                <Clerk.Field name="identifier" className="space-y-2">
                  <Clerk.Label asChild>
                    <Label htmlFor="email">E-mail</Label>
                  </Clerk.Label>
                  <Clerk.Input
                    type="email"
                    required
                    asChild
                    disabled={isGlobalLoading}
                    placeholder="joao@exemplo.com"
                    className="h-14"
                  >
                    <Input />
                  </Clerk.Input>
                  <ErrorMessage />
                </Clerk.Field>
              </div>
              <div className="space-y-1">
                <Clerk.Field name="password" className="space-y-2">
                  <Clerk.Label asChild>
                    <Label htmlFor="email">Senha</Label>
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
                </Clerk.Field>
              </div>
              <SignIn.Action submit asChild>
                <SubmitButton
                  className="h-12 w-full"
                  isLoading={isGlobalLoading}
                >
                  Continuar
                </SubmitButton>
              </SignIn.Action>
            </SignIn.Step>
          </div>
        )}
      </Clerk.Loading>
    </SignIn.Root>
  )
}
