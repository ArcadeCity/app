import { display } from 'lib'
import { UserStore } from '../user-store'

export const nostrConnect = async (self: UserStore) => {
  display({
    name: 'nostrConnect',
    preview: 'Connecting to Nostr relays...',
    value: {
      privateKey: self.privateKey,
      publicKey: self.publicKey,
    },
  })
  self.env.nostr.connect()
}
