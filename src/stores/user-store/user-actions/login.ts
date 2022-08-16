import * as SecureStore from 'expo-secure-store'
import { isHex } from 'lib/isHex'
import { hexToNsec } from 'lib/nostr'
import { Alert } from 'react-native'
import { UserStore } from '../user-store'

export const login = async (self: UserStore, text: string) => {
  const loginWithMnemonic = async (mnemonic: string) => {
    console.log('LOGGING IN WITH MNEMONIC', mnemonic)
    const { privateKey, publicKey } = getKeysForMnemonic(mnemonic)
    const newAccountKeys: AccountKeys = { mnemonic, privateKey, publicKey }
    self.setMnemonic(mnemonic)
    self.setPrivateKey(privateKey)
    self.setPublicKey(publicKey)
    const storeAvailable = await SecureStore.isAvailableAsync()
    if (storeAvailable) {
      await SecureStore.setItemAsync('ARCADE_NPUB', newAccountKeys.publicKey)
      await SecureStore.setItemAsync('ARCADE_NSEC', newAccountKeys.privateKey)
      await SecureStore.setItemAsync('ARCADE_MNEMONIC', newAccountKeys.mnemonic as string)
    }
  }

  const loginWithNsec = async (nsec: string) => {
    console.log('LOGGING IN WITH NSEC', nsec)
    const { privateKey, publicKey } = getKeysForNsec(nsec)
    const newAccountKeys: AccountKeys = { privateKey, publicKey }
    console.log('newAccountKeys', newAccountKeys)
    self.setPrivateKey(privateKey)
    self.setPublicKey(publicKey)
    const storeAvailable = await SecureStore.isAvailableAsync()
    if (storeAvailable) {
      await SecureStore.setItemAsync('ARCADE_NPUB', newAccountKeys.publicKey)
      await SecureStore.setItemAsync('ARCADE_NSEC', newAccountKeys.privateKey)
    }
  }

  try {
    if (text.split(' ').length === 12) {
      loginWithMnemonic(text)
    } else if (text.startsWith('nsec')) {
      loginWithNsec(text)
    } else if (text.length > 12 && isHex(text)) {
      loginWithNsec(hexToNsec(text))
    }
    return true
  } catch (e) {
    // self.setLoggingIn(false)
    console.log('Error trying to validate access code')
    Alert.alert('Login error')
    console.log(e)
    return false
  }
}

export interface AccountKeys {
  mnemonic?: string
  publicKey: string
  privateKey: string
}