import { useMemo } from 'react'

/**
  type StorageType = 'localStorage' | 'sessionStorage'

  type UseStorageReturnValue = {
    getItem: (key: string) => string
    setItem: (key: string, value: string) => boolean
    removeItem: (key: string) => void
  }
*/

const useStorage = (
  storage = 'sessionStorage',
) => {
  const storageMethods = useMemo(() => {
    const isBrowser = (() => typeof window !== 'undefined')()

    const getItem = key => {
      return isBrowser ? window[storage][key] : ''
    }

    const setItem = (key, value) => {
      if (isBrowser) {
        window[storage].setItem(key, value)

        return true
      }

      return false
    }

    const removeItem = key => {
      window[storage].removeItem(key)
    }

    return {
      getItem,
      setItem,
      removeItem,
    }
  }, [storage])

  return storageMethods
}

export default useStorage
