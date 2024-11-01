import { z } from 'zod'

export const formSchema = z.object({
  email: z.string().email('Endereço de e-mail inválido'),
  password: z.string(),
})
