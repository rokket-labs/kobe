import { Col, Row } from 'antd'

import { StyledLabel } from '../components/StyledLabel'
import { TooltipInfo } from '../components/TooltipInfo'

/**
  type InputLayoutProps = {
    children: ReactElement
    label: string
    tooltip?: boolean
    tooltipText?: string
    span?: number
    margin?: boolean
    question?: boolean
  }
*/

export const InputLayout = ({
  children,
  label,
  tooltip = false,
  tooltipText = '',
  margin = true,
  question = true,
}) => {
  return (
    <Row style={{ margin: margin ? '12px 0' : '0px 0px' }}>
      <Col span={24}>
        <StyledLabel>{label}</StyledLabel>
      </Col>
      <Col span={22}>{children}</Col>
      {tooltip && (
        <Col
          span={2}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TooltipInfo title={tooltipText} question={question} />
        </Col>
      )}
    </Row>
  )
}
