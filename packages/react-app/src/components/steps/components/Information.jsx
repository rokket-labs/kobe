import { Col, Image, Row, Typography } from 'antd'

const { Title, Text } = Typography

import styled from 'styled-components'

import { device } from '../../../styles/theme'

const StyledBody = styled.div`
  box-sizing: border-box !important;
  background-color: #33732f;
  border-radius: 5px;
  padding: 38px;
  min-height: 450px;
  @media ${device.sm} {
    min-height: 470px;
  }
`
const StyledTitle = styled(Title)`
  color: #ffffff !important;
  @media ${device.xl} {
    font-size: 36px !important;
    line-height: 44px;
  }
`

const StyledText = styled(Text)`
  color: #ffffff !important;
  @media ${device.xl} {
    font-size: 18px !important;
    line-height: 30px;
  }
`
/**
  type InformationMock = {
    id: string
    icon: string
    title: string
    text: TextMock[]
  }

  type TextMock = {
    id: string
    content: string
  }
*/

const dataMock = [
  {
    id: '1',
    icon: 'icon/bicycle.svg',
    title: '¿Sabías qué...',
    text: [
      {
        id: '1',
        content:
          '...al utilizar una bicicleta o caminar, contribuyes disminuyendo un 20% tus emisiones versus las que emite un auto promedio?',
      },
    ],
  },
  {
    id: '2',
    icon: 'icon/light.svg',
    title: '¿Sabías qué...',
    text: [
      {
        id: '1',
        content: '...tus emisiones dependen de la matriz eléctrica de tu país?',
      },
      {
        id: '2',
        content:
          'Hay mucho que puedes hacer para ayudar, parte por utilizar ampolletas eficientes, ellas reducen un 15% tu consumo.',
      },
      {
        id: '3',
        content: '¿Conoces otras formas de ayudar?',
      },
    ],
  },
  {
    id: '3',
    icon: 'icon/food.svg',
    title: '¿Sabías qué...',
    text: [
      {
        id: '1',
        content: '...1 kg de carne roja equivale a 2 meses de ducha?',
      },
      {
        id: '2',
        content:
          'Por esta y otras razones, es importante reducir nuestro consumo de carnes y poder comprar aquellas que utilizan manejo regenerativo.',
      },
    ],
  },
  {
    id: '4',
    icon: 'icon/eco.svg',
    title: '¿Sabías qué...',
    text: [
      {
        id: '1',
        content:
          '...la manera en que consumes afecta directamente las emisiones de CO2?',
      },
      {
        id: '2',
        content:
          'Lo ideal es disminuir tu consumo, luego reutilizar y reciclar todo lo que puedas.',
      },
    ],
  },
  {
    id: '5',
    icon: 'icon/message.svg',
    title: '¿Sabías qué...',
    text: [
      {
        id: '1',
        content:
          '...trabajar de forma remota ayuda a disminuir las emisiones de CO2?',
      },
      {
        id: '2',
        content: 'Esto debido a que no utilizas medios de transporte, y otros.',
      },
    ],
  },
]

/**
  type InformationItemsProps = {
    data: InformationMock
  }
*/

const InformationItems = ({ data }) => {
  return (
    <Row justify="start" gutter={[0, 16]}>
      {data.text.map(item => {
        return (
          <Col key={item.id}>
            <StyledText>{item.content}</StyledText>
          </Col>
        )
      })}
    </Row>
  )
}

/**
  type InformationProps = {
    index?: number
  }
*/

export const Information = ({ index = 0 }) => {
  const data = dataMock[index]

  return (
    <StyledBody>
      <Row justify="center">
        <Col>
          <Image src={data.icon} preview={false} />
        </Col>
      </Row>
      <Row style={{ margin: '12px 0' }}>
        <Col>
          <StyledTitle>{data.title}</StyledTitle>
        </Col>
      </Row>
      <InformationItems data={data} />
    </StyledBody>
  )
}
