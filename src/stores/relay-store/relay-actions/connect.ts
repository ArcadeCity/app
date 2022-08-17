import { display } from 'lib'
import { RelayStore } from '../relay-store'

export const connect = async (self: RelayStore) => {
  const privateKey = self.rootStore.user.privateKey
  const publicKey = self.rootStore.user.publicKey
  if (!publicKey || !privateKey) {
    throw new Error('Missing key(s)')
  }
  display({
    name: 'nostrConnect',
    preview: 'Connecting to Nostr relays...',
    value: { privateKey, publicKey },
  })
  self.env.nostr.connect(publicKey, privateKey)
}
