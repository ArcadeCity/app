import * as React from 'react'
import { useStores } from 'stores/root-store'
import { navTheme } from 'views/theme'
import { NavigationContainer } from '@react-navigation/native'
import LinkingConfiguration from './LinkingConfiguration'
import { RootNavigator } from './root-navigator'
import { UnauthedNavigator } from './unauthed-navigator'

export default function Navigation() {
  const { user } = useStores()
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={navTheme}>
      {user.isAuthed ? <RootNavigator /> : <UnauthedNavigator />}
    </NavigationContainer>
  )
}
