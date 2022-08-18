import * as Clipboard from 'expo-clipboard'
import { hexToNpub, hexToNsec } from 'lib/nostr'
import { observer } from 'mobx-react-lite'
import { Alert, TouchableOpacity, View } from 'react-native'
import { useStores } from 'stores/root-store'
import { Screen, Text } from 'views/shared'
import { spacing } from 'views/theme'

export const Keys = observer(() => {
  const { user } = useStores()
  if (!user.publicKey || !user.privateKey) return null

  const npubkey = hexToNpub(user.publicKey)
  const nseckey = hexToNsec(user.privateKey)
  const mnemonic = user.mnemonic ?? null

  const copyPublicKey = async () => {
    await Clipboard.setStringAsync(npubkey)
    Alert.alert('Public key copied to clipboard!')
  }

  const copyPrivateKey = async () => {
    await Clipboard.setStringAsync(nseckey)
    Alert.alert('Private key copied to clipboard!')
  }

  const copyMnemonic = async () => {
    if (!mnemonic) return
    await Clipboard.setStringAsync(mnemonic)
    Alert.alert('Seed phrase copied to clipboard!')
  }

  return (
    <Screen preset='fixed' unsafe>
      <View style={{ flex: 1, padding: spacing[6] }}>
        <Text
          text='Save your private key and/or seed phrase securely!'
          preset='bold'
          style={{ marginBottom: 20 }}
        />
        <Text
          text='Tap on each key to copy it to the clipboard, and paste it somewhere safe.'
          preset='description'
        />

        <Text
          text='You can log in with either your private key or your seed phrase. DO NOT share your private key or seed phrase with anyone or they will be able to log in to your account.'
          preset='description'
        />
        <Text
          text='Your public key identifies you on the Nostr network. You can share it with anyone you want.'
          preset='description'
          style={{ marginBottom: 40 }}
        />

        <TouchableOpacity activeOpacity={0.8} onPress={copyPublicKey}>
          <Text text='Public key' preset='header' />
          <Text text={npubkey} preset='description' />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={copyPrivateKey}>
          <Text text='Private key' preset='header' />
          <Text text={nseckey} preset='description' />
        </TouchableOpacity>
        {mnemonic && (
          <TouchableOpacity activeOpacity={0.8} onPress={copyMnemonic}>
            <Text text='Seed phrase' preset='header' />
            <Text text={mnemonic} preset='description' />
          </TouchableOpacity>
        )}
      </View>
    </Screen>
  )
})
