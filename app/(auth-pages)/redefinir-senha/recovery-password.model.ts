import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAuth, useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Messages, messages } from '@/utils/messages'

import { APP_ROUTES } from '@/app/constants'

export const formSchema = z.object({
  email: z.string(),
  password: z.string(),
  code: z.string(),
})

export default function useRecoveryPasswordModel() {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { isLoaded, signIn, setActive } = useSignIn()

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      password: '',
      code: '',
    },
    resolver: zodResolver(formSchema),
  })

  const [successfulCreation, setSuccessfulCreation] = useState(false)

  if (!isLoaded) return null

  if (isSignedIn) {
    router.push(APP_ROUTES.private.painel)
  }

  async function create() {
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: form.watch('email'),
      })
      .then(() => {
        setSuccessfulCreation(true)
        form.clearErrors()
      })
      .catch((err) => {
        console.error('error', err.errors[0])
        form.setError('email', {
          message: messages[err.errors[0].code as Messages],
        })
      })
  }
  async function reset() {
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: form.watch('code'),
        password: form.watch('password'),
      })
      .then((result) => {
        if (result.status === 'complete') {
          setActive({ session: result.createdSessionId })
          form.clearErrors()
        }
      })
      .catch((err) => {
        console.error('error', err.errors[0])
        if (err.errors[0].meta.paramName === 'password') {
          form.setError('password', {
            message: messages[err.errors[0].code as Messages],
          })
        } else {
          form.setError('code', {
            message: messages[err.errors[0].code as Messages],
          })
        }
      })
  }

  return {
    form,
    create,
    reset,
    successfulCreation,
  }
}
