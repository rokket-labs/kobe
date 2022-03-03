import { Col, Image, Input, Row, Select, Typography } from 'antd'

import { StyledButton } from '../../components/common/StyledButton'

import { StyledCol } from './components/StyledCol'
import { StyledRow } from './components/StyledRow'
import { StyledTitle } from './components/StyledTitle'

const { Text, Title } = Typography
const { Option } = Select

/**
  type HomeProps = {
    nextStep: (value?: number) => void
  }
*/

export const Home = ({ nextStep }) => {
  return (
    <>
      <StyledRow justify="center">
        <Col>
          <Title level={2}>Calcula tus emisiones</Title>
        </Col>
      </StyledRow>
      <StyledRow justify="center">
        <Col>
          <Text>
            Contesta esta breve encuesta sobre tu estilo de vida, esto nos
            ayudará a conocerte más en detalle y que puedas saber la huella que
            generas en relación a este.
          </Text>
        </Col>
      </StyledRow>
      <StyledRow justify="center">
        <Col>
          <Image src="icon/earth-planet.svg" preview={false} />
        </Col>
      </StyledRow>
      <StyledRow justify="center" align="middle" gutter={12}>
        <StyledCol>
          <StyledTitle level={3}>Datos de contacto</StyledTitle>
        </StyledCol>
        <StyledCol>
          <Image src="icon/alert-info.svg" preview={false} />
        </StyledCol>
      </StyledRow>
      <StyledRow justify="center">
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
          <Text>Correo electrónico *</Text>
          <Input placeholder="mail@mail.com" />
        </Col>
      </StyledRow>
      <StyledRow justify="center">
        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6 }}>
          <Row>
            <Col span={24}>
              <Text>¿En qué país vives? *</Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Select
                placeholder="Selecciona tu país"
                style={{ width: '100%' }}>
                <Option value="CL">Chile</Option>
                <Option value="ARG">Argentina</Option>
              </Select>
            </Col>
          </Row>
        </Col>
      </StyledRow>
      <StyledRow justify="center">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 6 }}
          md={{ span: 4 }}
          lg={{ span: 3 }}>
          <StyledButton
            $type="primary"
            style={{ width: '100%' }}
            onClick={() => nextStep()}>
            Siguiente
          </StyledButton>
        </Col>
      </StyledRow>
    </>
  )
}
