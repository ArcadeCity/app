import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useStores } from 'stores/root-store'
import { Button } from 'views/entry/Button'
import { color, palette, spacing } from 'views/theme'

export const JoinScreen = observer(() => {
  const { user } = useStores()
  const [username, setUsername] = useState('')
  const pressCreate = () => {
    console.log(username)
  }
  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        autoFocus={true}
        onChangeText={(text) => setUsername(text)}
        placeholder='Enter username'
        placeholderTextColor={palette.blueBell}
        style={styles.input}
      />
      <Button width={300} height={70} onPress={pressCreate}>
        <Text style={styles.textJoin}>CREATE ACCOUNT</Text>
      </Button>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background,
    // justifyContent: 'center',
    flex: 1,
    paddingHorizontal: spacing[7],
  },
  input: {
    backgroundColor: color.field,
    borderRadius: 15,
    color: color.text,
    padding: 16,
    marginVertical: 30,
  },
  textJoin: {
    color: palette.moonRaker,
    fontFamily: 'Courier New',
    fontSize: 20,
    letterSpacing: 2,
    textAlign: 'center',
    fontWeight: '700',
  },
})
