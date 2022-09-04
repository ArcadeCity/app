import * as React from 'react'
import { Alert, View } from 'react-native'
import { Breathe } from 'views/skia/Breathe'
import { HelloWorld } from 'views/skia/HelloWorld'
import { images } from 'views/theme'
import MapboxGL from '@rnmapbox/maps'
import { feature, Feature, featureCollection, FeatureCollection } from '@turf/helpers'
import { Coordinate } from '../mapbox/mapbox.props'
import * as MapStyles from '../mapbox/mapbox.styles'
import { ImageMarker } from '../markers'
import { Blue } from '../markers/Blue'
import { ModelMarker } from '../markers/ModelMarker'

interface Props {
  centerCoordinate: Coordinate
  style?: any
  zoomLevel: number
}

export const DemoMap = ({ centerCoordinate, style, zoomLevel = 11 }: Props) => {
  const getOneGuildShape = () => {
    const guildFeature: Feature = feature(
      {
        type: 'Point',
        coordinates: centerCoordinate,
      },
      {
        id: 'donmatta',
        icon: 'guild',
        type: 'guild',
      }
    )
    const guildsCollection: FeatureCollection = featureCollection([guildFeature])
    return guildsCollection
  }
  const guildShape = getOneGuildShape()
  return (
    <MapboxGL.MapView
      rotateEnabled={false}
      pitchEnabled={false}
      scrollEnabled={true}
      zoomEnabled={true}
      style={[MapStyles.map, style]}
      styleURL={MapStyles.styleURLs.main}>
      <MapboxGL.Camera
        defaultSettings={{
          centerCoordinate,
          zoomLevel,
        }}
      />

      {/* <MapboxGL.ShapeSource
        id='guildCreate'
        // onPress={(e) => console.log(e.features)}
        onPress={() => Alert.alert('PlebLab!')}
        // @ts-expect-error 1005
        shape={guildShape}>
        <MapboxGL.SymbolLayer id='guildImage' style={MapStyles.layerStyles.bigGuildImage} />
      </MapboxGL.ShapeSource> */}
      <MapboxGL.Images images={mapImages} />
      <MapboxGL.MarkerView coordinate={centerCoordinate} id='wat'>
        <ModelMarker />
      </MapboxGL.MarkerView>
    </MapboxGL.MapView>
  )
}

const mapImages = {
  guild: images.guildsBig,
}
