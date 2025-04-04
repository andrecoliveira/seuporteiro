import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { setRedis } from '@/actions/redis'
import { Step } from '@/types/steps'
import { useSignUp } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { messages, Messages } from '@/utils/messages'

import { APP_ROUTES } from '../constants'

import { basicInformationSchema, otpCodeSchema, Steps } from './signUp.schema'
import { BasicInformationForm, OtpCodeForm } from './signUp.types'

export default function useSignUpModel() {
  const router = useRouter()
  const [counter, setCounter] = useState(60)
  const { signUp, setActive } = useSignUp()

  const [step, setStep] = useState(Steps.BasicInformation)

  const basicInformationForm = useForm<BasicInformationForm>({
    resolver: zodResolver(basicInformationSchema),
  })

  const otpCodeForm = useForm<OtpCodeForm>({
    resolver: zodResolver(otpCodeSchema),
  })

  const errors = useMemo(
    () => ({
      ...basicInformationForm.formState.errors,
      ...otpCodeForm.formState.errors,
    }),
    [basicInformationForm.formState.errors, otpCodeForm.formState.errors],
  )

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([, error]) => {
        if (error?.message) toast.error(error.message)
      })
    }
  }, [errors])

  const basicInformationSubmit = async () => {
    const values = basicInformationForm.getValues()
    try {
      await signUp?.create({ ...values }).catch((error) => {
        error.errors.map(({ code }: { code: Messages }) => {
          toast.error(messages[code])
        })
      })
      await signUp?.prepareEmailAddressVerification({
        strategy: 'email_code',
      })
      setStep(Steps.OTPCodeValidation)
    } catch (error) {
      console.error(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const otpCodeSubmit = async () => {
    try {
      await signUp
        ?.attemptEmailAddressVerification({
          code: otpCodeForm.watch('otpCode'),
        })
        .catch((error) => {
          toast.error(messages[error.errors[0].code as Messages])
        })
      const userId = signUp?.createdUserId
      const sessionId = signUp?.createdSessionId
      if (userId && sessionId) {
        await setRedis(userId, Step.ONBOARDING)
        setActive?.({
          session: sessionId,
          beforeEmit: () => router.push(APP_ROUTES.private.onboarding.initial),
        })
      }
    } catch (error) {
      console.error('Error during OTP verification:', error)
    }
  }

  const resendEmail = async () => {
    await signUp?.prepareEmailAddressVerification({
      strategy: 'email_code',
    })
    setCounter(60)
    toast.success('Um novo e-mail com o código foi enviado para você')
  }

  return {
    step,
    basicInformation: {
      form: basicInformationForm,
      onSubmit: basicInformationSubmit,
    },
    otpCode: {
      form: otpCodeForm,
      onSubmit: otpCodeSubmit,
      resendEmail,
    },
    counter,
    setCounter,
  }
}
