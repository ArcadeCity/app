import { WebView } from 'react-native-webview'
import { palette } from 'views/theme'

export const Map = () => {
  return (
    <WebView
      style={{ backgroundColor: palette.haiti, flex: 1 }}
      source={{ uri: 'https://map-demo.arcade.city' }}
    />
  )
}
