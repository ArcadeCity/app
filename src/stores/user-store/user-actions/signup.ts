import { display } from 'lib'
import { UserStore } from '../user-store'

export interface SignupProps {
  username: string
  displayName?: string
  about?: string
}

export const signup = async (self: UserStore, { username, displayName, about }: SignupProps) => {
  display({
    name: 'signup',
    preview: `Signing up ${username}...`,
    value: { username, displayName, about },
  })
}
