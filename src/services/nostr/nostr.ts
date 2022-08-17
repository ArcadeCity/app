import { NostrEventToSerialize, relayPool } from 'lib/nostr'

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
    this.pool.setPrivateKey(privateKey)
    this.pool.addRelay('wss://relay.damus.io', { read: true, write: true })
  }

  async publish(eventObject: NostrEventToSerialize) {
    await this.pool.publish(eventObject, (status, url) => {
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
