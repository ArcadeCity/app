import { Canvas, Circle, Group, LinearGradient, vec } from '@shopify/react-native-skia'

const width = 48
const height = 48

export const Blue = () => {
  const r = width / 2
  return (
    <Canvas style={{ width, height }}>
      <Circle cx={r} cy={r} r={r}>
        <LinearGradient start={vec(0, 0)} end={vec(2 * r, 2 * r)} colors={['#0061ff', '#60efff']} />
      </Circle>
    </Canvas>
  )
}
