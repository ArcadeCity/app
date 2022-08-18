import React, { useContext } from 'react'
import { Pressable } from 'react-native'
import { AccountHome } from 'views/account/AccountHome'
import { ChannelScreen } from 'views/chat/ChannelScreen'
import { ChatHome } from 'views/chat/ChatHome'
import { Placeholder } from 'views/dev'
import { palette } from 'views/theme'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavButton } from './nav-button'
import { stackOptions } from './stackOptions'

const Stack = createNativeStackNavigator()

export const AccountNavigator = () => {
  const navigation = useNavigation<any>()

  return (
    <Stack.Navigator initialRouteName='Account'>
      <Stack.Screen
        name='Account'
        component={AccountHome}
        options={{ ...stackOptions, title: 'Account' }}
      />
      <Stack.Screen
        name='keys'
        component={Placeholder}
        options={{
          ...stackOptions,
          title: 'Keys',
          headerLeft: () => <NavButton onPress={() => navigation.navigate('Account')} />,
        }}
      />
    </Stack.Navigator>
  )
}
