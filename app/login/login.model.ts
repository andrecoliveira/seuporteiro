import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { messages, MessageKey } from './login.messages'
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
    const errorCode = await login(values)
    if (errorCode) {
      toast({
        ...messages[errorCode as MessageKey],
        variant: 'destructive',
      })
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  }
}
