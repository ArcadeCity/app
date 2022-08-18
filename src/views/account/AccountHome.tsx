import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useStores } from 'stores/root-store'
import { Text } from 'views/shared'
import { color } from 'views/theme'

export const AccountHome = observer(() => {
  const { relay, user } = useStores()
  if (!user.publicKey) return null
  const metadata = relay.getUserMetadata(user.publicKey)
  return (
    <View style={styles.container}>
      <Text text={metadata?.username} preset='header' />
      <Text text={metadata?.displayName} preset='header' />
      <Text text={metadata?.about} preset='header' />
      <Button title='Log out' onPress={() => user.logout()} />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.background,
    justifyContent: 'center',
  },
})
