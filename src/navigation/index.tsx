import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useStores } from 'stores/root-store'
import { navTheme } from 'views/theme'
import { NavigationContainer } from '@react-navigation/native'
import LinkingConfiguration from './LinkingConfiguration'
import { RootNavigator } from './root-navigator'
import { UnauthedNavigator } from './unauthed-navigator'

export const Navigation = observer(() => {
  const { user } = useStores()
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={navTheme}>
      {user.isOnboarded ? <RootNavigator /> : <UnauthedNavigator />}
    </NavigationContainer>
  )
})
