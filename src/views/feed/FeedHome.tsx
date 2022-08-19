import { values } from 'mobx'
import { observer } from 'mobx-react-lite'
import { RootTabScreenProps } from 'navigation/types'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useStores } from 'stores'
import { Event } from 'stores/relay-store/relay-models'
import { ACTIVE_OPACITY, palette } from 'views/theme'
import { AntDesign } from '@expo/vector-icons'
import { Post } from './Post'

export const FeedHome = observer(({ navigation }: RootTabScreenProps<'FeedHome'>) => {
  const { relay } = useStores()
  const events: any = values(relay.events)
  const sortedEvents = events
    .filter((event: Event) => event.kind === 1)
    .sort((a: Event, b: Event) => {
      return b.created_at - a.created_at
    })
  const key = 'id'
  const arrayUniqueByKey: any[] = [
    ...new Map(sortedEvents.map((item: any) => [item[key], item])).values(),
  ]
  const clickNewRequest = () => {
    navigation.navigate('NewRequest')
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={arrayUniqueByKey}
        renderItem={({ item }: { item: Event }) => <Post event={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      />
      {/* <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        style={styles.floatingButton}
        onPress={clickNewRequest}>
        <AntDesign name='plus' size={26} color='white' />
      </TouchableOpacity> */}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.electricViolet,
    position: 'absolute',
    bottom: 25,
    right: 15,
  },
})
