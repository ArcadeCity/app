import { StatusBar } from 'expo-status-bar'
import { useCachedResources, useExpoUpdates } from 'lib/hooks'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export const App = () => {
  const isLoadingComplete = useCachedResources()
  useExpoUpdates(3)
  if (!isLoadingComplete) {
    return null
  }
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: 'blue' }} />
      <StatusBar style='light' />
    </SafeAreaProvider>
  )
}
