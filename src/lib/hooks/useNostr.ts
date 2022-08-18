import { useEffect } from 'react'
import { useStores } from 'stores/root-store'
import useInterval from './useInterval'

export const useNostr = () => {
  const { relay } = useStores()
  useEffect(() => {
    relay.connect()
    setTimeout(() => {
      relay.checkAllUserMetadata()
    }, 3000)
  }, [])

  // useInterval(() => {
  //   relay.checkAllUserMetadata()
  // }, 5000)
}
