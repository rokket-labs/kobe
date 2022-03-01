import { Col, Progress, Row, Typography } from 'antd'

const { Text } = Typography

export const ProgressInfo = ({ percentage = 100, color, title, above, below }) => {
  const maxCol = 22
  const getWidth = () => {
    if (percentage >= 100) return maxCol

    if (percentage <= 0) return 0

    const cols = Math.floor((percentage * maxCol) / 100)

    return cols
  }

  return (
    <Row align="middle">
      <Col xs={{ span: 24 }} md={{ span: 2 }}>
        <Row justify="start" align="middle">
          <Text>{title}</Text>
        </Row>
      </Col>
      <Col span={getWidth()}>
        <Row justify="end">{above}</Row>
        <Progress percent={100} showInfo={false} strokeColor={color}></Progress>
        <Row justify="end">{below}</Row>
      </Col>
    </Row>
  )
}
