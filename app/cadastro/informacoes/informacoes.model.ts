import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { APP_ROUTES, HttpSupabaseError, SessionStorage } from '@/app/constants'

import { queryDatabase } from '../actions'
import { informationSchema } from '../signUp.schema'
import { InformationForm } from '../signUp.types'

export default function useInformationsModel() {
  const informationForm = useForm<InformationForm>({
    resolver: zodResolver(informationSchema),
  })

  const { cnpj, pathname, name } = informationForm.watch()

  useEffect(() => {
    const { errors } = informationForm.formState
    Object.values(errors).forEach((error) => {
      if (error?.message) toast.error(error.message)
    })
  }, [informationForm.formState, informationForm.formState.errors])

  const handleInfoFormSubmit = async () => {
    const { data, error } = await queryDatabase<{
      cnpj: string
      pathname: string
    }>({
      table: 'tenant',
      select: 'cnpj, pathname',
      query: `pathname.eq.${pathname.toLowerCase()},cnpj.eq.${cnpj}`,
    })
    if (error?.code === HttpSupabaseError.NO_ROWS) {
      sessionStorage.setItem(
        SessionStorage.information,
        JSON.stringify({ cnpj, pathname, name }),
      )
      redirect(APP_ROUTES.public.signUpAccount)
    }
    if (data?.cnpj === cnpj) {
      toast.error('Este CNPJ já possui cadastro em nossa aplicação')
    }
    if (data?.pathname === pathname) {
      toast.error('Este endereço já está sendo utilizado')
    }
  }

  return {
    informationForm,
    handleInfoFormSubmit,
  }
}
