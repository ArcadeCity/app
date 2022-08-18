import { TextStyle, View, ViewStyle } from 'react-native'
import { Avatar, Text } from 'views/shared'
import { color, spacing } from 'views/theme'

interface ProfileSummaryProps {
  about: string
  displayName: string
  picture: string
  username: string
}

export const ProfileSummary = ({ about, displayName, picture, username }: ProfileSummaryProps) => {
  const levelAndClass = 'Level 0 Noob'
  const name = displayName.length > 0 ? displayName : username
  const secondName = displayName ? username : undefined
  return (
    <View style={ROOT}>
      <Avatar preset='s138x200' uri={picture} forOnPress={() => {}} activeOpacity={1} />
      <View style={DETAILS}>
        <Text preset='title' text={name} style={NAME} />
        <Text preset='bold' text={levelAndClass} style={{ marginVertical: 6 }} />
        <Text preset='description' text={secondName} style={{ marginBottom: 6 }} />
        <View style={DIVIDER} />
        <Text preset='descriptionSlim' text={about} />
      </View>
    </View>
  )
}

const ROOT: ViewStyle = {
  // flex: 1,
  flexDirection: 'row',
  paddingTop: spacing[4],
  paddingBottom: spacing[5],
}

const DETAILS: ViewStyle = {
  justifyContent: 'flex-end',
  flex: 1,
  paddingLeft: spacing[4],
}

const NAME: TextStyle = {
  marginVertical: 0,
}

const DIVIDER: ViewStyle = {
  backgroundColor: color.line,
  height: 1,
  marginBottom: spacing[2],
  marginTop: spacing[2],
  width: spacing[4],
}
