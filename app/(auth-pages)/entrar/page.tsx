'use client'

import useSignInModel from './signIn.model'
import SignInPage from './signIn.view'

export default function Page() {
  const methods = useSignInModel()
  return <SignInPage {...methods} />
}
