import { Col, Row, RowProps } from 'antd'

import { SectionForm } from '../components/SectionForm'

/**
  export type RowLayoutProps = {
    icon: string
    title: string
  }
*/

export const RowLayout = ({
  children,
  icon,
  title,
}) => {
  return (
    <Row>
      <SectionForm icon={icon} title={title} />
      <Col span={18}>{children}</Col>
    </Row>
  )
}
