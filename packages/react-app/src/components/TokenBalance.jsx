import React, { useState } from 'react'
import { useTokenBalance } from 'eth-hooks/erc/erc-20/useTokenBalance'
import { utils } from 'ethers'

import { HOOK_OPTIONS } from '../constants'

export default function TokenBalance(props) {
  const [dollarMode, setDollarMode] = useState(true)

  const tokenContract = props.contracts && props.contracts[props.name]
  const balance = useTokenBalance(tokenContract, props.address, 1777).mul(
    props.name === 'sKLIMA' || props.name === 'KLIMA' ? Math.pow(10, 9) : 1,
    HOOK_OPTIONS,
  )

  let floatBalance = parseFloat('0.00')

  let usingBalance = balance

  if (typeof props.balance !== 'undefined') usingBalance = props.balance

  if (usingBalance) {
    const etherBalance = utils.formatEther(usingBalance)

    parseFloat(etherBalance).toFixed(2)
    floatBalance = parseFloat(etherBalance)
  }

  let displayBalance = floatBalance.toFixed(4)

  if (props.dollarMultiplier && dollarMode) displayBalance = `$${(floatBalance * props.dollarMultiplier).toFixed(2)}`

  return (
    <span
      style={{
        verticalAlign: 'middle',
        fontSize: 24,
        padding: 8,
        cursor: 'pointer',
      }}
      onClick={() => {
        setDollarMode(!dollarMode)
      }}
    >
      {props.img} {displayBalance}
    </span>
  )
}
