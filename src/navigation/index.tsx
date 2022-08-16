/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 */
import * as React from 'react'
import { navTheme } from 'views/theme'
import { NavigationContainer } from '@react-navigation/native'
import LinkingConfiguration from './LinkingConfiguration'
import { RootNavigator } from './root-navigator'
import { UnauthedNavigator } from './unauthed-navigator'

export default function Navigation() {
  const authed = false
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={navTheme}>
      {authed ? <RootNavigator /> : <UnauthedNavigator />}
    </NavigationContainer>
  )
}
