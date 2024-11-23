import { z } from 'zod'

import useSignUpModel from './signUp.model'
import {
  informationSchema,
  accountSchema,
  otpCodeSchema,
} from './signUp.schema'

export type SignUpViewProps = ReturnType<typeof useSignUpModel>

export type InformationForm = z.infer<typeof informationSchema>
export type AccountForm = z.infer<typeof accountSchema>
export type OtpCodeForm = z.infer<typeof otpCodeSchema>
