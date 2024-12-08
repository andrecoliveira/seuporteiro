import { InputPassword } from '@/components/input-password'
import { SubmitButton } from '@/components/submit-button'
import { Input, Label } from '@/components/ui'
import { CircleCheck } from 'lucide-react'

import { SignUpViewProps } from '../signUp.types'

export default function FormAccount(props: SignUpViewProps) {
  const { accountForm, handleAccountFormSubmit } = props
  const isSubmitting = accountForm.formState.isSubmitting
  return (
    <>
      <div className="space-y-1">
        <span className="text-xs">
          PASSO <strong>2</strong> DE <strong>3</strong>
        </span>
        <h4 className="text-xl font-semibold tracking-tight text-gray-700">
          Responsável pela loja
        </h4>
        <p className="text-sm text-gray-500">
          Você usará esse e-mail para acessar sua conta
        </p>
      </div>
      <form onSubmit={accountForm.handleSubmit(handleAccountFormSubmit)}>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="legalResponsibleName">Nome do responsável</Label>
            <Input
              {...accountForm.register('legalResponsibleName')}
              id="legalResponsibleName"
              disabled={isSubmitting}
              placeholder="Ex: João Pedro Filho"
              className="h-14"
              autoComplete="name"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email de contato</Label>
            <Input
              {...accountForm.register('email')}
              id="email"
              disabled={isSubmitting}
              placeholder="joao@exemplo.com.br"
              autoComplete="email"
              className="h-14"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Senha</Label>
            <InputPassword
              {...accountForm.register('password')}
              id="password"
              disabled={isSubmitting}
              placeholder="••••••••"
              autoComplete="off"
              className="h-14"
              type="password"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <InputPassword
              {...accountForm.register('confirmPassword')}
              id="confirmPassword"
              disabled={isSubmitting}
              placeholder="••••••••"
              autoComplete="off"
              className="h-14"
              type="password"
            />
          </div>
          <div className="space-y-1">
            <p className="text-sm">Sua senha deve conter:</p>
            <p className="flex items-center gap-2 text-sm">
              <CircleCheck
                size={16}
                className={
                  props.validation.minLength ? 'text-emerald-600' : undefined
                }
              />
              8 ou mais caracteres
            </p>
            <p className="flex items-center gap-2 text-sm">
              <CircleCheck
                size={16}
                className={
                  props.validation.case ? 'text-emerald-600' : undefined
                }
              />
              Letras maiúsculas e minúsculas
            </p>
            <p className="flex items-center gap-2 text-sm">
              <CircleCheck
                size={16}
                className={
                  props.validation.hasNumber ? 'text-emerald-600' : undefined
                }
              />
              Pelo menos um número
            </p>
            <p className="flex items-center gap-2 text-sm">
              <CircleCheck
                size={16}
                className={
                  props.validation.specialCharacter
                    ? 'text-emerald-600'
                    : undefined
                }
              />
              Pelo menos um caracter especial
            </p>
          </div>
        </div>
        <SubmitButton
          isLoading={accountForm.formState.isSubmitting}
          className="mt-8 h-12 w-full"
        >
          Continuar
        </SubmitButton>
      </form>
    </>
  )
}

{
  /* Restaurante - Cafeteria - Bar / Casa Noturna - Comida Rápida -
              Outro negócio gastronômico - Outro negócio não gastronômico */
}
