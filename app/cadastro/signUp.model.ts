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
import { createCustomer, deleteCustomer } from '@/lib/stripe.actions'
import { APP_ROUTES, HTTP_STATUSCODE } from '@/app/constants'

import {
  createTenant,
  createTenantMember,
  createUser,
  deleteTenant,
  deleteTenantMember,
  deleteUser,
  informationAlreadyExists,
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
  TenantMember,
} from './signUp.types'
import {
  deleteSupabaseUser,
  signUp,
  verifyOtpCode,
} from '@/lib/supabase.actions'

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

  useEffect(() => {
    if (step === Steps.Account) accountForm.setFocus('legalResponsibleName')
  }, [step])

  const cleanAllValues = () => {
    informationForm.reset()
    accountForm.reset()
    otpCodeForm.reset()
  }

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

  const handleOtpCodeFormSubmit = async () => {
    let supabaseUser: string | null = null
    let userId: string | null = null
    let stripeCustomerId: string | null = null
    let tenantId: string | null = null
    let tenantMemberId: string | null = null

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

      supabaseUser = otpResponse.user.id

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

      stripeCustomerId = stripeCustomer.customer.id

      const tenantPayload = {
        name,
        pathname,
        cnpj,
        contact_email: email,
        stripe_id: stripeCustomer.customer.id,
      }

      const { data: tenantResponse, error: tenantError } =
        await createTenant(tenantPayload)

      if (tenantError) {
        toast.error('Erro ao criar o Tenant.')
        return
      }

      tenantId = tenantResponse.id

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

      userId = otpResponse.user.id

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

      cleanAllValues()

      router.push(APP_ROUTES.private.painel)
    } catch (error) {
      console.error('Erro durante a submissão:', error)

      if (supabaseUser) await deleteSupabaseUser(supabaseUser)
      if (stripeCustomerId) await deleteCustomer(stripeCustomerId)
      if (tenantId) await deleteTenant(tenantId)
      if (userId) await deleteUser(userId)
      if (tenantMemberId) await deleteTenantMember(tenantMemberId)

      toast.error('Algo deu errado. Por favor, tente novamente.')
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
