import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Image, Row, Typography } from 'antd'
import { useContractReader } from 'eth-hooks'

import { StyledButton } from '../components/common/StyledButton'
import { CardInfo } from '../components/dashboard/CardInfo'
import MyRegenArt from '../components/dashboard/MyRegenArt'
import MyRegenPositions from '../components/dashboard/MyRegenPositions'
import { ProgressInfo } from '../components/dashboard/ProgressInfo'
import { HOOK_OPTIONS } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'
import { getFightData, getPlightData } from '../helpers/dashboardData'
// only for test purpose
import { getArtData } from '../helpers/getArtData'
import { useTreejerGraph } from '../hooks/useTreejerGraph'

const { Text } = Typography

const Dashboard = () => {
  const router = useHistory()
  const { address } = useContext(NetworkContext)
  const { USDPrices, walletBalance, tonsPledged, contracts } = useContext(WalletContext)
  const { polygonMCO2Balance, polygonBCTBalance, polygonNCTBalance } = walletBalance

  const CO2TokenBalance = useContractReader(contracts, 'CO2TokenContract', 'balanceOf', [address], HOOK_OPTIONS)
  const { /* collection: artGallery, */ isLoading } = useTreejerGraph()

  const testArtGallery = getArtData()

  const yourFight = (
    (polygonBCTBalance && polygonBCTBalance > 0 ? polygonBCTBalance : 0) / Math.pow(10, 18) +
    (polygonNCTBalance && polygonNCTBalance > 0 ? polygonNCTBalance : 0) / Math.pow(10, 18) +
    (polygonMCO2Balance && polygonMCO2Balance > 0 ? polygonMCO2Balance : 0) / Math.pow(10, 18)
  ).toFixed(2)
  const yourPlight = (CO2TokenBalance / Math.pow(10, 18) + tonsPledged * 70).toFixed(2)
  const isPledged = false

  const fightData = getFightData(polygonBCTBalance, polygonMCO2Balance, USDPrices)

  const plightData = getPlightData(address, polygonMCO2Balance, tonsPledged)

  return (
    <Row justify="center" className="my-sm">
      <Col xs={{ span: 24 }} md={{ span: 22 }}>
        <Row justify="space-between">
          <Col xs={{ span: 24 }} md={{ span: 11 }}>
            <CardInfo title="Your fight" items={fightData} />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 11 }}>
            <CardInfo title="Your plight" items={plightData} mode="reverse" />
          </Col>
        </Row>
        <Row justify="end" className="my-md">
          {isPledged ? (
            <Col>
              <StyledButton $type="primary">Mint living position NFT for 0.08 ETH</StyledButton>
            </Col>
          ) : (
            <Col>
              <StyledButton className="mr-sm" onClick={() => router.push('/emission')}>
                Calculate my emissions
              </StyledButton>
              <StyledButton $type="primary" onClick={() => router.push('/pledge')}>
                Take the pledge
              </StyledButton>
            </Col>
          )}
        </Row>
        <Row className="my-md">
          <Col span={24}>
            <ProgressInfo
              above={
                <>
                  <Text className="mr-sm">Your Goal</Text>
                  <Image src={'icon/emoji-trophy.svg'} preview={false} />
                </>
              }
              below={<Text>{`${yourFight} CO2 tons / year`}</Text>}
              title={'Your fight'}
              color="#3182CE"
            />
            <ProgressInfo
              title={'Your plight'}
              color="#E53E3E"
              above={
                <>
                  <Text className="mr-sm">Your Journey</Text>
                  <Image src={'icon/emoji-user.svg'} preview={false} />
                </>
              }
              below={<Text>{`${yourPlight} CO2 tons / year`}</Text>}
              percentage={50}
            />
          </Col>
        </Row>
        <MyRegenArt artGallery={testArtGallery} />
        <MyRegenPositions />
      </Col>
    </Row>
  )
}

export default Dashboard
