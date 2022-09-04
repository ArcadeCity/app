import * as SecureStore from 'expo-secure-store'
import { display } from 'lib'
import { Alert } from 'react-native'
import { UserStore } from '../user-store'

export const loginFromStoredKeys = async (self: UserStore) => {
  try {
    const storeAvailable = await SecureStore.isAvailableAsync()
    if (!storeAvailable) return false

    const nsec = await SecureStore.getItemAsync('ARCADE_NSEC')
    const npub = await SecureStore.getItemAsync('ARCADE_NPUB')
    const mnemonic = await SecureStore.getItemAsync('ARCADE_MNEMONIC')

    if (!nsec || !npub) {
      display({
        name: 'loginFromStoredKeys',
        preview: 'No keys found in secure storage',
      })
      return false
    }

    self.setPrivateKey(nsec)
    self.setPublicKey(npub)
    if (mnemonic) {
      self.setMnemonic(mnemonic)
    }

    display({
      name: 'loginFromStoredKeys',
      preview: 'Logged in from secure storage',
      value: { nsec, npub, mnemonic },
    })

    self.rootStore.relay.fetchUser(self.publicKey as string)

    self.setAuthed(true)

    return true
  } catch (e) {
    // self.setLoggingIn(false)
    Alert.alert('Login error')
    console.log(e)
    return false
  }
}
