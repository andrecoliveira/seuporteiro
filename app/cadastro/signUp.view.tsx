import { Steps } from './signUp.schema'
import { SignUpViewProps } from './signUp.types'
import BasicInformationPage from './steps/basic-information-form'
import OtpCodeForm from './steps/otp-code-form'

export default function SignUpPage(props: SignUpViewProps) {
  function stepContent(step: number) {
    switch (step) {
      case Steps.BasicInformation:
        return <BasicInformationPage {...props} />
      case Steps.OTPCodeValidation:
        return <OtpCodeForm {...props} />
      default:
        return null
    }
  }
  return stepContent(props.step)
}
