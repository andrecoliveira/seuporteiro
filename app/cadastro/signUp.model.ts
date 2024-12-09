import { useRouter } from 'next/navigation'
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

import { APP_ROUTES, HTTP_STATUSCODE } from '@/app/constants'

import {
  createTenant,
  createTenantMember,
  createUser,
  informationAlreadyExists,
  signUp,
  verifyOtpCode,
} from './actions'
import {
  informationSchema,
  Steps,
  accountSchema,
  otpCodeSchema,
} from './signUp.schema'
import {
  AccountForm,
  InformationForm,
  OtpCodeForm,
  StripeCustomer,
  TenantMember,
} from './signUp.types'

export default function useSignUpModel() {
  const router = useRouter()
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
    const { data, error } = await informationAlreadyExists({
      cnpj,
      pathname,
      name,
    })
    if (error?.code === HTTP_STATUSCODE.NO_ROWS) {
      setTimeout(() => setStep(Steps.Account), 0)
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

  const handleAccountFormSubmit = async () => {
    const { error } = await signUp(accountForm.getValues())
    if (!error) {
      // Atraso para evitar conflito com renderizações
      setTimeout(() => setStep(Steps.OTPCodeValidation), 0)
    }
  }

  const createCustomer = async (formData: StripeCustomer) => {
    const response = await fetch('/api/stripe/create-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const data = await response.json()
    if (response.ok) return data
    console.error('Erro ao criar cliente:', data.error)
  }

  const handleOtpCodeFormSubmit = async () => {
    try {
      const { data: otpResponse, error: sendOtpError } = await verifyOtpCode(
        email,
        otpCode,
      )

      if (sendOtpError) {
        toast.error('Erro ao verificar o código OTP.')
        return
      }

      if (!otpResponse?.user) {
        toast.error('Usuário não encontrado após a verificação do código OTP.')
        return
      }

      const stripeCustomerPayload = {
        legalResponsibleName,
        email,
        userId: otpResponse.user.id,
        tenantName: name,
      }

      const stripeCustomer = await createCustomer(stripeCustomerPayload)

      if (!stripeCustomer?.customer?.id) {
        toast.error('Erro ao criar cliente no Stripe.')
        return
      }

      const tenantPayload = {
        name,
        pathname,
        cnpj,
        stripe_id: stripeCustomer.customer.id,
      }

      const { data: tenantResponse, error: tenantError } =
        await createTenant(tenantPayload)

      if (tenantError) {
        toast.error('Erro ao criar o Tenant.')
        return
      }

      const createUserPayload = {
        id: otpResponse.user.id,
        full_name: legalResponsibleName,
        contact_email: email,
        tenant_id: tenantResponse.id,
        role: 'owner' as TenantMember['role'],
      }

      const { error: userError } = await createUser(createUserPayload)

      if (userError) {
        toast.error('Erro ao criar o usuário.')
        return
      }

      const tenantMemberPayload = {
        tenant_id: tenantResponse.id,
        user_id: otpResponse.user.id,
        role: 'owner' as TenantMember['role'],
      }

      const { error: tenantMemberError } =
        await createTenantMember(tenantMemberPayload)

      if (tenantMemberError) {
        toast.error('Erro ao criar os membros do Tenant.')
      }

      setTimeout(() => router.push(APP_ROUTES.private.painel), 0)
    } catch (error) {
      console.error('Erro durante a submissão:', error)
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
