import { MotiView } from 'moti'
import React from 'react'
import { palette } from 'views/theme'
import { Map } from './map'

export const FadeInMap = () => {
  return (
    <>
      <MotiView
        delay={2500}
        transition={{
          type: 'timing',
          duration: 2500,
        }}
        style={{
          flex: 1,
          backgroundColor: palette.haiti,
          position: 'absolute',
          zIndex: 7888,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        from={{
          opacity: 1,
        }}
        animate={{
          opacity: 0.2,
        }}
      />
      <Map />
    </>
  )
}
