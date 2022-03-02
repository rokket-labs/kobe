import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Col, InputNumber, Row, Typography } from 'antd'

import { IsPledgedContext } from '../contexts/IsPledgedContext'

import { StyledButton } from './buttons/StyledButton'
import { StyledIcon } from './StyledIcon'

const { Text } = Typography

const PledgedReduceCO2 = ({ isPledge, handleIsPledge }) => {
  const router = useHistory()
  const { co2, handleCo2 } = useContext(IsPledgedContext)

  const handleInputCO2 = value => {
    handleCo2(Number(value))
  }

  const handleMenu = url => {
    router.push(url)
  }

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

      {isPledge ? (
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
                disabled={co2 <= 0}
                onClick={() => handleMenu('/regen-defi')}
                style={{ padding: '0 5vw' }}
              >
                Start dripping CO2 tokens
              </StyledButton>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row gutter={[8, 10]} justify="space-between" align="middle">
            <Col md={10} xs={24}>
              <InputNumber onChange={handleInputCO2} style={{ width: '100%' }} />
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
                onClick={() => handleIsPledge(true)}
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
