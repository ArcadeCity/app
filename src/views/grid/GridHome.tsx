import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber/native'
import { DeviceOrientationControls } from './DeviceOrientationControls'
import { SplineTest } from './SplineTest'
import { Stars } from './Stars'

function Box(props) {
  const mesh = useRef<any>(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export function GridHome() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <gridHelper position={[0, -5, -5]} scale={1.5} />
      <Suspense fallback={null}>
        <SplineTest />
      </Suspense>
      <DeviceOrientationControls />
      <Stars />
    </Canvas>
  )
}
