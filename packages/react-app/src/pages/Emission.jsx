import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Image, Row, Space, Typography } from 'antd'

import { CardCustom } from '../components/CardCustom'

const { Title } = Typography

import { useHistory } from 'react-router-dom'

import CardEmission from '../components/CardEmission'
import { StyledButton } from '../components/common/StyledButton'
import { IsPledgedContext } from '../contexts/IsPledgedContext'

import irlMock from './irl-data.json'
import walletMock from './wallet-data.json'

/**
  type InfoData = {
    id: number
    quantity: number
    type: 'coin' | 'air' | 'co2'
  }

  type CalculatorData = {
    data: { info: InfoData[] }
  }
*/

const Wallet = () => {
  const router = useHistory()
  const { hasCalculator } = useContext(IsPledgedContext)

  const handleMenu = url => {
    router.push(url)
  }

  const [dataWallet, setDataWallet] = useState()
  const [dataIrl, setDataIrl] = useState()
  const showIrl = hasCalculator

  useEffect(() => {
    setDataWallet(walletMock)
    setDataIrl(irlMock)
  }, [])

  return (
    <Row className="my-sm">
      <Col offset={1}>
        <Space direction="vertical">
          <Title>Calculate emissions</Title>
        </Space>
      </Col>
      <Row
        justify="center"
        style={{ width: '100%', minHeight: '100vh', marginBottom: '2rem' }}>
        <Col xs={24} md={22}>
          <Row justify="space-between">
            <Col xs={24} md={11}>
              {dataWallet && (
                <CardCustom
                  title="Wallet Sessions"
                  cardType="wallet"
                  items={dataWallet.data.info}
                />
              )}
            </Col>
            {!showIrl && <Col md={9}></Col>}
            {!showIrl && (
              <Col
                xs={{ span: 24 }}
                md={{ span: 11 }}
                style={{ marginTop: '20px' }}>
                <Card title="IRL emissions" className="card-info">
                  <Row justify="center">
                    <Col xs={{ span: 22 }} style={{ marginBottom: '30px' }}>
                      <Row justify="space-around">
                        <Image src={'/icon/emoji-house.svg'} preview={false} />
                        <Image
                          src={'/icon/emoji-airplane.svg'}
                          preview={false}
                        />
                        <Image
                          src={'/icon/emoji-hamburguer.svg'}
                          preview={false}
                        />
                        <Image src={'/icon/emoji-work.svg'} preview={false} />
                        <Image src={'/icon/world.svg'} preview={false} />
                      </Row>
                    </Col>
                    <StyledButton
                      $type="primary"
                      onClick={() => handleMenu('/calculator')}
                      block>
                      Start calculator
                    </StyledButton>
                  </Row>
                </Card>
              </Col>
            )}
            <Col xs={{ span: 24 }} md={{ span: 11 }}>
              {showIrl && dataIrl && (
                <CardCustom
                  title="IRL emissions"
                  cardType="irl"
                  items={dataIrl.data.info}
                />
              )}
            </Col>
          </Row>
          {showIrl && (
            <Row justify="space-between" className="my-md">
              <Col span={24}>
                <Title>Commit your actions and take the pledge</Title>
              </Col>
              <Col xl={8} md={12} xs={24}>
                <CardEmission
                  title={'11'}
                  context={'I want to take charge of my emissions'}
                  background={'/icon/tree-credit-card.svg'}
                  color1={'#50B60F'}
                  color2={'#97CF55'}
                  color3={'#CEE28B'}
                  onClick={handleMenu}
                />
              </Col>
              <Col xl={8} md={12} xs={24}>
                <CardEmission
                  title={'22'}
                  context={
                    'Not everybody is taking care of their emissions and we need to act fast. Offset for 2 individuals like you'
                  }
                  background={'/icon/tree-woman-cat.svg'}
                  color1={'#60352A'}
                  color2={'#9B6A49'}
                  color3={'#CC9B7A'}
                  onClick={handleMenu}
                />
              </Col>
              <Col xl={8} md={12} xs={24}>
                <CardEmission
                  title={'Pledge for as many tons/year as you can take care of'}
                  background={'/icon/tree-business-woman-man.svg'}
                  color1={'#2A6797'}
                  color2={'#74A6D6'}
                  color3={'#C7DDEF'}
                  onClick={handleMenu}
                  isWritable
                />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Row>
  )
}

export default Wallet
