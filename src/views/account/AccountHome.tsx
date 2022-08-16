import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useStores } from 'stores/root-store'
import { color } from 'views/theme'

export const AccountHome = () => {
  const { user } = useStores()
  return (
    <View style={styles.container}>
      <Button title='Log out' onPress={user.logout} />
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
