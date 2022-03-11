import React, { useContext, useEffect, useState } from 'react'
import { ConsoleSqlOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { useContractLoader, useContractReader } from 'eth-hooks'
import { useTokenBalance } from 'eth-hooks/erc/erc-20/useTokenBalance'
import { utils } from 'ethers'

import { HOOK_OPTIONS, NETWORKS } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'

const { Text } = Typography

export const Pledge = co2tons => {
  let valueEmmited = 0

  if (co2tons) valueEmmited = (co2tons.co2tons._hex.toString() * 1) / 10 ** 9

  return <Text>{valueEmmited} CO2e tons/year</Text>
}

// eslint-disable-next-line max-lines-per-function

export const PledgeTotal = address => {
  const { contracts } = useContext(WalletContext)

  const pledged = useContractReader(contracts, 'KoywePledge', 'getCommitment', [address], HOOK_OPTIONS) / 10 ** 9

  return <Text>{pledged}</Text>
}

/* export const Emmited = props => {
  const { contractConfig } = useContext(WalletContext)
  const { localProvider } = useContext(NetworkContext)
  const readContracts = useContractLoader(localProvider, contractConfig)

  const CO2TokenBalance = useContractReader(
    readContracts,
    'CO2TokenContract',
    'balanceOf',
    [props.address],
    HOOK_OPTIONS,
  )

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

  return <Text>{displayBalance} Co2</Text>
} */

export const Staked = ({ address, polyContracts }) => {
  const myPolyKlimaBalance = useContractReader(polyContracts, 'PBCT', 'balanceOf', [address], HOOK_OPTIONS)

  const skilmaBalance = (
    (myPolyKlimaBalance && myPolyKlimaBalance > 0 ? myPolyKlimaBalance : 0) / Math.pow(10, 18)
  ).toFixed(4)

  return skilmaBalance
}

export const TokenTotal = ({ address, readContracts }) => {
  const CO2TokenBalance = useContractReader(readContracts, 'CO2TokenContract', 'balanceOf', [address], HOOK_OPTIONS)

  return (
    <Text fontSize={24} padding={8}>
      {(CO2TokenBalance / Math.pow(10, 18)).toFixed(2)} CO2e tons dripped
    </Text>
  )
}

export const Balance = ({ address, polyContracts, USDPrices }) => {
  // Polybalances
  const myPolyMCO2Balance = useContractReader(polyContracts, 'PMCO2', 'balanceOf', [address], HOOK_OPTIONS)

  const myPolyBCTBalance = useContractReader(polyContracts, 'PBCT', 'balanceOf', [address], HOOK_OPTIONS)

  // const myPolyNCTBalance = useContractReader(polyContracts, 'NCT', 'balanceOf', [String(address.address)], HOOK_OPTIONS)

  const myPolyKlimaBalance = useContractReader(polyContracts, 'KLIMA', 'balanceOf', [address], HOOK_OPTIONS)

  const myPolySKlimaBalance = useContractReader(polyContracts, 'sKLIMA', 'balanceOf', [address], HOOK_OPTIONS)

  const [totalBalance, setTotalBalance] = useState(0)

  // read prices from coingecko
  useEffect(() => {
    // we will use async/await to fetch this data
    function getTotalBalance() {
      let sum = 0

      sum +=
        ((myPolyBCTBalance && myPolyBCTBalance > 0 ? myPolyBCTBalance : 0) / Math.pow(10, 18)) *
        (USDPrices &&
          USDPrices['toucan-protocol-base-carbon-tonne'] &&
          USDPrices['toucan-protocol-base-carbon-tonne'].usd)
      sum +=
        ((myPolyMCO2Balance && myPolyMCO2Balance > 0 ? myPolyMCO2Balance : 0) / Math.pow(10, 18)) *
        (USDPrices && USDPrices['moss-carbon-credit'] && USDPrices['moss-carbon-credit'].usd)
      sum +=
        ((myPolyKlimaBalance && myPolyKlimaBalance > 0 ? myPolyKlimaBalance : 0) / Math.pow(10, 9)) *
        (USDPrices && USDPrices['staked-klima'] && USDPrices['staked-klima'].usd)
      sum +=
        ((myPolySKlimaBalance && myPolySKlimaBalance > 0 ? myPolySKlimaBalance : 0) / Math.pow(10, 9)) *
        (USDPrices && USDPrices['klima-dao'] && USDPrices['klima-dao'].usd)
      // sum+=(myPolyMCO2Balance && myPolyMCO2Balance > 0 ? myPolyMCO2Balance : 0)/(Math.pow(10,18))*(prices && prices["moss-carbon-credit"] && prices["moss-carbon-credit"].usd);
      setTotalBalance(sum.toFixed(2))
    }

    getTotalBalance()
  }, [myPolyBCTBalance, myPolyMCO2Balance])

  return <Text>{totalBalance} USD</Text>
}
