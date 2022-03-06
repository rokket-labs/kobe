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
import { useTreejerGraph } from '../hooks/useTreejerGraph'

const { utils } = require('ethers')
const { Text } = Typography

const Dashboard = () => {
  const router = useHistory()
  const { address, isLoadingAccount } = useContext(NetworkContext)
  const { USDPrices, walletBalance, tonsPledged, contracts, isPledged, yourKTBalance, CO2TokenBalance } = useContext(WalletContext)
  const { polygonMCO2Balance, polygonBCTBalance, polygonNCTBalance } = walletBalance
  const [fightData, setFightData] = useState([])
  const [plightData, setPlightData] = useState([])
  const [yourPlight, setYourPlight] = useState()
  const [yourFight, setYourFight] = useState()

  const { collection: artGallery, isLoading } = useTreejerGraph(address)

  // TODO: Estos useEffect NO están cargando bien los datos. Sólo cargan 1 vez, antes de tener todo el contexto, y se quedan como no pledgeados
  useEffect(() => {
    console.log({ yourKTBalance, isPledged })

    const fightData = getFightData(polygonBCTBalance, polygonMCO2Balance, polygonNCTBalance, yourKTBalance, USDPrices, isPledged)

    console.log({ walletBalance })
    setFightData(fightData)
    setYourFight(
      isPledged
        ? (
            Number(utils.formatUnits(polygonBCTBalance, 18)) +
            Number(utils.formatUnits(polygonNCTBalance, 18)) +
            Number(utils.formatUnits(polygonMCO2Balance, 18))
          ).toFixed(2)
        : 0,
    )
  }, [address])

  useEffect(() => {
    const plightData = getPlightData(address, CO2TokenBalance, tonsPledged, isPledged)

    setPlightData(plightData)

    if (CO2TokenBalance)
      setYourPlight(
        isPledged
          ? (
              Number(utils.formatUnits(CO2TokenBalance, 18)) + Number(utils.formatUnits(tonsPledged, 9)*70)
            ).toFixed(2)
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
              below={<Text>{`${yourFight || 0} CO2 tons`}</Text>}
              title={'Your fight'}
              color="#3182CE"
              // percentage={}
              percentage={isPledged && yourFight > yourPlight ? 100 : Math.max((yourFight/yourPlight).toFixed(2)*100,10)}
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
              below={<Text>Pledged {`${yourPlight || 0} CO2 tons over Lifetime`}</Text>}
              percentage={isPledged && yourFight < yourPlight ? 100 : Math.max((yourPlight/yourFight).toFixed(2)*100,10)}
            />
          </Col>
        </Row>
        {!isLoadingAccount && address && (
          <MyRegenArt artGallery={artGallery} isLoading={isLoading} title="Your regen art" />
        )}
        {!isLoadingAccount && address && <MyRegenPositions />}
      </Col>
    </Row>
  )
}

export default Dashboard
