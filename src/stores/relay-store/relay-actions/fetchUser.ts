import { display } from 'lib'
import { delay } from 'lib/delay'
import { RelayStore } from '../relay-store'

export const fetchUser = async (self: RelayStore, pubkey: string) => {
  display({
    name: 'fetchUser',
    preview: `Fetching user ${pubkey}`,
  })

  function onEvent(event: any, relay: string) {
    try {
      console.log(`Received METADATA event from ${relay}, id ${event.id}`)
      display({
        name: 'fetchUser',
        preview: `Received METADATA event from ${relay}, id ${event.id}`,
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

  const sub = self.env.nostr.pool.sub({ cb: onEvent, filter: { kinds: [0], authors: [pubkey] } })
  await delay(1000)
  sub.unsub()
  console.log('unsubbed?')
}
