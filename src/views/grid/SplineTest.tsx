import { Clone, Float as FloatImpl } from '@react-three/drei/native'
import useSpline from '@splinetool/r3f-spline'

export function SplineTest({ ...props }) {
  const { nodes } = useSpline('https://staging.arcade.city/balls2.spline')

  return (
    <group {...props} dispose={null} position={[0, -2, -15]} scale={0.01}>
      <Float object={nodes['Sphere']} />
      <Float object={nodes['Sphere 2']} />
    </group>
  )
}

const Float = ({ object, intensity = 300, rotation = 1, ...props }) => (
  // @ts-ignore
  <FloatImpl floatIntensity={intensity} rotationIntensity={rotation} speed={2}>
    {/* @ts-ignore */}
    <Clone object={object} {...props} />
  </FloatImpl>
)
