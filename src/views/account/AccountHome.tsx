import { translate } from 'i18n'
import { capitalize } from 'lib/util'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Alert, Button, StyleSheet, View } from 'react-native'
import { useStores } from 'stores/root-store'
import { MenuButton, Text } from 'views/shared'
import { color, images, spacing } from 'views/theme'
import { ProfileSummary } from './ProfileSummary'

export const AccountHome = observer(({ navigation }: any) => {
  const { relay, user } = useStores()
  if (!user.publicKey) return null
  const metadata = relay.getUserMetadata(user.publicKey)

  const onClickLogout = () => {
    Alert.alert(
      'Log out - Are you sure?',
      'If you log out without saving your keys, this account will be lost forever',
      [
        {
          text: capitalize(translate('common.no')),
          style: 'cancel',
        },
        {
          text: capitalize(translate('common.yes')),
          style: 'destructive',
          onPress: () => user.logout(),
        },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <ProfileSummary
        about={metadata?.about}
        displayName={metadata?.displayName}
        picture={metadata?.picture}
        username={metadata?.username}
      />
      {/* <Button title='Log out' onPress={() => user.logout()} /> */}
      <MenuButton
        image={images.guildsActive}
        title='View my keys'
        onPress={() => navigation.navigate('keys')}
      />
      <MenuButton image={images.logout} titleTx='comms.logout' onPress={onClickLogout} last />
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
