import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { DemoMap, PLEBLAB_COORDS } from 'views/map'
import { color } from 'views/theme'
import MapboxGL from '@rnmapbox/maps'

MapboxGL.setWellKnownTileServer(Platform.OS === 'android' ? 'Mapbox' : 'mapbox')
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYWNsaW9ucyIsImEiOiJjamVhMmNtY2swaXNtMnBsbnB2aDVqNTBiIn0.gM_i1jhawFz2EpKBX4VmwQ'
)

export const App = () => {
  return (
    <View style={styles.page}>
      <DemoMap
        centerCoordinate={[PLEBLAB_COORDS.longitude, PLEBLAB_COORDS.latitude]}
        zoomLevel={15}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    backgroundColor: color.background,
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
})
