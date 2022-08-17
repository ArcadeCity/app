// import { Message, useActiveChannelId, useChannelMessages } from '@arcadecity/use-arcade'
import { FlatList, StyleSheet, View } from 'react-native'
import { color, spacing } from 'views/theme'
import { MessagePreview } from './message/message'

interface Message {
  id: string
  pubkey: string
}

export const MessageList = () => {
  // const activeChannelId = useActiveChannelId()
  // if (!activeChannelId) return <></>
  // const messages: Message[] = useChannelMessages(activeChannelId)
  const messages = []
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </View>
  )
}

const keyExtractor = (item: Message) => item.id

const pubkey = 'd67fe59472f658c1b2dec9ffd60b86af260a2f8460b441f9a891761f87b67a5d'
const renderItem = ({ item }: { item: Message }) => (
  <MessagePreview message={item} preset={pubkey === item.pubkey ? 'sent' : 'received'} />
)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    backgroundColor: color.background,
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
  },
  flatList: { flex: 1 },
})
