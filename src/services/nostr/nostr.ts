import { NostrEventToSerialize, NostrKind, relayPool } from 'lib/nostr'

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
    // this.createDummyChannels()
  }

  async sendChannelMessage(channelId: string, text: string) {
    if (!this.publicKey) return
    const date = new Date()
    const dateTimeInSeconds = Math.floor(date.getTime() / 1000)
    const event: NostrEventToSerialize = {
      content: text,
      created_at: dateTimeInSeconds,
      kind: NostrKind.channelmessage,
      pubkey: this.publicKey,
      tags: [['#e', channelId]],
    }
    this.publish(event)
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
    this.publish(event)
  }

  async createDummyChannels() {
    if (!this.publicKey) return
    const channels = [
      {
        name: 'Bitcoin',
        about: 'Talk about Bitcoin.',
        picture: 'https://arcade.city/img/bitcoin.png',
      },
      {
        name: 'Ridesharing',
        about: 'Talk about ridesharing.',
        picture: 'https://arcade.city/img/bitcoincar.png',
      },
      {
        name: 'World Chat',
        about: 'Talk about anything.',
        picture: 'https://arcade.city/img/earth.png',
      },
      {
        name: 'Arcade City',
        about: 'Talk about this app.',
        picture: 'https://arcade.city/img/emails/rides.png',
      },
    ]
    const date = new Date()
    const dateTimeInSeconds = Math.floor(date.getTime() / 1000)
    channels.forEach((channel) => {
      const event: NostrEventToSerialize = {
        content: JSON.stringify({
          about: channel.about,
          name: channel.name,
          picture: channel.picture,
        }),
        created_at: dateTimeInSeconds,
        kind: 40,
        pubkey: this.publicKey as string,
        tags: [],
      }
      this.publish(event)
    })
  }
}
