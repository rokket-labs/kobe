import { Col } from 'antd'

export const MiddleLayout = ({ children }) => {
  return (
    <Col
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 24, order: 0 }}
      xl={{ span: 12, order: 0 }}>
      {children}
    </Col>
  )
}
