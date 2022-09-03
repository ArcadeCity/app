import * as React from 'react'
import { images } from 'views/theme'
import MapboxGL from '@rnmapbox/maps'
import { feature, Feature, featureCollection, FeatureCollection } from '@turf/helpers'
import { Coordinate } from '../mapbox/mapbox.props'
import * as MapStyles from '../mapbox/mapbox.styles'

interface Props {
  centerCoordinate: Coordinate
  style?: any
  zoomLevel: number
}

export const StaticMap = ({ centerCoordinate, style, zoomLevel = 11 }: Props) => {
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
      // userTrackingMode={MapboxGL.UserTrackingModes.Follow}
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
      {/* @ts-expect-error 1005 */}
      <MapboxGL.ShapeSource id='guildCreate' shape={guildShape}>
        <MapboxGL.SymbolLayer id='guildImage' style={MapStyles.layerStyles.profileImage} />
      </MapboxGL.ShapeSource>
      <MapboxGL.Images images={mapImages} />
    </MapboxGL.MapView>
  )
}

const mapImages = {
  guild: images.guildsActive,
}
