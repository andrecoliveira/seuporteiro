import { useEffect } from 'react'

import { SubmitButton } from '@/components/submit-button'
import { Button } from '@/components/ui'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'

import { SignUpViewProps } from '../signUp.types'

export default function OtpCodeForm(props: SignUpViewProps) {
  const {
    otpCode: { form, onSubmit, resendEmail },
    counter,
    setCounter,
  } = props

  useEffect(() => {
    const timer =
      counter > 0 ? setInterval(() => setCounter(counter - 1), 1000) : undefined
    return () => clearInterval(timer)
  }, [counter, setCounter])

  return (
    <>
      <div className="space-y-1">
        <span className="text-xs">
          PASSO <strong>2</strong> DE <strong>2</strong>
        </span>
        <h4 className="text-xl font-semibold tracking-tight text-gray-700">
          Confirme seu e-mail
        </h4>
        <p className="text-sm text-gray-500">
          Digite o código de validação que enviamos para seu e-mail.
        </p>
      </div>
      <div className="flex flex-col justify-center space-y-9">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-9"
          >
            <FormField
              control={form.control}
              name="otpCode"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center space-y-4">
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
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              {counter > 0 ? (
                <span className="text-sm text-gray-500">
                  Você pode reenviar um novo código em{' '}
                  <strong>{counter} segundos</strong>
                </span>
              ) : (
                <Button type="button" variant="link" onClick={resendEmail}>
                  Reenviar um novo código agora
                </Button>
              )}
            </div>
            <SubmitButton
              className="h-12 w-48"
              isLoading={form.formState.isSubmitting}
            >
              Validar
            </SubmitButton>
          </form>
        </Form>
      </div>
    </>
  )
}
