import { User } from '@/types/user'

export function userAdapter(user: User) {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    profileImg: user.profile_image_url,
    email: user.email_addresses[0].email_address,
    publicMetadata: user.public_metadata,
  }
}
