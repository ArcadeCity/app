import { useEffect } from 'react'
import { useStores } from 'stores/root-store'

export const useNostr = () => {
  const { relay } = useStores()
  useEffect(() => {
    relay.connect()
  }, [])
}
