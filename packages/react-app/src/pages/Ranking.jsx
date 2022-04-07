import React, { useContext, useEffect, useState } from 'react'
import { Col, Image, Row, Typography } from 'antd'
import { useContractLoader } from 'eth-hooks'
import { useEventListener } from 'eth-hooks/events/useEventListener'
import styled from 'styled-components'

import Address from '../components/common/Address'
import MockRanking from '../components/MockRanking'
import { TableRanking } from '../components/TableRanking'
import { NETWORKS } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import externalContracts from '../contracts/external_contracts'
import deployedContracts from '../contracts/hardhat_contracts.json'

import mock from './ranking-data.json'

const { ethers } = require('ethers')

const { Title, Text } = Typography

const StyledRow = styled(Row)`
  width: 100%;
  margin: 30px 0 30px 0;
`

const StyledText = styled(Text)`
  font-weight: ${prop => (prop.$isBold ? '600' : '400')};
  font-size: ${prop => (prop.$isTitle ? '32px' : '28px')};
  align-self: center;
  ${prop => (prop.ml ? `margin-left: ${prop.ml}` : '')};
`

const USDPricesContext = () => {
  const [USDPrices, setUSDPrices] = useState(null) // prices of main tokens of the app

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

  return USDPrices
}

const RankingTitle = ({ position, address, mainnetProvider, polyProvider }) => {
  return (
    <Col span={24}>
      <Row justify="center">
        <Col xs={{ span: 24 }} sm={{ span: 16 }} md={{ span: 5 }}>
          <Col>
            <Row justify="space-around">
              <Col span={8} style={{ textAlign: 'center' }}>
                {/*                 <Image src={'/icon/user.svg'} preview={false} width={50} /> */}
              </Col>
              <Col span={16}>
                <StyledText $isBold={false} $isTitle={false}>
                  User <Address value={address} ensProvider={mainnetProvider} fontSize={16} />
                </StyledText>
              </Col>
            </Row>
          </Col>
          {/* <Col>
            <Row justify="space-around">
              <Col style={{ alignSelf: 'center' }}>
                <Image src={'/icon/vector.svg'} preview={false} width={30} />
              </Col>
              <Col>
                <StyledText $isBold $isTitle>
                  Your Position
                </StyledText>
                <StyledText $isBold $isTitle ml="20px">
                  {position === 0 ? '-' : position}
                </StyledText>
              </Col>
            </Row>
          </Col> */}
        </Col>
      </Row>
    </Col>
  )
}

const Ranking = () => {
  const [data, setData] = useState([])
  const [position, setPosition] = useState(0)
  const [isMockData, setIsMockData] = useState(false)

  const HOOK_OPTIONS = {
    blockNumberInterval: 500,
    query: { refetchOnWindowFocus: false },
  }

  const contractConfig = { deployedContracts: deployedContracts || {}, externalContracts: externalContracts || {} }

  const USDPrices = USDPricesContext()

  const { mainnetProvider, localProvider, address } = useContext(NetworkContext)

  const polyNetwork = NETWORKS.polygon
  // const polyNetwork = NETWORKS.goerli

  const polyProviderUrl = polyNetwork.rpcUrl
  const polyProvider = new ethers.providers.StaticJsonRpcProvider(polyProviderUrl)

  // const polyContracts = useContractLoader(polyProvider, contractConfig)
  const readContracts = useContractLoader(localProvider, contractConfig)

  const pledgeEvents = useEventListener(readContracts, 'KoywePledge', 'NewPledge', localProvider, 1, HOOK_OPTIONS)

  useEffect(() => {
    const newData = [...pledgeEvents]

    setIsMockData(newData.length === 0)
    newData.forEach((item, index) => {
      if (!item.ranking) item.key = index

      if (item.args[0] === address) setPosition(index + 1)
    })

    newData.sort((a, b) => {
      if (a.args[1]._hex.toString() * 1 < b.args[1]._hex.toString() * 1) return 1

      if (a.args[1]._hex.toString() * 1 > b.args[1]._hex.toString() * 1) return -1

      return 0
    })

    setData(newData.map((item, index) => ({ ...item, ranking: index + 1 })))
  }, [address, pledgeEvents])
  console.log(isMockData)

  return (
    <div>
      <Title level={2}>Rankings</Title>
      <RankingTitle
        position={position}
        polyProvider={polyProvider}
        mainnetProvider={mainnetProvider}
        address={address}
      />
      <Row justify="center">
        <Col xs={{ span: 24 }} sm={{ span: 16 }} md={{ span: 5 }}>
          <Title level={4}>Coming Soon</Title>
          <Text>A bird&apos;s eye view of how we&apos;re doing, collectively.</Text>
        </Col>
      </Row>
      {/* Remove and delete mock component when changing the polygon rcpUrl and make ranking work */}
      {/* <StyledRow justify="center">
        {data &&
          (isMockData ? (
            <MockRanking
              rankingData={mock.data}
              USDPrices={USDPrices}
              mainnetProvider={mainnetProvider}
              readContracts={readContracts}
              polyProvider={polyProvider}
              contractConfig={contractConfig}
              // polyContracts={polyContracts}
              address={address}
              HOOK_OPTIONS={HOOK_OPTIONS}
            />
          ) : (
            <TableRanking
              rankingData={data}
              USDPrices={USDPrices}
              mainnetProvider={mainnetProvider}
              readContracts={readContracts}
              polyProvider={polyProvider}
              contractConfig={contractConfig}
              // polyContracts={polyContracts}
              address={address}
              HOOK_OPTIONS={HOOK_OPTIONS}
            />
          ))}
      </StyledRow> */}
    </div>
  )
}

export default Ranking
