import React, { useContext, useEffect, useState } from 'react'
import { Col, Image, Row, Typography } from 'antd'
import { useContractLoader } from 'eth-hooks'
import { useEventListener } from 'eth-hooks/events/useEventListener'
import styled from 'styled-components'

import Address from '../components/common/Address'
import { TableRanking } from '../components/TableRanking'
import { NETWORKS } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'
import externalContracts from '../contracts/external_contracts'
import deployedContracts from '../contracts/hardhat_contracts.json'

// import rankingData from './ranking-data-chain.json'

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
  const { contractConfig, USDPrices } = useContext(WalletContext)

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
          <Col>
            <Row justify="space-around">
              <Col style={{ alignSelf: 'center' }}>
                <Image src={'/icon/vector.svg'} preview={false} width={30} />
              </Col>
              <Col>
                <StyledText $isBold $isTitle>
                  Your Position
                </StyledText>
                <StyledText $isBold $isTitle ml="20px">
                  {position}
                </StyledText>
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
    </Col>
  )
}

const Ranking = () => {
  const [data, setData] = useState([])
  const [position, setPosition] = useState(1)
  const [walletUser, setWalletUser] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const LENGHT_RANKING = 13

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

    newData.forEach((item, index) => {
      if (!item.ranking) item.key = index

      if (item.args[0] === address) {
        setWalletUser(item)
        setPosition(index + 1)
      }
    })

    if (LENGHT_RANKING > newData.length) {
      const newDataRanking = newData.slice(0, LENGHT_RANKING)

      setData(newData)
      // newDataRanking.push(walletUser)
      // console.log('newRankingData', newDataRanking)
      // setData(newDataRanking)
    }
  }, [address, pledgeEvents])

  return (
    <div>
      {/*       <div style={{ width: 500, margin: 'auto', marginTop: 64 }}>
        <div>Ranking:</div>

        <List
          dataSource={data}
          renderItem={item => {
            return (
              <List.Item key={item.blockNumber}>
                <Address value={item.args[0]} ensProvider={mainnetProvider} fontSize={16} />
                | <TokenBalance contracts={readContracts} name={'CO2TokenContract'} address={item.args[0]} /> CO2 tons
                emmitted | &nbsp;{(item.args[1].toString() * 1) / 10 ** 9} CO2e tons/year committed |{' '}
                <TokenBalance contracts={polyContracts} name={'PBCT'} address={item.args[0]} /> BCT |{' '}
                <TokenBalance contracts={polyContracts} name={'PMCO2'} address={item.args[0]} /> MCO2
              </List.Item>
            )
          }}
        />
      </div> */}
      <Title level={2}>Rankings</Title>
      <RankingTitle
        position={position}
        polyProvider={polyProvider}
        mainnetProvider={mainnetProvider}
        address={address}
      />
      <StyledRow justify="center">
        {data && (
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
        )}
      </StyledRow>
    </div>
  )
}

/* const Ranking = () => {
  const { mainnetProvider } = useContext(NetworkContext)
  const { contracts, polygonContracts, localProvider } = useContext(WalletContext)

  const pledgeEvents = useEventListener(contracts, 'KoywePledge', 'NewPledge', localProvider, 1, HOOK_OPTIONS)

  return (
    <div style={{ width: 500, margin: 'auto', marginTop: 64 }}>
      <div>Ranking test:</div>
      <List
        dataSource={pledgeEvents}
        renderItem={item => {
          return (
            <List.Item key={item.blockNumber}>
              <Address value={item.args[0]} ensProvider={mainnetProvider} fontSize={16} />
              | <TokenBalance contracts={contracts} name={'CO2TokenContract'} address={item.args[0]} /> CO2 tons
              emmitted | &nbsp;{(item.args[1].toString() * 1) / 10 ** 9} CO2e tons/year committed |{' '}
              <TokenBalance contracts={polygonContracts} name={'PBCT'} address={item.args[0]} /> BCT |{' '}
              <TokenBalance contracts={polygonContracts} name={'PMCO2'} address={item.args[0]} /> MCO2
            </List.Item>
          )
        }}
      />
    </div>
  )
}
 */
export default Ranking
