import React from 'react'
import { Placeholder } from 'views/dev'
import { HomeScreen } from 'views/entry/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<{
  home: undefined
  login: undefined
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
          component={Placeholder}
          options={{ title: 'Log in with access code' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
