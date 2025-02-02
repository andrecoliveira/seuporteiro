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
        className="mt-4 space-y-3"
        onSubmit={form.handleSubmit(handleOnSubmit)}
      >
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            {...form.register('name')}
            placeholder="Ex: Gregorio Cuccina"
            className="h-14"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            {...form.register('slug')}
            placeholder="Ex: gregorio-cuccina"
            className="h-14"
            required
          />
          <div className="text-sm font-light text-gray-500">
            O slug é o identificador único da sua organização na URL. Ele deve
            ser composto por letras minúsculas, números e hífens, sem espaços,
            acentos ou caracteres especiais.
          </div>
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
