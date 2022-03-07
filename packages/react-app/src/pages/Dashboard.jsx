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
  const { address, isLoadingAccount, localChainId } = useContext(NetworkContext)
  const { USDPrices, walletBalance, tonsPledged, contracts, isPledged, yourKTBalance } = useContext(WalletContext)
  const { polygonMCO2Balance, polygonBCTBalance, polygonNCTBalance, polygonKLIMABalance, polygonSklimaBalance } =
    walletBalance
  const [fightData, setFightData] = useState([])
  const [plightData, setPlightData] = useState([])
  const [yourPlight, setYourPlight] = useState()
  const [yourFight, setYourFight] = useState()

  const CO2TokenBalance = useContractReader(contracts, 'CO2TokenContract', 'balanceOf', [address], HOOK_OPTIONS)
  const { collection: artGallery, isLoading } = useTreejerGraph(address)

  useEffect(() => {
    const fightData = getFightData(polygonBCTBalance, polygonMCO2Balance, yourKTBalance, totalBalance)

    setFightData(fightData)
    setYourPlight(
      isPledged
        ? (
            Number(utils.formatUnits(polygonBCTBalance, 18)) +
            Number(utils.formatUnits(polygonNCTBalance, 18)) +
            Number(utils.formatUnits(polygonMCO2Balance, 18))
          ).toFixed(2)
        : 0,
    )

    const plightData = getPlightData(address, polygonMCO2Balance, tonsPledged, isPledged)

    setPlightData(plightData)

    if (CO2TokenBalance)
      setYourFight(tonsPledged > 0 ? (CO2TokenBalance / Math.pow(10, 18) + tonsPledged * 70).toFixed(2) : 0)
  }, [address, walletBalance])

  const [totalBalance, setTotalBalance] = useState(0)

  // read prices from coingecko
  useEffect(() => {
    // we will use async/await to fetch this data
    function getTotalBalance() {
      let sum = 0

      sum +=
        ((polygonBCTBalance && polygonBCTBalance > 0 ? polygonBCTBalance : 0) / Math.pow(10, 18)) *
        (USDPrices &&
          USDPrices['toucan-protocol-base-carbon-tonne'] &&
          USDPrices['toucan-protocol-base-carbon-tonne'].usd)
      sum +=
        ((polygonMCO2Balance && polygonMCO2Balance > 0 ? polygonMCO2Balance : 0) / Math.pow(10, 18)) *
        (USDPrices && USDPrices['moss-carbon-credit'] && USDPrices['moss-carbon-credit'].usd)
      sum +=
        ((polygonKLIMABalance && polygonKLIMABalance > 0 ? polygonKLIMABalance : 0) / Math.pow(10, 9)) *
        (USDPrices && USDPrices['staked-klima'] && USDPrices['staked-klima'].usd)
      sum +=
        ((polygonSklimaBalance && polygonSklimaBalance > 0 ? polygonSklimaBalance : 0) / Math.pow(10, 9)) *
        (USDPrices && USDPrices['klima-dao'] && USDPrices['klima-dao'].usd)
      // sum+=(myPolyMCO2Balance && myPolyMCO2Balance > 0 ? myPolyMCO2Balance : 0)/(Math.pow(10,18))*(prices && prices["moss-carbon-credit"] && prices["moss-carbon-credit"].usd);
      setTotalBalance(sum.toFixed(2))
    }

    getTotalBalance()
  }, [polygonBCTBalance, polygonMCO2Balance])

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
        {!isLoadingAccount && address && (
          <MyRegenArt artGallery={artGallery} isLoading={isLoading} title="Your regen art" />
        )}
        {!isLoadingAccount && address && <MyRegenPositions />}
      </Col>
    </Row>
  )
}

export default Dashboard
