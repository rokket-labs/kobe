import React, { useEffect, useState } from 'react'

import useStorage from '../hooks/useStorage'

export const IsPledgedContext = React.createContext({
  isPledged: false,
  co2: 0,
  hasCalculator: false,
  handleIsPledged: () => {
    console.log('isPledged')
  },

  handleCo2: () => {
    console.log('co2')
  },

  handleHasCalculator: () => {
    console.log('hasCalculator')
  },
})

export const IsPledgedProvider = ({ children }) => {
  const [isPledged, setIsPledged] = useState(false)
  const [co2, setCo2] = useState(0)
  const [hasCalculator, setHasCalculator] = useState(false)
  const { getItem, setItem } = useStorage('localStorage')

  const handleIsPledged = pledged => {
    if (setItem('isPledged', `${pledged}`)) setIsPledged(pledged)
  }

  const handleCo2 = value => {
    if (setItem('co2', `${value}`)) setCo2(value)
  }

  const handleHasCalculator = calculator => {
    if (setItem('hasCalculator', `${calculator}`)) setHasCalculator(calculator)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') setIsPledged(!!getItem('isPledged'))
  }, [getItem])

  useEffect(() => {
    if (typeof window !== 'undefined') setCo2(Number(getItem('co2') ?? 0))
  }, [getItem])

  useEffect(() => {
    if (typeof window !== 'undefined') setHasCalculator(!!getItem('hasCalculator'))
  }, [getItem])

  const value = {
    isPledged,
    co2,
    hasCalculator,
    handleIsPledged,
    handleCo2,
    handleHasCalculator,
  }

  return <IsPledgedContext.Provider value={value}>{children}</IsPledgedContext.Provider>
}
