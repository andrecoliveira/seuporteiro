import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'

import { APP_ROUTES } from '@/app/constants'

export const formSchema = z.object({
  name: z.string(),
  slug: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      'O slug deve conter apenas letras minúsculas, números e hífens, sem espaços, acentos ou caracteres especiais.',
    ),
})

export default function useFormModel() {
  const { user } = useUser()
  const form = useForm({
    defaultValues: {
      name: '',
      slug: '',
    },
    resolver: zodResolver(formSchema),
  })

  const handleOnSubmit = async () => {
    try {
      const response = await fetch('/api/organization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.watch('name'),
          slug: form.watch('slug'),
          userId: user?.id,
        }),
      })
      if (!response.ok) {
        toast.error('Erro ao criar organização')
        return
      }
      const data = await response.json()
      console.log('Organização criada com sucesso:', data)
      redirect(APP_ROUTES.private.painel)
    } catch (error) {
      console.error('Erro inesperado:', error)
    }
  }

  return {
    handleOnSubmit,
    form,
  }
}
