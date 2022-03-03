import { Col } from 'antd'

export const RightLayout = ({ children }) => {
  return (
    <Col
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 12, order: 2 }}
      xl={{ span: 6, order: 0 }}>
      {children}
    </Col>
  )
}
