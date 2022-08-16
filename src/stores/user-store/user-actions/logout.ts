import * as SecureStore from 'expo-secure-store'
import { UserStore } from '../user-store'

export const logout = async (self: UserStore) => {
  self.reset()
  const storeAvailable = await SecureStore.isAvailableAsync()
  if (storeAvailable) {
    await SecureStore.deleteItemAsync('ARCADE_NPUB')
    await SecureStore.deleteItemAsync('ARCADE_NSEC')
    await SecureStore.deleteItemAsync('ARCADE_MNEMONIC')
  }
}
