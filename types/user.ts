export interface User {
  email: string
  firstName: string
  lastName: string
  profileImageUrl: string
  userId: string
  stripeCustomerId: string | null
}
