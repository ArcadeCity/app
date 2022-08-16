import { MotiView } from 'moti'
import React, { useEffect } from 'react'
import { Dimensions, useWindowDimensions } from 'react-native'
import Animated, { FadeOut, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { images } from 'views/theme'
import {
  Canvas, DisplacementMap, Image, mix, Turbulence, useImage, useSharedValueEffect, useValue
} from '@shopify/react-native-skia'

export const Filter = () => {
  const image = useImage(images.splash)

  const x = useValue(0)
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 3000 }), -1, true)
  }, [progress])

  useSharedValueEffect(() => {
    x.current = mix(progress.value, 0, 15)
  }, progress) // you can pass other shared values as extra parameters

  const { width, height } = useWindowDimensions()
  if (!image) {
    return null
  }
  return (
    <MotiView
      delay={750}
      transition={{
        type: 'timing',
        duration: 2000,
      }}
      from={{
        opacity: 1,
      }}
      animate={{
        opacity: 0,
      }}>
      <Canvas style={{ width, height }}>
        <Image image={image} x={0} y={0} width={width} height={height} fit='cover'>
          <DisplacementMap channelX='g' channelY='a' scale={x}>
            <Turbulence freqX={0.01} freqY={0.05} octaves={2} seed={2} />
          </DisplacementMap>
        </Image>
      </Canvas>
    </MotiView>
  )
}
