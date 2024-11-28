import { Steps } from './signUp.schema'
import { SignUpViewProps } from './signUp.types'
import FormAccount from './steps/form-account'
import FormInformation from './steps/form-information'
import FormOtpCode from './steps/form-otp-code'

export default function SignUpPage(props: SignUpViewProps) {
  function stepContent(step: number) {
    switch (step) {
      case Steps.Information:
        return <FormInformation {...props} />
      case Steps.Account:
        return <FormAccount {...props} />
      case Steps.OTPCodeValidation:
        return <FormOtpCode {...props} />
      default:
        return null
    }
  }
  return stepContent(props.step)
}
