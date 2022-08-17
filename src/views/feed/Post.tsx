import { StyleSheet, Text, View } from 'react-native'
import { Event } from 'stores/relay-store/relay-models'
import { palette, spacing } from 'views/theme'

export const Post = ({ event }: { event: Event }) => {
  return (
    <View style={styles.container} key={event.id}>
      <Text style={{ color: palette.moonRaker }}>{event.content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing[3],
  },
})
