import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Alert, StyleSheet, Text as RNText, TextInput, View } from 'react-native'
import { useStores } from 'stores/root-store'
import { Button } from 'views/entry/Button'
import { Text } from 'views/shared'
import { color, palette, spacing, typography } from 'views/theme'

export const JoinScreen = observer(() => {
  const { user } = useStores()
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [about, setAbout] = useState('')
  const regex = /^[a-zA-Z_\-0-9]+$/
  const pressCreate = () => {
    if (username.length < 3) {
      Alert.alert('Username too short', 'Please enter a username with at least 3 characters')
      return
    }
    if (!regex.test(username)) {
      Alert.alert('Invalid username', 'Please enter a username with only alphanumeric characters')
      return
    }
    console.log(username, displayName, about)
  }
  return (
    <View style={styles.container}>
      <Text text='Username' preset='header' />
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(text) => setUsername(text)}
        placeholder='satoshi'
        placeholderTextColor={palette.blueBell}
        style={styles.input}
      />
      <Text text='Display name (optional)' preset='header' />
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(text) => setDisplayName(text)}
        placeholder='Satoshi Nakamoto'
        placeholderTextColor={palette.blueBell}
        style={styles.input}
      />
      <Text text='About (optional)' preset='header' />
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(text) => setAbout(text)}
        placeholder='Chancellor on brink of second bailout for banks'
        placeholderTextColor={palette.blueBell}
        style={styles.input}
      />
      <Text text='Account ID' preset='header' />
      <Text text={user.publicKey} preset='title3' />
      <Button width={300} height={70} onPress={pressCreate}>
        <RNText style={styles.textJoin}>CREATE ACCOUNT</RNText>
      </Button>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background,
    flex: 1,
    padding: spacing[6],
  },
  input: {
    backgroundColor: color.field,
    borderRadius: 15,
    color: color.text,
    marginBottom: 40,
    marginTop: 10,
    padding: 16,
  },
  textJoin: {
    color: palette.moonRaker,
    fontFamily: typography.bold,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
  },
})
