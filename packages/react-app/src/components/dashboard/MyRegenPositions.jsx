import React from 'react'
import { Col, Row, Typography } from 'antd'

import { StyledButton } from '../common/StyledButton'

import { TableInfo } from './TableInfo'

const { Title } = Typography
const MyRegenPositions = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Your regen positions</Title>
          <TableInfo />
        </Col>
      </Row>
      <Row justify="center" className="my-md">
        <StyledButton $type="primary">See all my tokens</StyledButton>
      </Row>
    </>
  )
}

export default MyRegenPositions
