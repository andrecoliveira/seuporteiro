import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { signUp } from '@/lib/supabase.actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import {
  validateContainsNumber,
  validateContainsSpecialCharacter,
  validateStringCase,
  validateStringLength,
} from '@/utils/validatePassword'

import { APP_ROUTES, SessionStorage } from '@/app/constants'

import { queryDatabase } from '../actions'
import { accountSchema } from '../signUp.schema'
import { AccountForm } from '../signUp.types'

export default function useAccountModel() {
  const storage = JSON.parse(
    sessionStorage.getItem(SessionStorage.information) ?? '{}',
  )

  const accountForm = useForm<AccountForm>({
    resolver: zodResolver(accountSchema),
  })

  const { password, email, legalResponsibleName } = accountForm.watch()

  useEffect(() => {
    const { errors } = accountForm.formState
    Object.values(errors).forEach((error) => {
      if (error?.message) toast.error(error.message)
    })
  }, [accountForm.formState, accountForm.formState.errors])

  const handleAccountFormSubmit = async () => {
    const { data } = await queryDatabase<{ contact_email: string }>({
      table: 'tenant',
      select: 'contact_email',
      query: `contact_email.eq.${email.toLowerCase()}`,
    })
    if (data?.contact_email === email) {
      toast.error('Este e-mail já está sendo utilizado')
      return
    }
    const { error } = await signUp(accountForm.getValues())
    if (!error) {
      sessionStorage.setItem(
        SessionStorage.information,
        JSON.stringify({ ...storage, email, legalResponsibleName }),
      )
      redirect(APP_ROUTES.public.signUpOtpCode)
    }
  }

  return {
    accountForm,
    handleAccountFormSubmit,
    validation: {
      hasNumber: validateContainsNumber(password || ''),
      minLength: validateStringLength(password || ''),
      case: validateStringCase(password || ''),
      specialCharacter: validateContainsSpecialCharacter(password || ''),
    },
  }
}
