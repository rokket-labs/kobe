import { Col, Row, Switch, Typography } from 'antd'

const { Text } = Typography

/**
  type AdvancedProps = {
    isAdvanced: boolean
    handleAdvanced: (checked: boolean) => void
  }
*/

export const Advanced = ({
  isAdvanced,
  handleAdvanced,
}) => {
  return (
    <Row align="middle" style={{ marginBottom: '10px' }}>
      <Col span={6} style={{ textAlign: 'center' }}>
        <Text>Tipo preguntas</Text>
      </Col>
      <Col span={5}>
        <Text strong>Simplificada</Text>
      </Col>
      <Col span={4}>
        <Switch
          checked={isAdvanced}
          onChange={checked => handleAdvanced(checked)}
        />
      </Col>
      <Col span={9}>
        <Text strong>Avanzada</Text>
      </Col>
    </Row>
  )
}
