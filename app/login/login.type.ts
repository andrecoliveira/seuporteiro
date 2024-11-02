import { z } from 'zod'
import useLoginModel from './login.model'
import { formSchema } from './login.schema'

export type LoginViewProps = ReturnType<typeof useLoginModel>
export type Form = z.infer<typeof formSchema>
