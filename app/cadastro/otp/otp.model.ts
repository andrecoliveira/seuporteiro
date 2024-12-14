import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { APP_ROUTES, HttpStatusCode, SessionStorage } from '@/app/constants'

import { otpCodeSchema } from '../signUp.schema'
import { OtpCodeForm } from '../signUp.types'

export default function useOtpCodeModel() {
  const storage = JSON.parse(
    window.sessionStorage.getItem(SessionStorage.information) ?? '{}',
  )

  const otpCodeForm = useForm<OtpCodeForm>({
    resolver: zodResolver(otpCodeSchema),
  })

  const { otpCode } = otpCodeForm.watch()

  useEffect(() => {
    const { errors } = otpCodeForm.formState
    Object.values(errors).forEach((error) => {
      if (error?.message) toast.error(error.message)
    })
  }, [otpCodeForm.formState, otpCodeForm.formState.errors])

  const handleOtpCodeFormSubmit = async () => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        ...storage,
        otpCode,
      }),
    })
    if (response.status === HttpStatusCode.badRequest) {
      toast.error(
        'O código está incorreto ou expirado. Favor, verifique e tente novamente.',
      )
    }
    if (response.status === HttpStatusCode.created) {
      window.sessionStorage.removeItem(SessionStorage.information)
      redirect(APP_ROUTES.private.painel)
    }
  }

  return {
    otpCodeForm,
    handleOtpCodeFormSubmit,
    email: storage.email,
    isLoading: otpCodeForm.formState.isSubmitting,
  }
}
