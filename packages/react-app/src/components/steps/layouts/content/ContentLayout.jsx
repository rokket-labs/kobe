import { Row } from 'antd'

export const ContentLayout = ({ children }) => {
  return <Row gutter={[{ md: 16 }, { xs: 16 }]}>{children}</Row>
}
