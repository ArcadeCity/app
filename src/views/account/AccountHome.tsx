import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useStores } from 'stores/root-store'
import { Text } from 'views/shared'
import { color } from 'views/theme'

export const AccountHome = () => {
  const { user } = useStores()
  return (
    <View style={styles.container}>
      <Text text={user.username} preset='header' />
      <Text text={user.displayName} preset='header' />
      <Text text={user.about} preset='header' />
      <Button title='Log out' onPress={() => user.logout()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.background,
    justifyContent: 'center',
  },
})
