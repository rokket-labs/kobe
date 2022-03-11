import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Space, Spin, Typography } from 'antd'
import { useContractReader, useGasPrice } from 'eth-hooks'
import { useExchangeEthPrice } from 'eth-hooks/dapps/dex'

import { BCTVendor } from '../components'
import MyRegenPositionsFull from '../components/RegenDefi/MyRegenPositionsFull'
import PortfolioChart from '../components/RegenDefi/PortfolioChart'
import SimpleRamp from '../components/RegenDefi/SimpleRamp'
import { HOOK_OPTIONS } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'
import { Transactor } from '../helpers'
import { getFightData, getPlightData } from '../helpers/dashboardData'

const { utils } = require('ethers')
const { Title } = Typography

const ReFi = () => {
  const { USDPrices, walletBalance, isPledged, isLoadingBalances } = useContext(WalletContext)
  const { polygonMCO2Balance, polygonBCTBalance, polygonNCTBalance, polygonKlimaBalance, polygonSKlimaBalance } = walletBalance
  const { address, isLoadingAccount } = useContext(NetworkContext)

  const [balance,setBalance] = useState(0)

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
      <Col>
        <SimpleRamp address={address} />
      </Col>
    </Row>
  )
}

export default ReFi
