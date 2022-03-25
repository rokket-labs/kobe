/* eslint-disable max-lines-per-function */
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { TwitterOutlined } from '@ant-design/icons'
import { Card, Col, InputNumber, Row, Typography } from 'antd'
import { useGasPrice } from 'eth-hooks'

import { EmissionsPerCapitaCountries } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'
import { Transactor } from '../helpers'

import { StyledButton } from './buttons/StyledButton'
import { StyledIcon } from './StyledIcon'
import TokenBalance from './TokenBalance'

const { ethers } = require('ethers')
const { Text } = Typography

const { utils } = require('ethers')

const PledgedReduceCO2 = ({ isPledged }) => {
  const router = useHistory()
  const { userSigner, targetNetwork, address } = useContext(NetworkContext)
  const { tonsPledged, writeContracts, CO2TokenBalance } = useContext(WalletContext)
  const [co2, setCo2] = useState('')
  const [pledging, setPledging] = useState()
  const [dripping, setDripping] = useState()
  const [countryCode, setCountryCode] = useState()
  const [country, setCountry] = useState()
  const gasPrice = useGasPrice(targetNetwork, 'fast')
  const tx = Transactor(userSigner, gasPrice)

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(response => {
        setCountry(response.country_name)
        setCountryCode(response.country_code_iso3)
      })
      .catch((data, status) => {
        console.log('Request failed:', data)
      })
  }, [])

  return (
    <>
      {co2 > 0 && (
        <Row justify="start" style={{ marginBottom: '2rem' }}>
          <Col>
            <Text style={{ fontSize: 28, lineHeight: '3rem' }}>
              <StyledIcon src={'icon/writing.svg'} preview={false} /> I pledge to reduce or offset {co2} CO2e tons per
              year. <StyledIcon src={'icon/writing2.svg'} preview={false} />
            </Text>
          </Col>
        </Row>
      )}

      {isPledged ? (
        Number(ethers.utils.formatUnits(CO2TokenBalance || 0, 18)) === 0 ? (
          <>
            <Row justify="start" style={{ marginBottom: '2rem' }}>
              <Col>
                <Text style={{ fontSize: 18, lineHeight: '3rem' }}>
                  You are now a part of something bigger: a forest.
                </Text>
              </Col>
            </Row>
            <Row justify="center" style={{ marginBottom: '2rem' }}>
              <Col>
                <StyledButton
                  $type="primary"
                  loading={dripping}
                  onClick={async () => {
                    setDripping(true)
                    await tx(writeContracts.CO2TokenContract.startDripping(address))
                    setDripping(false)
                  }}
                  style={{ padding: '0 5vw' }}
                >
                  Start dripping CO2 tokens
                </StyledButton>
              </Col>
            </Row>
          </>
        ) : (
          <div style={{ padding: 8, marginTop: 32, width: 500, margin: 'auto' }}>
            <Card title="🔥 Your CO2e Tons🔥">
              <div style={{ padding: 8 }}>
                <TokenBalance balance={CO2TokenBalance} fontSize={64} /> CO2e Tons emitted since pledging; the share of
                the problem you own
              </div>
            </Card>
          </div>
        )
      ) : (
        <>
          <Row gutter={[8, 10]} justify="space-between" align="middle">
            <Col md={10} xs={24}>
              <InputNumber onChange={value => setCo2(value)} style={{ width: '100%' }} />
              {countryCode && EmissionsPerCapitaCountries[countryCode] ? (
                <Text style={{ textAlign: 'center', width: '100%' }}>
                  <small>
                    TIP: The average person in {EmissionsPerCapitaCountries[countryCode].Country}{' '}
                    <a href="https://ourworldindata.org/grapher/co-emissions-per-capita" target="_blank">
                      emitted {EmissionsPerCapitaCountries[countryCode].AnnualEmissions} CO2e tons in 2020
                    </a>
                  </small>
                </Text>
              ) : (
                ''
              )}
            </Col>
            <Col md={4} xs={24} style={{ display: 'flex' }}>
              <Text style={{ textAlign: 'center', width: '100%' }}>or</Text>
            </Col>
            <Col md={10} xs={24}>
              <StyledButton block onClick={() => router.push('/emission')}>
                Calculate my emissions
              </StyledButton>
            </Col>
          </Row>
          <Row justify="center" style={{ marginTop: '2rem' }}>
            <Col md={16} xs={24}>
              <StyledButton
                $type="primary"
                disabled={co2 <= 0 || !userSigner}
                loading={pledging}
                onClick={async () => {
                  setPledging(true)
                  await tx(writeContracts.KoywePledge.newPledge(co2 * 10 ** 9))
                  setPledging(false)
                }}
                style={{ width: '100%' }}
              >
                Pledge {co2} CO2 Tons/year on-chain
              </StyledButton>
            </Col>
          </Row>
        </>
      )}
      <Row justify="center" style={{ marginTop: '2rem' }}>
        <Col md={16} xs={24}>
          <StyledButton
            disabled={co2 <= 0 && !isPledged}
            href={`https://twitter.com/intent/tweet?text=🪴 I took the @koywe_eco Pledge to be in charge of ${
              isPledged && tonsPledged ? utils.formatUnits(tonsPledged, 9) : co2
            } CO2e tons per year${
              EmissionsPerCapitaCountries[countryCode] && co2 > EmissionsPerCapitaCountries[countryCode].AnnualEmissions
                ? ', more than my country average!'
                : '.'
            }%0A%0A🌳 We need 60 billion to reach %23NetZero! Let's fight the %23ClimateCrisis, together!%0A%0A📝 Join the %23ReFi revolution! Help grow the Koywe Forest here:: https://app.koywe.eco`}
            target="_blank"
            style={{ width: '100%' }}
          >
            <TwitterOutlined />
            Tweet your Pledge!
            <br />
            <small>{isPledged && tonsPledged ? utils.formatUnits(tonsPledged, 9) : co2} CO2 Tons/year</small>
          </StyledButton>
        </Col>
      </Row>
    </>
  )
}

export default PledgedReduceCO2
