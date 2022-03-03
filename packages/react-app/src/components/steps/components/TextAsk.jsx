import { Col, Row, Typography } from 'antd'

const { Text } = Typography

/**
  type TextAskProps = {
    text: string
    advanced?: boolean
    endText?: string
  }
*/

export const TextAsk = ({
  text,
  advanced = false,
  endText = '',
}) => {
  return (
    <Row align="middle">
      <Col style={{ marginRight: advanced ? '8px' : '0' }}>
        <Text>{text}</Text>
      </Col>
      {advanced && (
        <Col>
          <Text>{endText}</Text>
        </Col>
      )}
    </Row>
  )
}
