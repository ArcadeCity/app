import * as React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'

export function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})
