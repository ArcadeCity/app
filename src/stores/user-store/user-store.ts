import { applySnapshot, Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment, withRootStore } from '../_extensions'
import * as actions from './user-actions'

export const UserStoreModel = types
  .model('UserStore')
  .props({
    mnemonic: types.maybe(types.string),
    privateKey: types.maybe(types.string),
    publicKey: types.maybe(types.string),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self) => ({
    login: async (text: string): Promise<boolean> => await actions.login(self as UserStore, text),
    logout: async (text: string): Promise<boolean> => await actions.logout(self as UserStore),
    setMnemonic(mnemonic: string) {
      self.mnemonic = mnemonic
    },
    setPrivateKey(privateKey: string) {
      self.privateKey = privateKey
    },
    setPublicKey(publicKey: string) {
      self.publicKey = publicKey
    },
    reset() {
      applySnapshot(self, {})
    },
  }))
  .views((self) => ({
    get isAuthed(): boolean {
      return !!self.privateKey
    },
  }))

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
