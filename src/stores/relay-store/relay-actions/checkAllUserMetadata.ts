import { display } from 'lib'
import { NostrKind } from 'lib/nostr'
import { values } from 'mobx'
import { Event } from '../relay-models'
import { RelayStore } from '../relay-store'

// a horribly non-optimized way to fetch user metadata for the events we got
export const checkAllUserMetadata = async (self: RelayStore) => {
  const events = values(self.events) as any

  // First build an array of unique pubkeys from the kinds we care about - for now just channelmessage
  const filteredEvents = events.filter((event: Event) => event.kind === NostrKind.channelmessage)
  const pubkeys = filteredEvents.map((event: Event) => event.pubkey)
  const uniquePubkeys = Array.from(new Set(pubkeys))

  display({
    name: 'checkAllUserMetadata',
    preview: `Checking ${events.length} events (${filteredEvents.length} filtered) for user metadata`,
    value: { pubkeys, uniquePubkeys },
  })
}
