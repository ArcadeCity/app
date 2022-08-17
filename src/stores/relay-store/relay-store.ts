import { values } from 'mobx'
import { applySnapshot, Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment, withRootStore } from '../_extensions'
import * as actions from './relay-actions'
import { Event, EventModel } from './relay-models'

export const RelayStoreModel = types
  .model('RelayStore')
  .props({
    events: types.optional(types.map(EventModel), {}),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self) => ({
    /** Connect to Nostr relays */
    connect: async (): Promise<void> => await actions.connect(self as RelayStore),
    /** Save event to store */
    addEvent: (event: Event) => {
      self.events.set(event.id, event)
    },
    /** Reset this store to original state */
    reset() {
      applySnapshot(self, {})
    },
  }))
  .views((self) => ({
    /** Get event by id */
    getEventById(id: string) {
      return self.events.get(id)
    },
    /** Return channels as list of normalized events with kind 40 */
    get channels() {
      const events = values(self.events) as any
      return events
        .filter((event: Event) => event.kind === 40)
        .map((event: Event) => {
          const channelInfo = JSON.parse(event.content)
          const { name, about } = channelInfo
          return {
            ...event,
            name,
            about,
          }
        })
    },
  }))

type RelayStoreType = Instance<typeof RelayStoreModel>
export interface RelayStore extends RelayStoreType {}
type RelayStoreSnapshotType = SnapshotOut<typeof RelayStoreModel>
export interface RelayStoreSnapshot extends RelayStoreSnapshotType {}
export const createRelayStoreDefaultModel = () => types.optional(RelayStoreModel, {})
