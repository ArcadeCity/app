import { display } from 'lib'
import { delay } from 'lib/delay'
import { generateRandomPlacekitten } from 'lib/placekitten'
import { RelayStore } from '../relay-store'

export const fetchMessages = async (self: RelayStore, channelId: string) => {
  display({
    name: 'fetchMessages',
    preview: `Fetching messages for channel ${channelId}`,
  })

  function onEvent(event: any, relay: string) {
    try {
      console.log(`Received  event from ${relay}, id ${event.id}`)
      display({
        name: 'fetchUser',
        preview: `Received event from ${relay}, id ${event.id}`,
        value: event,
      })
      const eventModel = self.rootStore.relay.events.get(event.id)
      if (!eventModel) {
        self.rootStore.relay.addEvent(event)
      }
    } catch (e) {
      console.log('Error in onEvent')
      console.log(e)
    }
  }

  const sub = self.env.nostr.pool.sub({
    cb: onEvent,
    filter: { kinds: [42], '#e': channelId, limit: 50 },
  })
  await delay(1000)
  sub.unsub()
}
