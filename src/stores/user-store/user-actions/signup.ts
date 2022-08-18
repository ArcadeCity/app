import { display } from 'lib'
import { UserStore } from '../user-store'

export interface SignupProps {
  username: string
  displayName?: string
  about?: string
}

export const signup = async (self: UserStore, { username, displayName, about }: SignupProps) => {
  const width = Math.floor(Math.random() * (220 - 200 + 1)) + 200
  const height = Math.floor(Math.random() * (320 - 300 + 1)) + 300

  const metadata = {
    name: username,
    displayName,
    about,
    picture: `https://placekitten.com/${width}/${height}`,
    website: null,
  }

  await self.rootStore.relay.connect()
  await self.env.nostr.saveMetadata(metadata)
  self.setUsername(username)
  self.setAuthed(true)
  if (displayName && displayName.length > 0) {
    self.setDisplayName(displayName)
  }
  if (about && about.length > 0) {
    self.setAbout(about)
  }

  display({
    name: 'signup',
    preview: `Signed up ${username}`,
    value: {
      about,
      displayName,
      metadata,
      username,
    },
  })
  return true
}
