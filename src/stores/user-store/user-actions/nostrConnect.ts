import { display } from 'lib'
import { UserStore } from '../user-store'

export const nostrConnect = async (self: UserStore) => {
  if (!self.publicKey || !self.privateKey) {
    throw new Error('No private key')
  }
  display({
    name: 'nostrConnect',
    preview: 'Connecting to Nostr relays...',
    value: {
      privateKey: self.privateKey,
      publicKey: self.publicKey,
    },
  })
  self.env.nostr.connect(self.publicKey, self.privateKey)
}
