import { SubmitButton } from '@/components/submit-button'

import StepOne from './steps/step-one'
// import StepTwo from './steps/step-two'

export default function Page() {
  return (
    <form>
      <StepOne />
      <SubmitButton className="mt-8 h-12 w-full">Continuar</SubmitButton>
    </form>
  )
}
