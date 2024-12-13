import { z } from 'zod'

import useSignUpModel from './signUp.model'
import {
  informationSchema,
  accountSchema,
  otpCodeSchema,
} from './signUp.schema'

export interface Tenant {
  id: string
  name: string
  pathname: string
  profile_image: string
  cover_image: string
  contact_phone: string
  description: string
  crowded: boolean
  scores: number
  cnpj: string
  instagram: string
  stripe_id: string
}

export interface User {
  full_name: string
  contact_email: string
  updated_at: string
  deleted_at: string
  contact_phone: string
  tenant_id: string
  role: 'member' | 'admin' | 'owner'
}

export interface TenantMember {
  user_id: string
  tenant_id: string
  role: 'member' | 'admin' | 'owner'
}

export type SignUpViewProps = ReturnType<typeof useSignUpModel>

export type InformationForm = z.infer<typeof informationSchema>
export type AccountForm = z.infer<typeof accountSchema>
export type OtpCodeForm = z.infer<typeof otpCodeSchema>
