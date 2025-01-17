import { z } from 'zod'

import { validatePassword } from '@/utils/validatePassword'

export enum Steps {
  BasicInformation = 1,
  OTPCodeValidation = 2,
}

export const emailSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
})

export const basicInformationSchema = z.object({
  emailAddress: emailSchema.shape.email,
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().refine((value) => validatePassword(value), {
    message: 'Senha deve atender aos critérios de complexidade',
  }),
})

export const otpCodeSchema = z.object({
  otpCode: z.string(),
})
