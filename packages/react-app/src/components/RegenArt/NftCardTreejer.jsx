/* eslint-disable max-lines-per-function */
import React, { useState } from 'react'
import { Button, Card, Col, Image, Row, Select, Space, Typography } from 'antd'
import styled from 'styled-components'

import ConnectButton from '../common/ConnectButton'
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

const NftCardTreejer = ({ title, mintPrice, address, buying, handleMint, approving, isTokenAmountApproved, handleApproveToken }) => {
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
            <Image width={'16.688rem'} height={'16.688rem'} preview={false} src={'/icon/treejer.png'} />
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
                  <Text>Price: {mintPrice && utils.formatUnits(mintPrice, 18)} DAI</Text>
                  {/* <Text style={{ marginLeft: 10 }}>-20 CO2 tons / tree</Text> */}
                </Space>
                <Space direction="vertical">
                  <Paragraph>
                    Treejer Regular Trees
                    <br />
                    <br />
                    Treejer functions as a link between those who fund trees and those who plant them even in the most remote places on our planet.
                    <br />
                    It records credit ownership and enables secure payment between different parties using smart-contracts.
                    <br />
                    <br />
                    Each single tree that is collected or funded through Treejer has unique social and environmental impact. Rural planters in high-impact locations plant and maintain these trees.
                    <br />
                    Most of them are located in less developed countries in Latin America, Africa and Middle East.
                    <br />
                    Plant Trees, today.
                    <br />
                    <br />
                    Treejer also has a Genesis Trees collection, which will help fund the project.
                    <br />
                    <br />
                    <small>
                      Find out more at{' '}
                      <a href="https://treejer.com/" target="_blank">
                        Treejer Protocol
                      </a>.
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
            {!address ? <ConnectButton /> :
            <>
              <StyledButton loading={approving} $type="primary" disabled={isTokenAmountApproved} onClick={handleApproveToken}>
                Approve DAI
              </StyledButton>
              <StyledButton $type="primary" disabled={!isTokenAmountApproved} loading={buying} onClick={handleMint}>
                MINT
              </StyledButton>
            </>
            }
          </ButtonsContainer>
        </Col>
      </Row>
    </Card>
  )
}

export default NftCardTreejer
