import Link from 'next/link'

import { SubmitButton } from '@/components/submit-button'
import { Input, Label } from '@/components/ui'

import { normalizeCNPJ } from '@/utils/normalize'

import { APP_ROUTES } from '@/app/constants'

import { InformationViewProps } from '../signUp.types'

export default function FormInformation(props: InformationViewProps) {
  const { informationForm, handleInfoFormSubmit } = props
  const isSubmitting = informationForm.formState.isSubmitting
  return (
    <>
      <div className="space-y-1">
        <span className="text-xs">
          PASSO <strong>1</strong> DE <strong>3</strong>
        </span>
        <h4 className="text-xl font-semibold tracking-tight text-gray-700">
          Informações da loja
        </h4>
        <p className="text-sm text-gray-500">
          Preencha com os dados do seu negócio
        </p>
      </div>
      <form onSubmit={informationForm.handleSubmit(handleInfoFormSubmit)}>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              {...informationForm.register('cnpj', {
                onChange: (e) => {
                  const { value } = e.target
                  e.target.value = normalizeCNPJ(value)
                },
              })}
              id="cnpj"
              disabled={isSubmitting}
              placeholder="00.000.000/0000-00"
              className="h-14"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">Nome do seu negócio</Label>
            <Input
              {...informationForm.register('name')}
              id="name"
              disabled={isSubmitting}
              placeholder="Ex: Verana Cuccina"
              className="h-14"
              required
            />
          </div>
          <div className="w-full space-y-1">
            <Label htmlFor="pathname">Endereço da página da loja</Label>
            <div className="flex gap-2">
              <div className="flex h-14 items-center rounded-md bg-slate-100 px-4 text-xs font-semibold">
                mesacerta.com/
              </div>
              <Input
                {...informationForm.register('pathname')}
                id="pathname"
                disabled={isSubmitting}
                placeholder="Ex: veranacuccina"
                className="h-14 w-full"
                required
              />
            </div>
            <span className="text-sm text-gray-500">
              Este será o endereço para acessar a página de sua loja.
            </span>
          </div>
        </div>
        <SubmitButton isLoading={isSubmitting} className="mt-8 h-12 w-full">
          Continuar
        </SubmitButton>
      </form>
      <div className="flex justify-center">
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
    </>
  )
}
