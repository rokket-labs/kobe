import { Col } from 'antd'

export const LeftLayout = ({ children }) => {
  return (
    <Col
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 12, order: 1 }}
      xl={{ span: 6, order: 0 }}>
      {children}
    </Col>
  )
}
