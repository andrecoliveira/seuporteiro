import { UserJSON } from '@clerk/nextjs/server'

export interface User extends UserJSON {
  profile_image_url: string
}
