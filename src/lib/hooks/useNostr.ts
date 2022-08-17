import { useEffect } from 'react'
import { useStores } from 'stores/root-store'

export const useNostr = () => {
  const { user } = useStores()
  useEffect(() => {
    user.nostrConnect()
  }, [])
}
