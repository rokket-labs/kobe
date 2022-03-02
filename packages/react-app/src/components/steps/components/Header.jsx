import { Col, Row, Typography } from 'antd'

const { Text } = Typography

import { StyledTitle } from './StyledTitle'

/**
  type HeaderProps = {
    title: string
    subtitle: string
  }
*/

export const Header = ({ title, subtitle }) => {
  return (
    <>
      <Row>
        <Col>
          <StyledTitle level={2}>{title}</StyledTitle>
        </Col>
      </Row>
      <Row style={{ margin: '24px 0' }}>
        <Col>
          <Text>{subtitle}</Text>
        </Col>
      </Row>
    </>
  )
}
