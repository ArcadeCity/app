import React from 'react'
import { Canvas, Circle, Group, Image, LinearGradient, useImage, vec } from '@shopify/react-native-skia'

export const ImageMarker = ({ image }) => {
  const usedImage = useImage(image)
  const height = 80
  const width = 80
  const r = width / 2
  if (!usedImage) {
    return null
  }
  return (
    <Canvas style={{ width, height }}>
      <Circle cx={r} cy={r} r={r}>
        <LinearGradient start={vec(0, 0)} end={vec(3 * r, 3 * r)} colors={['#0061ff', '#60efff']} />
      </Circle>
      <Image
        image={usedImage}
        x={width * 0.125}
        y={width * 0.125}
        width={width * 0.75}
        height={height * 0.75}
        fit='contain'></Image>
    </Canvas>
  )
}
