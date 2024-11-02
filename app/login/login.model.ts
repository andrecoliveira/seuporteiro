import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from './login.type'
import { formSchema } from './login.schema'
import { login } from './login.action'

export default function useLoginModel() {
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: Form) {
    await login(values)
  }

  return {
    form,
    onSubmit,
    isSubmitting,
  }
}
