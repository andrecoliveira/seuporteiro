import { signInAction } from '@/app/(auth-pages)/actions'

export default function useSignInModel() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await signInAction(formData)
  }
  return {
    handleSubmit,
  }
}
