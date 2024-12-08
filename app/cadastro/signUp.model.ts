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

  const handleAccountFormSubmit = async () => {
    const { error } = await signUp(accountForm.getValues())
    if (!error) setStep(Steps.OTPCodeValidation)
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
    else console.error('Erro ao criar cliente:', data.error)
  }

  const handleOtpCodeFormSubmit = async () => {
    try {
      const { data: otpResponse, error: sendOtpError } = await verifyOtpCode(
        email,
        otpCode,
      )

      if (sendOtpError) {
        console.error(
          'Erro ao verificar o código OTP. Verifique se o código inserido está correto.',
        )
        return
      }

      if (!otpResponse?.user) {
        console.error(
          'Usuário não encontrado após a verificação do código OTP.',
        )
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
        console.error(
          'Erro ao criar cliente no Stripe. Verifique os dados fornecidos.',
        )
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
        console.error('Erro ao criar o Tenant. Verifique os dados fornecidos.')
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
        console.error('Erro ao criar o usuário. Verifique os dados fornecidos.')
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
        console.error(
          'Erro ao criar os membros do Tenant. Verifique os dados fornecidos.',
        )
        return
      }

      router.push(APP_ROUTES.private.painel)
    } catch (error) {
      console.error(
        'Ocorreu um erro durante o processo de submissão do formulário:',
        error,
      )
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
