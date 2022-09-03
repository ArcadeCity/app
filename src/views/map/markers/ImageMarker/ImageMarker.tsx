import React from 'react'
import { Canvas, Image, useImage } from '@shopify/react-native-skia'

export const ImageMarker = ({ image }) => {
  const usedImage = useImage(image)
  const height = 80
  const width = 80
  if (!usedImage) {
    return null
  }
  return (
    <Canvas style={{ width, height }}>
      <Image image={usedImage} x={0} y={0} width={width} height={height} fit='contain'></Image>
    </Canvas>
  )
}
