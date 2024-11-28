import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import {
  validateContainsNumber,
  validateContainsSpecialCharacter,
  validateStringCase,
  validateStringLength,
} from '@/utils/validatePassword'

import { HTTP_STATUSCODE } from '../constants'

import { informationAlreadyExists } from './actions'
import {
  informationSchema,
  Steps,
  accountSchema,
  otpCodeSchema,
} from './signUp.schema'
import { AccountForm, InformationForm, OtpCodeForm } from './signUp.types'

export default function useSignUpModel() {
  const [step, setStep] = useState(Steps.Information)

  const informationForm = useForm<InformationForm>({
    resolver: zodResolver(informationSchema),
  })

  const accountForm = useForm<AccountForm>({
    resolver: zodResolver(accountSchema),
  })

  const otpCodeForm = useForm<OtpCodeForm>({
    resolver: zodResolver(otpCodeSchema),
  })

  const { cnpj, pathname, name } = informationForm.watch()
  const { password } = accountForm.getValues()

  const errors = useMemo(
    () => ({
      ...informationForm.formState.errors,
      ...accountForm.formState.errors,
      ...otpCodeForm.formState.errors,
    }),
    [
      informationForm.formState.errors,
      accountForm.formState.errors,
      otpCodeForm.formState.errors,
    ],
  )

  useEffect(() => {
    Object.entries(errors).forEach(([, error]) => {
      if (error?.message) toast.error(error.message)
    })
  }, [errors])

  const handleInfoFormSubmit = async () => {
    const { data, error } = await informationAlreadyExists({
      cnpj,
      pathname,
      name,
    })

    if (error?.code === HTTP_STATUSCODE.NO_ROWS) {
      setStep(Steps.Account)
      return
    }

    if (data?.cnpj === cnpj) {
      informationForm.setFocus('cnpj')
      toast.error('Este CNPJ já possui cadastro em nossa aplicação')
    }
    if (data?.pathname === pathname) {
      informationForm.setFocus('pathname')
      toast.error('Este endereço já está sendo utilizado')
    }
  }

  const handleAccountFormSubmit = () => {}

  const handleOtpCodeFormSubmit = () => {}

  return {
    informationForm,
    accountForm,
    otpCodeForm,
    handleInfoFormSubmit,
    handleAccountFormSubmit,
    handleOtpCodeFormSubmit,
    step,
    validation: {
      hasNumber: validateContainsNumber(password || ''),
      minLength: validateStringLength(password || ''),
      case: validateStringCase(password || ''),
      specialCharacter: validateContainsSpecialCharacter(password || ''),
    },
  }
}
