import React from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Row, Typography } from 'antd'
import styled from 'styled-components'

import { StyledButton } from '../buttons/StyledButton'

const { Text } = Typography

const BackgroundPledged = styled.div`
  height: fit-content;
  width: 100vw;
  margin: -48px -48px 2rem -3.125rem;
  background: url('/icon/pledgeBackground.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
`

const PledgeDisplay = () => {
  const router = useHistory()

  const handleMenu = url => {
    router.push(url)
  }

  return (
    <BackgroundPledged>
      <Row justify="center" style={{ marginBottom: '10rem' }}>
        <Col style={{ margin: '34px 2rem 0', height: '48px' }}>
          <Text style={{ fontSize: 24 }}>
            You have pledged to save the planet, you&apos;re now a part of the Koywe forest
          </Text>
        </Col>
      </Row>
      <Row justify="center" style={{ paddingBottom: '3rem' }}>
        <Col>
          <StyledButton
            $type="primary"
            onClick={() => handleMenu('/regen-defi')}
            style={{ padding: '0 5rem', fontSize: 20 }}
          >
            Grow the forest
          </StyledButton>
        </Col>
      </Row>
    </BackgroundPledged>
  )
}

export default PledgeDisplay
