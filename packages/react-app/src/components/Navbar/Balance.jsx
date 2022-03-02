import React, { useContext, useState } from 'react'
import { useBalance } from 'eth-hooks'
import { useExchangeEthPrice } from 'eth-hooks/dapps/dex'

import { HOOK_OPTIONS } from '../../constants'
import { NetworkContext } from '../../contexts/NetworkContext'

import InfoText from './InfoText'

const { utils } = require('ethers')

const Balance = () => {
  const [dollarMode, setDollarMode] = useState(true)
  const { address, localProvider, targetNetwork, mainnetProvider } = useContext(NetworkContext)

  const price = useExchangeEthPrice(targetNetwork, mainnetProvider)

  const balance = useBalance(localProvider, address, HOOK_OPTIONS)
  const usingBalance = typeof balance !== 'undefined' ? balance.toString() : balance

  const floatBalance = usingBalance ? parseFloat(utils.formatEther(usingBalance)) : parseFloat('0.00')

  const displayBalance = dollarMode ? `$${(floatBalance * (price || 1)).toFixed(2)}` : floatBalance.toFixed(4)

  return <InfoText text={displayBalance} isCopyable={false} onClick={() => setDollarMode(prevState => !prevState)} />
}

export default Balance
