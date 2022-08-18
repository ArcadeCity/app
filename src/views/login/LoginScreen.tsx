import { observer } from 'mobx-react-lite'
import { StyleSheet, TextInput, View } from 'react-native'
import { useStores } from 'stores/root-store'
import { color, palette, spacing } from 'views/theme'

export const LoginScreen = observer(() => {
  const { user } = useStores()
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        autoFocus={true}
        onChangeText={user.login}
        placeholder='Enter Nostr seed phrase or private key'
        placeholderTextColor={palette.blueBell}
        style={styles.input}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background,
    flex: 1,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[4],
  },
  input: {
    backgroundColor: color.field,
    borderRadius: 15,
    color: color.text,
    padding: 16,
    marginVertical: 30,
  },
})
