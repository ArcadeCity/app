import { display } from 'lib'
import { relayPool } from 'lib/nostr'

export class Nostr {
  pool: any

  constructor() {
    this.pool = relayPool()
  }

  async connect(privateKey: string) {
    display({
      name: 'Nostr',
      preview: 'Connecting...',
      value: { privateKey },
    })
    this.pool.setPrivateKey(privateKey)
    this.pool.addRelay('wss://relay.damus.io', { read: true, write: true })

    // example callback function for a subscription
    function onEvent(event, relay) {
      try {
        // console.log(event)
        // console.log('hm')
        console.log(`got an event from ${relay} which is already validated.`, event)
      } catch (e) {
        console.log('Error in onEvent')
      }
    }

    this.pool.sub({ cb: onEvent, filter: { kinds: [40, 41, 42], limit: 5 } })
  }
}
