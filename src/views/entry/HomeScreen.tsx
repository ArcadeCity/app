import { StyleSheet, View } from 'react-native'
import { FadeInMap } from 'views/map'
import { Logo } from './Logo'

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Logo />
      </View>
      <FadeInMap />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  containerLogo: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 150,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9000,
  },
})
