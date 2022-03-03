/* eslint-disable max-lines-per-function */
import React, { useState } from 'react'
import { Button, Card, Col, Image, Row, Select, Space, Typography } from 'antd'
import styled from 'styled-components'

import { StyledButton } from '../common/StyledButton'

const { Text, Title, Paragraph } = Typography
const { Option } = Select
const { utils } = require('ethers')

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: '100%';
  align-items: flex-end;
  height: 65px;
  gap: 10px;
  margin-bottom: 0;
`

const NftCard = ({ title, mintPrice, isBCTAmountApproved, buying, handleApproveBCT, approving, handleMint }) => {
  return (
    <Card className="card-regen-art">
      <Row gutter={[24, 8]} wrap>
        {/* Left side */}
        <Col
          span={24}
          md={9}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Space direction="vertical" align="center" style={{ display: 'flex', justifyContent: 'center' }}>
            <Image width={'16.688rem'} height={'16.688rem'} preview={false} src={'/icon/LandscapeDesigner.svg'} />
            <Title level={5}>{title}</Title>
          </Space>
        </Col>
        {/* right side */}
        <Col span={24} md={15}>
          <Row>
            <Col
              style={{
                minHeight: '16.688rem',
              }}
            >
              <Space direction="vertical" size={'large'}>
                <Space size={'large'} wrap>
                  <Text>Price: {mintPrice && utils.formatUnits(mintPrice, 18)} BCT</Text>
                  <Text style={{ marginLeft: 10 }}>-20 CO2 tons / tree</Text>
                </Space>
                <Space direction="vertical">
                  <Paragraph>
                    NOW MINTING, KOYWE TREES!
                    <br />
                    <br />
                    To celebrate our incoming full launch (BETA), we&apos;re issuing 255 digital trees! Payable with
                    CARBON TOKENS (BCT)!
                    <br />
                    <small>
                      If you don&apos;t have BCT yet, check our ReFi tab, or go to Sushiswap Polygon, or wait for us to
                      have a credit card ramp!
                    </small>
                    <br />
                    <br />
                    These trees will live on the Polygon blockchain forever as algorithmically-generated unique SVGs.
                    All proceeds will either go to plant trees or to retire the BCT used to pay for them.
                    <br />
                    Upon minting, you will receive a tree similar to the first ever Koywe logo and 1 of 5 possible
                    outcomes for the BCT. Watch out for the ultra rare Chile Centro Sur planting of trees.
                    <br />
                    <small>
                      Planting of trees will be done through{' '}
                      <a href="https://www.reforestemos.org/" target="_blank">
                        Reforestemos
                      </a>{' '}
                      and BCT retiring using{' '}
                      <a href="https://toucan.earth/" target="_blank">
                        Toucan Protocol tools
                      </a>
                      .
                    </small>
                  </Paragraph>
                </Space>
              </Space>
            </Col>
          </Row>
          <ButtonsContainer>
            <Col flex={1}>
              <Text>Amount</Text>
              <Select disabled style={{ width: '100%' }} defaultValue="1">
                <Option value="1">1</Option>
              </Select>
            </Col>

            <StyledButton loading={approving} $type="primary" disabled={isBCTAmountApproved} onClick={handleApproveBCT}>
              Approve BCT
            </StyledButton>
            <StyledButton $type="primary" disabled={!isBCTAmountApproved} loading={buying} onClick={handleMint}>
              MINT
            </StyledButton>
          </ButtonsContainer>
        </Col>
      </Row>
    </Card>
  )
}

export default NftCard
