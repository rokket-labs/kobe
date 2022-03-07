import React, { useContext, useState } from 'react'
import { Card, Col, InputNumber, Row, Typography } from 'antd'
import { useContractReader, useGasPrice } from 'eth-hooks'

import { HOOK_OPTIONS } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'
import { Transactor } from '../helpers'

import { StyledButton } from './buttons/StyledButton'
import { StyledIcon } from './StyledIcon'
import TokenBalance from './TokenBalance'

const { Text } = Typography

const PledgedReduceCO2 = ({ isPledged }) => {
  const { userSigner, targetNetwork, address } = useContext(NetworkContext)
  const { writeContracts } = useContext(WalletContext)
  const [co2, setCo2] = useState('')
  const [pledging, setPledging] = useState()
  const [dripping, setDripping] = useState()
  const gasPrice = useGasPrice(targetNetwork, 'fast')
  const tx = Transactor(userSigner, gasPrice)

  const CO2TokenBalance = useContractReader(writeContracts, 'CO2TokenContract', 'balanceOf', [address], HOOK_OPTIONS)

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
        CO2TokenBalance === 0 ? (
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
            </Col>
            <Col md={4} xs={24} style={{ display: 'flex' }}>
              <Text style={{ textAlign: 'center', width: '100%' }}>or</Text>
            </Col>
            <Col md={10} xs={24}>
              <StyledButton block>Calculate my emissions</StyledButton>
            </Col>
          </Row>
          <Row justify="center" style={{ marginTop: '2rem' }}>
            <Col md={16} xs={24}>
              <StyledButton
                $type="primary"
                disabled={co2 <= 0}
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
    </>
  )
}

export default PledgedReduceCO2
