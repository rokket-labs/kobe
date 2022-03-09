import React, { useContext, useEffect, useState } from 'react'
import { Col, Image, List, Row, Typography } from 'antd'
import { useContractLoader, useContractReader } from 'eth-hooks'
import { useEventListener } from 'eth-hooks/events/useEventListener'
import styled from 'styled-components'

import { TokenBalance } from '../components'
import Address from '../components/common/Address'
import { TableRanking } from '../components/TableRanking'
import { HOOK_OPTIONS, NETWORKS } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'

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

const RankingTitle = () => {
  const { mainnetProvider, address } = useContext(NetworkContext)

  return (
    <Col span={24}>
      <Row justify="center">
        <Col xs={{ span: 24 }} sm={{ span: 16 }} md={{ span: 5 }}>
          <Col>
            <Row justify="space-around">
              <Col span={8} style={{ textAlign: 'center' }}>
                <Image src={'/icon/user.svg'} preview={false} width={50} />
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
                  No. 8
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
  const { contractConfig, contracts } = useContext(WalletContext)
  const { mainnetProvider, localProvider } = useContext(NetworkContext)

  const polyNetwork = NETWORKS.polygon
  // const polyNetwork = NETWORKS.goerli

  const polyProviderUrl = polyNetwork.rpcUrl
  const polyProvider = new ethers.providers.StaticJsonRpcProvider(polyProviderUrl)

  const polyContracts = useContractLoader(polyProvider, contractConfig)
  const readContracts = useContractLoader(localProvider, contractConfig)

  const pledgeEvents = useEventListener(readContracts, 'KoywePledge', 'NewPledge', localProvider, 1, HOOK_OPTIONS)

  const [data, setData] = useState()

  useEffect(() => {
    setData(pledgeEvents)
  }, [pledgeEvents])

  return (
    <Row>
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
      <RankingTitle />
      <StyledRow justify="center">{data && <TableRanking rankingData={data} />}</StyledRow>
    </Row>
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
