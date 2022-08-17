import { display } from 'lib'

export class Nostr {
  pool: any

  async connect() {
    display({
      name: 'Nostr',
      preview: 'Connecting...',
    })
  }
}
