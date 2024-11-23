import { Steps } from './signUp.schema'
import { SignUpViewProps } from './signUp.types'
import RestaurantAccount from './steps/restaurant-account'
import RestaurantInformation from './steps/restaurant-information'

export default function SignUpPage(props: SignUpViewProps) {
  function stepContent(step: number) {
    switch (step) {
      case Steps.Information:
        return <RestaurantInformation {...props} />
      case Steps.Account:
        return <RestaurantAccount {...props} />
      default:
        return null
    }
  }

  return stepContent(props.step)
}
