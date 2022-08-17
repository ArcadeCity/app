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
  }
}
