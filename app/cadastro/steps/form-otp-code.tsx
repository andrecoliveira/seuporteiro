import { Button } from '@/components/ui'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'

import { SignUpViewProps } from '../signUp.types'

export default function FormOtpCode(props: SignUpViewProps) {
  const { otpCodeForm, handleOtpCodeFormSubmit } = props
  return (
    <>
      <div className="space-y-1">
        <span>
          PASSO <strong>3</strong> DE <strong>4</strong>
        </span>
        <h4 className="text-xl font-semibold tracking-tight text-gray-700">
          Confirme seu e-mail
        </h4>
        <p className="text-sm text-gray-500">
          Digite o código de validação que enviamos para o e-mail:
        </p>
      </div>
      <Form {...otpCodeForm}>
        <form
          onSubmit={otpCodeForm.handleSubmit(handleOtpCodeFormSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={otpCodeForm.control}
            name="otpCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email aqui</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>Não recebeu o código?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}
