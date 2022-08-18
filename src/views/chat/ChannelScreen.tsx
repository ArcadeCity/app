import { RootStackScreenProps } from 'navigation/types'
import { useEffect } from 'react'
import { View } from 'react-native'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'

export const ChannelScreen = ({ navigation, route }: RootStackScreenProps<'channel'>) => {
  const title = route.params.name
  useEffect(() => {
    navigation.setOptions({ title })
  }, [title])
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <MessageList />
      <MessageInput channelId={route.params.id} />
    </View>
  )
}
