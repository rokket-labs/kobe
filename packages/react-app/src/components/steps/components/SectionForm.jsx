import { Col, Image, Row, Typography } from 'antd'

const { Text } = Typography

/**
  type SectionFormProps = {
    icon: string
    title: string
  }
*/

export const SectionForm = ({ icon, title }) => {
  return (
    <Col span={6}>
      <Row justify="center">
        <Col>
          <Image src={icon} preview={false} />
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '8px' }}>
        <Col span={20} style={{ textAlign: 'center' }}>
          <Text>{title}</Text>
        </Col>
      </Row>
    </Col>
  )
}
