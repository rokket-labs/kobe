import { Col, Image, Row, Typography } from 'antd'

import { StyledButton } from '../../components/common/StyledButton'

import { Stats } from './components/Stats'
import { StyledRow } from './components/StyledRow'
import { StyledTitle } from './components/StyledTitle'

const { Text, Title } = Typography

/**
  type ReadyProps = {
    nextStep: (value?: number) => void
  }
 */

export const Ready = ({ nextStep }) => {
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
      <Row justify="center" gutter={{ md: 16, lg: 16, xl: 32, xxl: 64 }}>
        <Col
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 8 }}>
          <Stats />
        </Col>
        <Col
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
          xl={{ span: 16 }}
          xxl={{ span: 12 }}>
          <StyledRow justify="center">
            <Col>
              <Image src="icon/earth-planet.svg" preview={false} />
            </Col>
          </StyledRow>
          <StyledRow>
            <Col>
              <StyledTitle level={4}>
                Estos datos son calculados en base al promedio de tu país
              </StyledTitle>
            </Col>
          </StyledRow>
          <StyledRow>
            <Col>
              <Text>
                A medida que avances la información se actualizará de acuerdo a
                lo que respondas.
              </Text>
            </Col>
          </StyledRow>
          <StyledRow>
            <Col>
              <Text>
                Algunas secciones cuentan con consultas simplificadas y otras
                avanzadas, la diferencia es que mientras más detalles podamos
                obtener de tu información es posible determinar tus emisiones de
                forma más precisa.
              </Text>
            </Col>
          </StyledRow>
          <StyledRow>
            <Col>
              <Text>Te recomendamos que puedas hacer la detallada.</Text>
            </Col>
          </StyledRow>
          <StyledRow justify="space-between">
            <Col>
              <StyledTitle level={4}>
                ¿Estás listo para hacer un cambio?
              </StyledTitle>
            </Col>
            <Col>
              <StyledButton $type="primary" onClick={() => nextStep()}>
                Comencemos
              </StyledButton>
            </Col>
          </StyledRow>
        </Col>
      </Row>
    </>
  )
}
