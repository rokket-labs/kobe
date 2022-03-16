import React from 'react'
import { useHistory } from 'react-router-dom'
import { TwitterOutlined } from '@ant-design/icons'
import { Col, Row, Typography } from 'antd'
import styled from 'styled-components'

import { StyledButton } from '../buttons/StyledButton'

const { Text } = Typography
const { utils } = require('ethers')

const BackgroundPledged = styled.div`
  height: fit-content;
  width: 100vw;
  margin: -48px -48px 2rem -3.125rem;
  background: url('/icon/pledgeBackground.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
`

const PledgeDisplay = ({ tonsPledged }) => {
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
        {tonsPledged ?
          <Col>
            <StyledButton
              href={`https://twitter.com/intent/tweet?text=🪴 I took the @koywe_eco Pledge to be in charge of ${tonsPledged?utils.formatUnits(tonsPledged,9):0} CO2e tons per year.%0A%0A🌳 We need 60 billion to reach %23NetZero! Let's fight the %23ClimateCrisis, together!%0A%0A📝 Join the %23ReFi revolution! Help grow the Koywe Forest here:: https://app.koywe.eco`}
              target="_blank"
              style={{ width: '100%' }}
            >
              <TwitterOutlined />Tweet your Pledge! <small>{tonsPledged?utils.formatUnits(tonsPledged,9):0} CO2 Tons/year</small>
            </StyledButton>
          </Col>
          :
          ''
        }
      </Row>
    </BackgroundPledged>
  )
}

export default PledgeDisplay
