import { display } from 'lib'
import { NostrEventToSerialize, NostrEventToSign, relayPool } from 'lib/nostr'

export class Nostr {
  pool: any
  publicKey: string | undefined
  privateKey: string | undefined

  constructor() {
    this.pool = relayPool()
  }

  async connect(publicKey: string, privateKey: string) {
    this.publicKey = publicKey
    this.privateKey = privateKey
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

    this.pool.sub({ cb: onEvent, filter: { kinds: [40, 41, 42], limit: 5 } })
  }

  async publish(eventObject: NostrEventToSerialize) {
    // publishing events(inside an async function):
    const ev = await this.pool.publish(eventObject, (status, url) => {
      if (status === 0) {
        console.log(`publish request sent to ${url}`)
      }
      if (status === 1) {
        console.log(`event published by ${url}`) // , ev
      }
    })
  }

  async publishTestEvent() {
    if (!this.publicKey) return
    const date = new Date()
    const dateTimeInSeconds = Math.floor(date.getTime() / 1000)
    const event: NostrEventToSerialize = {
      content: 'Hello!',
      created_at: dateTimeInSeconds,
      kind: 1,
      pubkey: this.publicKey,
      tags: [],
    }
    console.log('publishing event', event)
    this.publish(event)
  }
}
