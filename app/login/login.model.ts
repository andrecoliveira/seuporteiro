import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'

import { useForm } from 'react-hook-form'
import { Form } from './login.type'
import { formSchema } from './login.schema'
import { login } from './login.action'

export default function useLoginModel() {
  const { toast } = useToast()

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: Form) {
    const { error } = await login(values)
    if (error.code === 'invalid_credentials') {
      toast({
        variant: 'destructive',
        title: 'Credenciais inválidas',
        description: 'Verifique seu e-mail ou senha e tente novamente',
      })
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  }
}
