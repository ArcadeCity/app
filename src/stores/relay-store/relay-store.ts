import { applySnapshot, Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment, withRootStore } from '../_extensions'
import * as actions from './relay-actions'

export const RelayStoreModel = types
  .model('RelayStore')
  .props({})
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self) => ({
    connect: async (): Promise<void> => await actions.connect(self as RelayStore),
    reset() {
      applySnapshot(self, {})
    },
  }))

type RelayStoreType = Instance<typeof RelayStoreModel>
export interface RelayStore extends RelayStoreType {}
type RelayStoreSnapshotType = SnapshotOut<typeof RelayStoreModel>
export interface RelayStoreSnapshot extends RelayStoreSnapshotType {}
export const createRelayStoreDefaultModel = () => types.optional(RelayStoreModel, {})
