import { Card, Col, Image, Row, Typography } from 'antd'

const { Text } = Typography

const CardInfoItem = ({ srcIcon, quantity, text, isBold, mode = 'normal' }) => {
  const hasNormalMode = () => {
    return mode === 'normal'
  }

  return (
    <Row align="middle">
      <Col
        xs={{ span: 4 }}
        sm={{ span: 4 }}
        md={{ span: 6 }}
        lg={{ span: 4, offset: hasNormalMode() ? 0 : 3 }}
        xl={{ span: 4, offset: hasNormalMode() ? 0 : 4 }}
      >
        <Image src={srcIcon} preview={false} />
      </Col>

      <Col xs={{ span: 4 }} sm={{ span: 4 }} md={{ span: 6 }} lg={{ span: 4 }} xl={{ span: 4 }}>
        <Text
          className={`card-text ${isBold ? 'card-text--active' : ''}`}
          style={{ marginRight: hasNormalMode() ? '10px' : '0' }}
        >
          {quantity}
        </Text>
      </Col>
      <Col
        xs={{ span: 16 }}
        sm={{ span: 16 }}
        md={{ span: 12 }}
        lg={{ span: hasNormalMode() ? 16 : 13 }}
        xl={{ span: hasNormalMode() ? 16 : 12 }}
      >
        {' '}
        <Text className={`card-text ${isBold ? 'card-text--active' : ''}`}>{text}</Text>
      </Col>
    </Row>
  )
}

export const CardInfo = ({ mode = 'normal', title, items }) => {
  return (
    <Card title={title} className={`card-info ${mode === 'reverse' ? 'text-end' : ''}`}>
      {items.map(item => (
        <CardInfoItem
          key={item.text}
          srcIcon={item.srcIcon}
          quantity={item.quantity}
          text={item.text}
          isBold={item.isBold}
          mode={mode}
        />
      ))}
    </Card>
  )
}
