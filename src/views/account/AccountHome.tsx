import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useStores } from 'stores/root-store'
import { MenuButton, Text } from 'views/shared'
import { color, images, spacing } from 'views/theme'
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
        picture={metadata?.picture}
        username={metadata?.username}
      />
      {/* <Button title='Log out' onPress={() => user.logout()} /> */}
      <MenuButton image={images.logout} titleTx='comms.logout' onPress={() => user.logout()} last />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingHorizontal: spacing[4],
  },
})
