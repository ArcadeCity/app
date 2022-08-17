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
        console.log(`Received from ${relay} event id ${event.id}`)
      } catch (e) {
        console.log('Error in onEvent')
      }
    }

    this.pool.sub({ cb: onEvent, filter: { kinds: [40, 41, 42], limit: 25 } })
  }

  async publish(eventObject: any) {
    // publishing events(inside an async function):
    const ev = await this.pool.publish(eventObject, (status, url) => {
      if (status === 0) {
        console.log(`publish request sent to ${url}`)
      }
      if (status === 1) {
        console.log(`event published by ${url}`, ev)
      }
    })
  }
}
