import { feature, Feature, featureCollection, FeatureCollection } from '@turf/helpers'

export const makeGeojson = (data: any) => {
  const users = data.geos
  const features: Feature[] = []

  let i = 0
  // coords.push({
  //     coordinates: [parseFloat(datum.long), parseFloat(datum.lat)],
  // })
  users.forEach((user: any) => {
    i = i + 1
    const userFeature: Feature = feature(
      {
        type: 'Point',
        coordinates: [parseFloat(user.lng), parseFloat(user.lat)],
        wat: 'wattt',
      },
      {
        id: i,
        icon: 'guild',
        type: 'guild',
        testo: 'guildldododod',
      }
    )
    // console.log('props here?', userFeature)
    features.push(userFeature)
  })
  const userCollection: FeatureCollection = featureCollection(features)
  // root.socialStore.setUserShape(userCollection)
  // console.log('userCollection:', userCollection)
  return userCollection
}
