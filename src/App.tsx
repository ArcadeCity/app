import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { PLEBLAB_COORDS } from 'views/map/dummyData'
import { StaticMap } from 'views/map/static-map'
import { color } from 'views/theme'
import MapboxGL from '@rnmapbox/maps'

MapboxGL.setWellKnownTileServer(Platform.OS === 'android' ? 'Mapbox' : 'mapbox')
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYWNsaW9ucyIsImEiOiJjamVhMmNtY2swaXNtMnBsbnB2aDVqNTBiIn0.gM_i1jhawFz2EpKBX4VmwQ'
)

export const App = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <StaticMap
          centerCoordinate={[PLEBLAB_COORDS.longitude, PLEBLAB_COORDS.latitude]}
          zoomLevel={15}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  page: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
})
