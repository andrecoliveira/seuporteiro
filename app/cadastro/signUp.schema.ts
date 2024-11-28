import { z } from 'zod'

import { validatePassword } from '@/utils/validatePassword'
import { validCNPJ } from '@/utils/validations'

export enum Steps {
  Information = 1,
  Account = 2,
  OTPCodeValidation = 3,
}

export const emailSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
})

export const informationSchema = z.object({
  cnpj: z.string().refine((value) => validCNPJ(value), {
    message: 'O CNPJ fornecido não é válido. Verifique e tente novamente',
  }),
  name: z.string().min(5, 'O nome precisa ter no mínimo 5 caracteres'),
  pathname: z
    .string()
    .min(5, 'O endereço deve ter pelo menos 5 caracteres')
    .regex(
      /^[a-zA-Z0-9]+$/,
      'O endereço não pode conter acentuações ou espaços',
    ),
})

export const accountSchema = z
  .object({
    email: emailSchema.shape.email,
    legalResponsibleName: z.string().min(5, 'Deve ter pelo menos 5 caracteres'),
    password: z.string().refine((value) => validatePassword(value), {
      message: 'Senha deve atender aos critérios de complexidade',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirm'],
  })

export const otpCodeSchema = z.object({
  otpCode: z.string(),
})
