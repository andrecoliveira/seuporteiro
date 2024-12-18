import * as Clerk from '@clerk/elements/common'

import { Messages, messages } from '@/utils/messages'

export function ErrorMessage() {
  return (
    <Clerk.FieldError className="block text-sm text-destructive">
      {({ message, code }) => {
        console.log('code', code)
        return messages[code as Messages] || message
      }}
    </Clerk.FieldError>
  )
}
