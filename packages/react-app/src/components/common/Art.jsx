import { Col, Image, Row, Typography } from 'antd'

const { Text } = Typography

export const Art = ({ srcImg, title }) => {
  return (
    <Col>
      <Row className="art-container_image" justify="center">
        <Image height={'100%'} src={srcImg} />
      </Row>
      <Row>
        <Text className="art-title">{title}</Text>
      </Row>
    </Col>
  )
}
