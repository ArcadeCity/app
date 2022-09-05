import { display } from 'lib'
import { delay } from 'lib/delay'
import { Event } from '../relay-models'
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

  function onEvent(event: any, relay: string) {
    try {
      console.log(`Received event from ${relay}, id ${event.id}`)
      const eventModel = self.rootStore.relay.events.get(event.id)
      if (!eventModel) {
        self.rootStore.relay.addEvent(event)
      }
    } catch (e) {
      console.log('Error in onEvent')
    }
  }

  await delay(1000)

  const fetchChat = await fetch('https://ndxstr.arcade.city/chat')
  const res = await fetchChat.json()

  const eventsToSave: Event[] = []
  res.forEach((rawEvent: any) => {
    const event: Event = {
      id: rawEvent.id,
      kind: rawEvent.event_kind,
      pubkey: Buffer.from(rawEvent.event_pubkey).toString('hex'),
      content: rawEvent.event_content,
      created_at: rawEvent.event_created_at,
      sig: 'dontcare',
      tags: rawEvent.event_tags,
    }
    eventsToSave.push(event)
  })

  self.addEvents(eventsToSave)

  // Subscribe only to the channels we started
  self.env.nostr.pool.sub({
    cb: onEvent,
    filter: {
      kinds: [40],
      ids: [
        'f06a690997a1b7d8283c90a7224eb8b7fe96b7c3d3d8cc7b2e7f743532c02b42',
        'cc7ace95dcd091e8b2822b4c3f71dce88aece2adff66eaaea362caa8da8563b7',
        '6c1ab7e5f8cf33874e5b9d85e000c0683d3133ec8294a5009d2f38854aceafb0',
        '9cb8bf059ae86df40407cfa5871c2111b09d3fb2c85c5be67306fcf6b3bab729',
      ],
    },
  })

  self.env.nostr.pool.sub({
    cb: onEvent,
    filter: {
      kinds: [42],
      limit: 0,
    },
  })

  return
}
