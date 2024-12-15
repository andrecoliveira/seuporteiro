import { redirect } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  HttpStatusCode,
  HttpSupabaseError,
} from '@/data/http/HttpClientProtocol'
import { signUp } from '@/lib/supabase.actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import {
  validateContainsNumber,
  validateContainsSpecialCharacter,
  validateStringCase,
  validateStringLength,
} from '@/utils/validatePassword'

import { APP_ROUTES } from '@/app/constants'

import { queryDatabase } from './actions'
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
  const { password, email, legalResponsibleName } = accountForm.watch()
  const { otpCode } = otpCodeForm.watch()

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
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([, error]) => {
        if (error?.message) toast.error(error.message)
      })
    }
  }, [errors])

  const handleInfoFormSubmit = async () => {
    try {
      const { data, error } = await queryDatabase<{
        cnpj: string
        pathname: string
      }>({
        table: 'tenant',
        select: 'cnpj, pathname',
        query: `pathname.eq.${pathname.toLowerCase()},cnpj.eq.${cnpj}`,
      })
      if (error?.code === HttpSupabaseError.NO_ROWS) {
        setStep(Steps.Account)
        return
      }
      if (!data) {
        throw new Error('Erro ao buscar informações.')
      }
      if (data.cnpj === cnpj) {
        informationForm.setFocus('cnpj')
        throw new Error('Este CNPJ já possui cadastro em nossa aplicação')
      }
      if (data.pathname === pathname) {
        informationForm.setFocus('pathname')
        throw new Error('Este endereço já está sendo utilizado')
      }
    } catch (err) {
      console.error('Erro ao verificar informações:', err)
      toast.error(err instanceof Error ? err.message : 'Erro inesperado.')
    }
  }

  const handleAccountFormSubmit = async () => {
    try {
      const { data } = await queryDatabase<{ contact_email: string }>({
        table: 'tenant',
        select: 'contact_email',
        query: `contact_email.eq.${email.toLowerCase()}`,
      })
      if (!data) {
        throw new Error('Erro ao buscar as informações.')
      }
      if (data.contact_email === email) {
        throw new Error('Este e-mail já está sendo utilizado')
      }
      const { error } = await signUp(accountForm.getValues())
      if (!error) setStep(Steps.OTPCodeValidation)
    } catch (err) {
      console.error('Erro ao verificar informações:', err)
      toast.error(err instanceof Error ? err.message : 'Erro inesperado.')
    }
  }

  const handleOtpCodeFormSubmit = async () => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
          cnpj,
          pathname,
          name,
          email,
          legalResponsibleName,
          otpCode,
        }),
      })
      if (response.status === HttpStatusCode.badRequest) {
        throw new Error(
          'O código está incorreto ou expirado. Favor, verifique e tente novamente.',
        )
      }
      if (response.status === HttpStatusCode.created) {
        redirect(APP_ROUTES.private.painel)
      }
    } catch (err) {
      console.error('Erro ao verificar informações:', err)
      toast.error(err instanceof Error ? err.message : 'Erro inesperado.')
    }
  }

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
