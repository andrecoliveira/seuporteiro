import { SubmitButton } from '@/components/submit-button'
import { Input, Label } from '@/components/ui'

import useFormModel from './form.model'

export type FormProps = ReturnType<typeof useFormModel>

export default function Form(props: Readonly<FormProps>) {
  const { form, handleOnSubmit } = props
  return (
    <div>
      <h3 className="text-left text-lg font-semibold">Crie sua organização</h3>
      <form
        className="mt-4 space-y-8"
        onSubmit={form.handleSubmit(handleOnSubmit)}
      >
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            {...form.register('name')}
            placeholder="Digite o nome do condomínio"
            className="h-14"
            required
          />
        </div>
        <SubmitButton
          isLoading={form.formState.isSubmitting}
          className="mt-6 h-12 w-full"
        >
          Criar
        </SubmitButton>
      </form>
    </div>
  )
}
