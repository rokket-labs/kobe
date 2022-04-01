
import React, { useContext, useEffect, useState } from 'react'
import {  InfuraProvider,JsonRpcProvider, StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { darkTheme, SwapWidget,Theme } from '@uniswap/widgets'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { Col, Divider, Row, Space, Typography } from 'antd'
import { useContractReader, useGasPrice } from 'eth-hooks'
import { useExchangeEthPrice } from 'eth-hooks/dapps/dex'
import { Provider } from 'web3modal'

import { BCTVendor } from '../components'
import MyRegenPositionsFull from '../components/RegenDefi/MyRegenPositionsFull'
import PortfolioChart from '../components/RegenDefi/PortfolioChart'
import SimpleRamp from '../components/RegenDefi/SimpleRamp'
import { HOOK_OPTIONS } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'
import { Transactor } from '../helpers'
import { getFightData, getPlightData } from '../helpers/dashboardData'
import { useUserProvider } from '../hooks'

import '@uniswap/widgets/dist/fonts.css'


const { utils, providers } = require('ethers')
const { Title } = Typography

const jsonRpcEndpoint = 'https://mainnet.infura.io/v3/7b0e75d38d424750b92791477924d133'
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER
const localProvider = new StaticJsonRpcProvider(localProviderUrlFromEnv)

const MY_TOKEN_LIST = [
  {
    'name': 'Moss Carbon Credit',
    'address': '0xAa7DbD1598251f856C12f63557A4C4397c253Cea',
    'symbol': 'MCO2',
    'decimals': 18,
    'chainId': 137,
    'logoURI': 'https://i.imgur.com/ZcOLkHe.jpg',
  },
    {
    'name': 'Toucan',
    'address': '0x2F800Db0fdb5223b3C3f354886d907A671414A7F',
    'symbol': 'BCT',
    'decimals': 18,
    'chainId': 137,
    'logoURI': 'https://avatars.githubusercontent.com/u/61622186?s=200&v=4',
  },
    {
    'name': 'Toucan Protocol: Nature Carbon Tonne',
    'address': '0xd838290e877e0188a4a44700463419ed96c16107',
    'symbol': 'NCT',
    'decimals': 18,
    'chainId': 137,
    'logoURI': 'https://polygonscan.com/token/images/toucannct_32.png',
  },
   {
    'name': 'KLIMA',
    'address': '0x4e78011ce80ee02d2c3e649fb657e45898257815',
    'symbol': 'KLIMA',
    'decimals': 9,
    'chainId': 137,
    'logoURI': 'https://polygonscan.com/token/images/klimadao_32.png',
  },
]

const ReFi = () => {
  const { USDPrices, walletBalance, isPledged, isLoadingBalances } = useContext(WalletContext)
  const { polygonMCO2Balance, polygonBCTBalance, polygonNCTBalance, polygonKlimaBalance, polygonSKlimaBalance } = walletBalance
  const { address, isLoadingAccount } = useContext(NetworkContext)

  const [balance,setBalance] = useState(0)

  const myDarkTheme = {
    ...darkTheme, // Extend the darkTheme
    accent: '#1a3e1e',
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    container: '#1d4723',
    module: '#409c4c',
    interactive: '#63f175',
    borderradius: '#FFFFFF',
    outline: '#FFFFFF',
    dialog: '#409c4c',
  }

  useEffect(() => {
    const fightData = getFightData(
      polygonBCTBalance,
      polygonMCO2Balance,
      polygonNCTBalance,
      polygonKlimaBalance,
      polygonSKlimaBalance,
      0,
      USDPrices,
      isPledged,
    )

    setBalance(fightData[2].quantity)

  }, [isLoadingBalances])

  return (
<Row justify="center" lassName="mb-md">
      <Space>
        <Space style={{ width: '100%' }} direction="vertical">
          <Title level={2}>Total Portfolio Value: {balance} USD</Title>
          {/* <PortfolioChart /> */}
          {/* <img src={'icon/portchart.png'} width='800px' ></img> */}
        </Space>

        {/* <Space style={{ width: '100%' }} direction="vertical">
          <Title level={2}>Swap Tokens</Title>
          <img src={'icon/sushi.png'} width='300px' ></img>
        </Space> */}
      </Space>
      <Col span={24}>
        {!isLoadingAccount && address && <MyRegenPositionsFull />}

      </Col>

<Space align='center' direction='vertical' className="Uniswap">
    <SwapWidget
       width={400}
       theme={myDarkTheme}
      provider={window.web3.currentProvider}
      jsonRpcEndpoint={jsonRpcEndpoint}
      tokenList={MY_TOKEN_LIST}
      convenienceFee={2}
      convenienceFeeRecipient={0x4d3192FeAeEF8c130Ad1280F4E79aE08150141f8}
    />
    <SimpleRamp address={address} />
  </Space>
      </Row>
  )
}

export default ReFi
