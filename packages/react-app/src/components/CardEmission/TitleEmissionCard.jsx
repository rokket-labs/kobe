import { Col, Row, Typography } from 'antd'
import styled from 'styled-components'

const { Title, Text } = Typography

/**
  type TitleEmissionCardProps = {
    title: string
    co2: number
    isWritable: boolean
  }

  type StyledTitleProps = {
    iswritable: string
  }
*/

const StyledTitle = styled(Title)`
  text-align: center;
  margin-bottom: 0 !important;
  font-size: ${({ iswritable }) =>
    iswritable ? '24px' : '36px'} !important;
  line-height: ${({ iswritable }) =>
    iswritable ? '32px' : '1.23'} !important;
`

const TitleEmissionCard = ({
  title,
  co2,
  isWritable,
}) => {
  return (
    <Row justify="center" align="middle">
      <Col span={24} style={{ marginTop: '1.5rem' }}>
        <StyledTitle iswritable={isWritable.toString()}>
          {isWritable ? (
            title
          ) : (
            <>
              <span style={{ fontSize: '48px' }}>{co2}</span> CO2
            </>
          )}
        </StyledTitle>
      </Col>
      {!isWritable && (
        <Col span={24} style={{ textAlign: 'center', fontSize: '24px' }}>
          <Text>tons/year</Text>
        </Col>
      )}
    </Row>
  )
}

export default TitleEmissionCard
