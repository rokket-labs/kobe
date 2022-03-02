/* eslint-disable max-lines-per-function */
import React, { useContext, useEffect, useState } from 'react'
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

const { utils } = require('ethers')
const { Text } = Typography

const Dashboard = () => {
  const router = useHistory()
  const { address, isLoadingAccount } = useContext(NetworkContext)
  const { USDPrices, walletBalance, tonsPledged, contracts, pledged, yourKTBalance } = useContext(WalletContext)
  const { polygonMCO2Balance, polygonBCTBalance, polygonNCTBalance } = walletBalance
  const [fightData, setFightData] = useState([])
  const [plightData, setPlightData] = useState([])
  const [yourPlight, setYourPlight] = useState()
  const [yourFight, setYourFight] = useState()

  const CO2TokenBalance = useContractReader(contracts, 'CO2TokenContract', 'balanceOf', [address], HOOK_OPTIONS)
  const { collection: artGallery, isLoading } = useTreejerGraph(address)

  /* const data = getArtData() */

  useEffect(() => {
    const fightData = getFightData(polygonBCTBalance, polygonMCO2Balance, yourKTBalance, USDPrices, pledged)

    setFightData(fightData)
    setYourFight(
      pledged
        ? (
            Number(utils.formatUnits(polygonBCTBalance, 18)) +
            Number(utils.formatUnits(polygonNCTBalance, 18)) +
            Number(utils.formatUnits(polygonMCO2Balance, 18))
          ).toFixed(2)
        : 0,
    )
  }, [address])

  useEffect(() => {
    const plightData = getPlightData(address, polygonMCO2Balance, tonsPledged, pledged)

    setPlightData(plightData)
    setYourPlight(
      pledged
        ? ((Number(utils.formatUnits(CO2TokenBalance, 18)) + Number(utils.formatUnits(tonsPledged, 18))) * 70).toFixed(
            2,
          )
        : 0,
    )
  }, [address])

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
          {pledged ? (
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
              below={<Text>{`${yourFight || 0} CO2 tons / year`}</Text>}
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
              below={<Text>{`${yourPlight || 0} CO2 tons / year`}</Text>}
              percentage={50}
            />
          </Col>
        </Row>
        {!isLoadingAccount && address && <MyRegenArt artGallery={artGallery} isLoading={isLoading} />}
        {!isLoadingAccount && address && <MyRegenPositions />}
      </Col>
    </Row>
  )
}

export default Dashboard
