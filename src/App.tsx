import React, { Component } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { color, palette } from 'views/theme'
import MapboxGL from '@rnmapbox/maps'

MapboxGL.setWellKnownTileServer(Platform.OS === 'android' ? 'Mapbox' : 'mapbox')
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYWNsaW9ucyIsImEiOiJjamVhMmNtY2swaXNtMnBsbnB2aDVqNTBiIn0.gM_i1jhawFz2EpKBX4VmwQ'
)

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: color.background,
  },
  map: {
    flex: 1,
  },
})

export class App extends Component {
  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView
            pitchEnabled={false}
            rotateEnabled={false}
            style={styles.map}
            styleURL={mapStyles.main}
          />
        </View>
      </View>
    )
  }
}

const mapStyles = {
  blank: 'mapbox://styles/aclions/cjoo2gldl3bio2rmktwhcy0qh',
  main: 'mapbox://styles/aclions/cjeai04xo08k02rozqsi9di5a',
}
