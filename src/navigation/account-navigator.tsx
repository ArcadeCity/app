import React from 'react'
import { AccountHome } from 'views/account/AccountHome'
import { Keys } from 'views/account/Keys'
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
        component={Keys}
        options={{
          ...stackOptions,
          title: 'Keys',
          headerLeft: () => <NavButton onPress={() => navigation.navigate('Account')} />,
        }}
      />
    </Stack.Navigator>
  )
}
