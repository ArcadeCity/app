import React from 'react'
import { Platform } from 'react-native'
import MapboxGL from '@rnmapbox/maps'
import { MapIdle } from '../map-idle'

MapboxGL.setWellKnownTileServer(Platform.OS === 'android' ? 'Mapbox' : 'mapbox')
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYWNsaW9ucyIsImEiOiJjamVhMmNtY2swaXNtMnBsbnB2aDVqNTBiIn0.gM_i1jhawFz2EpKBX4VmwQ'
)

export const MapHome = () => {
  return <MapIdle />
}
