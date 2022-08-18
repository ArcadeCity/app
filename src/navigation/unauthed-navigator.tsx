import React from 'react'
import { HomeScreen } from 'views/entry/HomeScreen'
import { JoinScreen } from 'views/join/JoinScreen'
import { LoginScreen } from 'views/login/LoginScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { stackOptions } from './stackOptions'

const Stack = createNativeStackNavigator<{
  home: undefined
  login: undefined
  join: undefined
}>()

export function UnauthedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='home'
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='login'
          component={LoginScreen}
          options={{ ...stackOptions, title: 'Enter access code' }}
        />
        <Stack.Screen
          name='join'
          component={JoinScreen}
          options={{ ...stackOptions, title: 'Join Arcade City' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
