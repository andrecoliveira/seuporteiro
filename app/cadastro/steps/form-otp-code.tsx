import { SubmitButton } from '@/components/submit-button'
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
  const isSubmitting = otpCodeForm.formState.isSubmitting
  return (
    <>
      <div className="space-y-1">
        <span className="text-xs">
          PASSO <strong>3</strong> DE <strong>3</strong>
        </span>
        <h4 className="text-xl font-semibold tracking-tight text-gray-700">
          Confirme seu e-mail
        </h4>
        <p className="text-sm text-gray-500">
          Digite o código de validação que enviamos para o e-mail:
        </p>
      </div>
      <div className="flex justify-center">
        <Form {...otpCodeForm}>
          <form
            onSubmit={otpCodeForm.handleSubmit(handleOtpCodeFormSubmit)}
            className="flex flex-col items-center space-y-12"
          >
            <FormField
              control={otpCodeForm.control}
              name="otpCode"
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center space-y-4">
                  <FormLabel>{props.accountForm.watch('email')}</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="h-14 w-12 text-lg" />
                        <InputOTPSlot index={1} className="h-14 w-12 text-lg" />
                        <InputOTPSlot index={2} className="h-14 w-12 text-lg" />
                        <InputOTPSlot index={3} className="h-14 w-12 text-lg" />
                        <InputOTPSlot index={4} className="h-14 w-12 text-lg" />
                        <InputOTPSlot index={5} className="h-14 w-12 text-lg" />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>Não recebeu o código?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              className="h-12 w-full"
              isLoading={otpCodeForm.formState.isSubmitting}
            >
              Validar
            </SubmitButton>
          </form>
        </Form>
      </div>
    </>
  )
}
