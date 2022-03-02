import { ReactElement } from 'react'
import { Col, Row } from 'antd'

import { StyledLabel } from '../components/StyledLabel'

/**
  type SelectLayoutProps = {
    children: ReactElement
    label: string
  }
*/

export const SelectLayout = ({
  children,
  label,
}) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <StyledLabel>{label}</StyledLabel>
        </Col>
      </Row>
      <Row>
        <Col span={22}>{children}</Col>
      </Row>
    </>
  )
}
