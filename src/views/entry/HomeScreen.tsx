import { MotiView } from 'moti'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FadeInMap } from 'views/map'
import { palette, spacing, typography } from 'views/theme'
import { Button } from './Button'
import { Logo } from './Logo'

export const HomeScreen = ({ navigation }) => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, 5000)
  }, [])
  return (
    <View style={styles.container}>
      <MotiView
        style={styles.containerLogo}
        delay={2500}
        transition={{
          type: 'timing',
          duration: 2500,
        }}
        from={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}>
        <Logo />
      </MotiView>
      <FadeInMap />
      <View style={styles.containerButton}>
        <Button width={300} height={70} onPress={() => navigation.navigate('join')}>
          <Text style={styles.textJoin}>JOIN ARCADE CITY</Text>
        </Button>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('login')}>
          <Text style={styles.textLogin}>Enter access code</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  containerFadeout: {
    flex: 1,
    position: 'absolute',
    zIndex: 9999,
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
  containerButton: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9010,
  },
  textJoin: {
    color: palette.moonRaker,
    fontFamily: typography.bold,
    fontSize: 20,
    letterSpacing: 2,
    textAlign: 'center',
    fontWeight: '700',
  },
  textLogin: {
    color: palette.blueBell,
    fontFamily: typography.bold,
    fontSize: 16,
    letterSpacing: 1.5,
    padding: spacing[4],
    textAlign: 'center',
    fontWeight: '500',
  },
})
