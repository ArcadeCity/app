import { display } from 'lib'
import { UserStore } from '../user-store'

export interface SignupProps {
  username: string
  displayName?: string
  about?: string
}

export const signup = async (self: UserStore, { username, displayName, about }: SignupProps) => {
  const metadata = {
    name: username,
    displayName,
    about,
    website: null,
  }

  await self.rootStore.relay.connect()
  await self.env.nostr.saveMetadata(metadata)
  self.setUsername(username)

  display({
    name: 'signup',
    preview: `Signing up ${username}...`,
    value: {
      about,
      displayName,
      metadata,
      username,
    },
  })
  return true
}
