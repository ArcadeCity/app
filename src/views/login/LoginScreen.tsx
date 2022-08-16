import { hexToNsec } from 'lib/nostr'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, TextInput, View } from 'react-native'
import { color, palette, spacing } from 'views/theme'

export const LoginScreen = observer(({ navigation }: any) => {
  const { user } = useStores
  // const [account, accountActions] = useAccount() as any
  // const keys = useAccountKeys()

  // useEffect(() => {
  //   if (keys && keys.publicKey) {
  //     // Alert.alert('Logged in as ' + keys.publicKey)
  //     navigation.goBack()
  //   }
  // }, [keys])

  // if (!account || !accountActions) return <></>

  const onChangeText = (loginAs: string) => {
    try {
      if (loginAs.split(' ').length === 12) {
        login({ mnemonic: loginAs })
      } else if (loginAs.startsWith('nsec')) {
        login({ nsec: loginAs })
      } else if (loginAs.length > 12 && isHex(loginAs)) {
        login({ nsec: hexToNsec(loginAs) })
      }
    } catch (e) {
      console.log('Error trying to validate access code')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        autoFocus={true}
        onChangeText={onChangeText}
        placeholder='Enter access code'
        placeholderTextColor={palette.blueBell}
        style={styles.input}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background,
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: spacing[7],
  },
  input: {
    backgroundColor: color.field,
    borderRadius: 15,
    color: color.text,
    padding: 16,
    marginVertical: 30,
  },
})

function isHex(h) {
  var a = parseInt(h, 16)
  return a.toString(16) === h.toLowerCase()
}
