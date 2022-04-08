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

const NftCard = ({ title, mintPrice, address, buyingEnt, handleMintEnt }) => {
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
            <Image width={'16.688rem'} height={'16.688rem'} preview={false} src={'/icon/ent.gif'} />
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
                  <Text>Price: {mintPrice && utils.formatUnits(mintPrice, 18)} MATIC</Text>
                  {/* <Text style={{ marginLeft: 10 }}>-20 CO2 tons / tree</Text> */}
                </Space>
                <Space direction="vertical">
                  <Paragraph>
                    KEULE Trees
                    <br />
                    <br />
                    This is very special project to protect endangered Keule trees in the south of Chile. There will only be 25 NFTs, each of which represents a unique individual, ensuring its protection for a long time.
                    <br />
                    Become a Keule Guardian, today.
                    <br />
                    <br />
                    This Video Art Token is the main Crypto Asset within ENTS ecosystem. It represents a specific Endangered species specimen.
                    <br />
                    If you own this token, you become the godparent of that single living being, fostering its protection
                    through certified local NGOs and access to the best earning mechanism of our ecosystem.
                    <br />
                    <br />
                    <small>
                      Find out more at{' '}
                      <a href="https://elders.tokents.org/" target="_blank">
                        Endangered Tokens
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
              <StyledButton $type="primary" loading={buyingEnt} onClick={handleMintEnt}>
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

export default NftCard
