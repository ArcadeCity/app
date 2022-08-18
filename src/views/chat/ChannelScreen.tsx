import { RootStackScreenProps } from 'navigation/types'
import { useEffect } from 'react'
import { View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'

export const ChannelScreen = ({ navigation }: RootStackScreenProps<'channel'>) => {
  const route = useRoute<any>()
  const title = route?.params?.name
  useEffect(() => {
    navigation.setOptions({ title })
  }, [title])
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <MessageList />
      <MessageInput />
    </View>
  )
}
