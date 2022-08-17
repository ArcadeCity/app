import { RootStackScreenProps } from 'navigation/types'
import { View } from 'react-native'
import { MessageInput } from './MessageInput'
import { MessageList } from './MessageList'

export const ChannelScreen = ({ navigation }: RootStackScreenProps<'channel'>) => {
  // console.log(metadata)
  // useEffect(() => {
  // navigation.setOptions({ title: metadata.name })
  // }, [metadata])
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <MessageList />
      <MessageInput />
    </View>
  )
}
