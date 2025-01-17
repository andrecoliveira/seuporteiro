import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { setRedis } from '@/actions/redis'
import { Step } from '@/types/steps'
import { useSignUp } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { APP_ROUTES } from '../constants'

import { basicInformationSchema, otpCodeSchema, Steps } from './signUp.schema'
import { BasicInformationForm, OtpCodeForm } from './signUp.types'

export default function useSignUpModel() {
  const router = useRouter()
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
    await signUp?.create({ ...values })
    await signUp?.prepareEmailAddressVerification({
      strategy: 'email_code',
    })
    setStep(Steps.OTPCodeValidation)
  }

  const otpCodeSubmit = async () => {
    try {
      await signUp?.attemptEmailAddressVerification({
        code: otpCodeForm.watch('otpCode'),
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

  return {
    step,
    basicInformation: {
      form: basicInformationForm,
      onSubmit: basicInformationSubmit,
    },
    otpCode: {
      form: otpCodeForm,
      onSubmit: otpCodeSubmit,
    },
  }
}
