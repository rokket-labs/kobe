import React, { useContext, useEffect, useState } from 'react'
import { useContractLoader, useContractReader } from 'eth-hooks'

import { HOOK_OPTIONS } from '../constants'
import externalContracts from '../contracts/external_contracts'
import deployedContracts from '../contracts/hardhat_contracts.json'
import { useStaticJsonRPC } from '../hooks'

import { NetworkContext } from './NetworkContext'

const contractConfig = { deployedContracts: deployedContracts || {}, externalContracts: externalContracts || {} }

export const WalletContext = React.createContext({
  prices: null,
  walletBalance: {},
  tonsPledged: {},
  contracts: {},
  polygonContracts: {},
  writeContracts: {},
  isPledged: false,
})

export const WalletContextProvider = ({ children }) => {
  const { address, localChainId, userSigner, targetNetwork, polygonProvider } = useContext(NetworkContext)

  const [USDPrices, setUSDPrices] = useState(null) // prices of main tokens of the app

  const localProvider = useStaticJsonRPC([targetNetwork.rpcUrl])

  // Load in your local 📝 contract and read a value from it:
  const contracts = useContractLoader(localProvider, contractConfig)

  const writeContracts = useContractLoader(userSigner, contractConfig, localChainId)

  const polygonContracts = useContractLoader(polygonProvider, contractConfig)
  // Read the balance of the user's wallet
  const polygonMCO2Balance = useContractReader(polygonContracts, 'PMCO2', 'balanceOf', [address], HOOK_OPTIONS)

  const polygonBCTBalance = useContractReader(polygonContracts, 'PBCT', 'balanceOf', [address], HOOK_OPTIONS)

  const polygonNCTBalance = useContractReader(polygonContracts, 'NCT', 'balanceOf', [address], HOOK_OPTIONS)

  const polygonKlimaBalance = useContractReader(polygonContracts, 'KLIMA', 'balanceOf', [address], HOOK_OPTIONS)

  const polygonSKlimaBalance = useContractReader(polygonContracts, 'sKLIMA', 'balanceOf', [address], HOOK_OPTIONS)

  const polygonWethBalance = useContractReader(polygonContracts, 'WETH', 'balanceOf', [address], HOOK_OPTIONS)

  const isPledged = useContractReader(contracts, 'KoywePledge', 'isPledged', [address], HOOK_OPTIONS)
  const tonsPledged = useContractReader(contracts, 'KoywePledge', 'getCommitment', [address], HOOK_OPTIONS)
  const CO2TokenBalance = useContractReader(contracts, 'CO2TokenContract', 'balanceOf', [address], HOOK_OPTIONS)

  const koyweTreeBalance = useContractReader(contracts, 'KoyweCollectibles', 'balanceOf', [address])
  const yourKTBalance = koyweTreeBalance && koyweTreeBalance.toNumber && koyweTreeBalance.toNumber()

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=toucan-protocol-base-carbon-tonne,moss-carbon-credit,klima-dao,staked-klima&vs_currencies=usd',
      )
      const data = await response.json()

      setUSDPrices(data)
    }

    getData()
  }, [])

  const value = {
    USDPrices,
    walletBalance: {
      polygonMCO2Balance,
      polygonBCTBalance,
      polygonNCTBalance,
      polygonKlimaBalance,
      polygonSKlimaBalance,
      polygonWethBalance,
    },
    yourKTBalance,
    tonsPledged,
    contracts,
    polygonContracts,
    writeContracts,
    isPledged,
    contractConfig,
    CO2TokenBalance,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}
