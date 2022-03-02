import { useMemo } from 'react'

const useStorage = (storage = 'sessionStorage') => {
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
