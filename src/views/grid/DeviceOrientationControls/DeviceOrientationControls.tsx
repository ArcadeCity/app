import * as React from 'react'
import { useStore } from 'stores'
import * as THREE from 'three'
// import { ReactThreeFiber, useFrame, useThree } from '../native'
import { ReactThreeFiber, useFrame, useThree } from '@react-three/fiber/native'
import { DeviceOrientationControls as DeviceOrientationControlsImp } from './DeviceOrientationControlsImp'

export const DeviceOrientationControls = React.forwardRef<
  DeviceOrientationControlsImp,
  DeviceOrientationControlsProps
>((props: DeviceOrientationControlsProps, ref) => {
  const setCameraPosition = useStore((s) => s.setCameraPosition)
  const setCameraRotation = useStore((s) => s.setCameraRotation)

  const { camera, onChange, ...rest } = props
  const defaultCamera = useThree(({ camera }) => camera)

  const invalidate = useThree(({ invalidate }) => invalidate)
  const explCamera = camera || defaultCamera
  const [controls] = React.useState<any>(() => new DeviceOrientationControlsImp(explCamera))

  React.useEffect(() => {
    const callback = (e: THREE.Event) => {
      invalidate()
      if (onChange) onChange(e)
    }

    controls?.addEventListener?.('change', callback)
    return () => controls?.removeEventListener?.('change', callback)
  }, [onChange, controls, invalidate])

  useFrame(() => {
    controls?.update()
    // explCamera.position.x += 0.01
    // explCamera.position.y += 0.01
    // explCamera.position.z += 0.01
    setCameraPosition(explCamera.position)
    setCameraRotation(explCamera.rotation)
    // console.log(explCamera.rotation)
  })

  React.useEffect(() => {
    const current = controls
    current?.connect()
    return () => current?.dispose()
  }, [controls])

  return controls ? <primitive ref={ref} dispose={undefined} object={controls} {...rest} /> : null
})

export type DeviceOrientationControlsProps = ReactThreeFiber.Object3DNode<
  DeviceOrientationControlsImp,
  typeof DeviceOrientationControlsImp
> & {
  camera?: THREE.Camera
  onChange?: (e?: THREE.Event) => void
}
