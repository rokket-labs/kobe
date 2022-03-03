import { Col, Input, Row, Typography } from 'antd'

import { StyledButton } from '../common/StyledButton'

const { Title, Text } = Typography

/**
  type ContentEmissionCardProps = {
    co2: number
    context?: string
    isWritable: boolean
    handleInputCO2: (event: ChangeEvent<HTMLInputElement>) => void
    onClick: (url: string) => void
  }
*/

const ContentEmissionCard = ({
  co2,
  context,
  isWritable = false,
  handleInputCO2,
  onClick,
}) => {
  return (
    <Row justify="center" align="middle">
      <Col span={24} style={{ minHeight: '5rem' }}>
        {isWritable ? (
          <>
            <Text>Annual CO2e tons commited</Text>
            <Input
              type={'number'}
              style={{
                width: '100%',
                marginBottom: '1.5rem',
                height: '48px',
              }}
              value={co2}
              onChange={handleInputCO2}
              suffix="tons/year"
            />
          </>
        ) : (
          <Title
            level={5}
            style={{
              textAlign: 'center',
              minHeight: '5rem',
              lineHeight: '24px',
            }}>
            {context}
          </Title>
        )}
      </Col>
      <Col span={24} style={{ marginTop: '0.125rem' }}>
        <StyledButton
          $type="primary"
          onClick={() => onClick('/pledge')}
          style={{
            whiteSpace: 'normal',
            height: 'auto',
            width: '100%',
            padding: '12px 0',
          }}>
          Pledge for {co2} CO2 tons/year
        </StyledButton>
      </Col>
    </Row>
  )
}

export default ContentEmissionCard
