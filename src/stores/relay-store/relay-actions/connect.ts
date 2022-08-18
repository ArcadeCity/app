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
  await self.env.nostr.connect(publicKey, privateKey)

  function onEvent(event: any, relay: string) {
    try {
      console.log(`Received event from ${relay}, id ${event.id}`)
      const eventModel = self.rootStore.relay.events.get(event.id)
      if (!eventModel) {
        self.rootStore.relay.addEvent(event)
      }
    } catch (e) {
      console.log('Error in onEvent')
    }
  }

  // self.env.nostr.pool.sub({ cb: onEvent, filter: { kinds: [1], limit: 15 } })
  self.env.nostr.pool.sub({ cb: onEvent, filter: { kinds: [40], limit: 15 } })
  self.env.nostr.pool.sub({ cb: onEvent, filter: { kinds: [41, 42], limit: 15 } })
  return
}
