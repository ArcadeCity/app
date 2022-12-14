import React from 'react'
import { Platform, Pressable, View, ViewStyle } from 'react-native'
import { AccountHome } from 'views/account/AccountHome'
import { ChatHome } from 'views/chat/ChatHome'
// import { MapHome } from 'views/map/MapHome'
import { Placeholder } from 'views/dev'
import { FeedHome } from 'views/feed/FeedHome'
import { GridHome } from 'views/grid/GridHome'
import { MapHome } from 'views/map'
import { color, palette, typography } from 'views/theme'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AccountNavigator } from './account-navigator'
import { ChatNavigator } from './chat-navigator'
import { RootTabParamList, RootTabScreenProps } from './types'

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

export function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName='MapHome'
      screenOptions={{
        tabBarActiveTintColor: palette.moonRaker,
        tabBarInactiveTintColor: palette.blueBell,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: color.tabbar,
          borderTopWidth: 2,
          borderTopColor: palette.portGore,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 30 : 15,
        },
      }}>
      <BottomTab.Screen
        name='ChatHome'
        component={ChatNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='stream' color={color} focused={focused} /> // list-ul
          ),
          headerStyle: {
            backgroundColor: color.tabbar,
            borderBottomWidth: 2,
            borderBottomColor: palette.portGore,
          },
          headerTitleStyle: {
            color: color.text,
            fontFamily: typography.secondary,
          },
        }}
      />

      <BottomTab.Screen
        name='MapHome'
        component={MapHome}
        options={({ navigation }: RootTabScreenProps<'MapHome'>) => ({
          title: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='globe-americas' color={color} focused={focused} />
          ),
          headerShown: false,
        })}
      />

      <BottomTab.Screen
        name='GridHome'
        component={GridHome}
        options={({ navigation }: RootTabScreenProps<'GridHome'>) => ({
          title: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='globe' color={color} focused={focused} />
          ),
          headerShown: false,
        })}
      />

      {/* <BottomTab.Screen
        name='WalletHome'
        component={Placeholder}
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='wallet' color={color} focused={focused} />
          ),
          headerStyle: {
            backgroundColor: color.tabbar,
            borderBottomWidth: 2,
            borderBottomColor: palette.portGore,
          },
          headerTitleStyle: {
            color: color.text,
            fontFamily: typography.secondary,
          },
        }}
      /> */}
      <BottomTab.Screen
        name='AccountHome'
        component={AccountNavigator}
        options={{
          headerShown: false,
          // title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name='user-alt' color={color} focused={focused} />
          ),
          headerStyle: {
            backgroundColor: color.tabbar,
            borderBottomWidth: 2,
            borderBottomColor: palette.portGore,
          },
          headerTitleStyle: {
            color: color.text,
            fontFamily: typography.secondary,
          },
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  color: string
  focused: boolean
  name: React.ComponentProps<typeof FontAwesome5>['name']
}) {
  return (
    <>
      <FontAwesome5 size={32} {...props} />
      {props.focused && <View style={ACTIVE_INDICATOR} />}
    </>
  )
}

const ACTIVE_INDICATOR: ViewStyle = {
  position: 'absolute',
  bottom: -2,
  height: 4,
  width: 4,
  borderRadius: 2,
  backgroundColor: color.highlight,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 1,
  shadowRadius: 4,
  shadowColor: 'rgb(244,89,244)', //color.highlight,
}
