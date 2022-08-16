import { StatusBar } from 'expo-status-bar'
import { useCachedResources, useExpoUpdates } from 'lib/hooks'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './navigation'

export const App = () => {
  const isLoadingComplete = useCachedResources()
  useExpoUpdates(3)
  if (!isLoadingComplete) {
    return null
  }
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar style='light' />
    </SafeAreaProvider>
  )
}
