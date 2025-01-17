import { z } from 'zod'

import useSignUpModel from './signUp.model'
import { basicInformationSchema, otpCodeSchema } from './signUp.schema'

export type SignUpViewProps = ReturnType<typeof useSignUpModel>
export type BasicInformationForm = z.infer<typeof basicInformationSchema>
export type OtpCodeForm = z.infer<typeof otpCodeSchema>
