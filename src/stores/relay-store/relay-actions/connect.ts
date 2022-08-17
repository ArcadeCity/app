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

  // example callback function for a subscription
  function onEvent(event: any, relay: string) {
    try {
      display({
        name: 'relay.connect',
        preview: `Received event from ${relay}`,
        value: event,
      })
      const eventModel = self.rootStore.relay.events.get(event.id)
      if (!eventModel) {
        self.rootStore.relay.addEvent(event)
      }
    } catch (e) {
      console.log('Error in onEvent')
    }
  }

  self.env.nostr.pool.sub({ cb: onEvent, filter: { kinds: [40, 41, 42], limit: 5 } })
}
