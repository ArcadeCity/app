import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useStores } from 'stores/root-store'
import { Text } from 'views/shared'
import { color, spacing } from 'views/theme'
import { ProfileSummary } from './ProfileSummary'

export const AccountHome = observer(() => {
  const { relay, user } = useStores()
  if (!user.publicKey) return null
  const metadata = relay.getUserMetadata(user.publicKey)
  return (
    <View style={styles.container}>
      <ProfileSummary
        about={metadata?.about}
        displayName={metadata?.displayName}
        username={metadata?.username}
      />
      <Button title='Log out' onPress={() => user.logout()} />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingHorizontal: spacing[3],
  },
})
