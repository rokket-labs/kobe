import React, { useContext } from 'react'
import { Col, Row, Typography } from 'antd'

import PledgeDisplay from '../components/pledge/PledgeDisplay'
import PledgedReduceCO2 from '../components/PledgedReduceCO2'
import { StyledIcon } from '../components/StyledIcon'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'

const { Title, Paragraph } = Typography

const Pledge = () => {
  const { address } = useContext(NetworkContext)
  const { isPledged } = useContext(WalletContext)

  return (
    <Row justify="center" style={{ marginBottom: '5rem' }}>
      {isPledged && <PledgeDisplay />}
      <Col span={24}>
        <Title style={{ textAlign: 'center', fontSize: 36 }}>First... The Pledge</Title>
      </Col>
      <Col xl={13} xs={22}>
        <Paragraph style={{ fontSize: 18, lineHeight: '2.5rem' }}>
          This pledge is nothing more than a public commitment to do better. To be in charge of our emissions. To take
          ownership of a part of the effort. It doesn&apos;t need to be exact, but it does need to come from your heart.
          There are 60 million CO2e tons emitted every year. <br />
          We ask you to make a commitment, just like our nation&apos;s leaders do, of annual CO2 tons that we will
          contribute to bring to zero (0). Now the important....your pledge
        </Paragraph>
      </Col>
      <Col xl={13} xs={22}>
        <Paragraph style={{ fontSize: 24, lineHeight: '3rem' }}>
          I hereby pledge to do my best to save the planet. <StyledIcon src={'icon/planet.svg'} preview={false} />
          <br />I pledge to do my best to reduce emissions, by consuming less or by being more conscious about my
          decisions.
          <StyledIcon src={'icon/burger.svg'} preview={false} /> <StyledIcon src={'icon/recycle.svg'} preview={false} />
          <br />I pledge to help others in their paths to help the planet.{' '}
          <StyledIcon src={'icon/humans.svg'} preview={false} />
          <br />I pledge to contribute, with money or time as long as I am able, to other people in my community.
        </Paragraph>
      </Col>
      <Col xl={13} xs={22}>
        <Paragraph style={{ fontSize: 24, lineHeight: '3rem' }}>
          I pledge to grow a Forest, to be a Forest with my community, to take small, steady, and concrete steps to
          protect and help everyone adapt to the stormy weather. <StyledIcon src={'icon/tree.svg'} preview={false} />
          <StyledIcon src={'icon/tree.svg'} preview={false} />
          <StyledIcon src={'icon/tree.svg'} preview={false} />
        </Paragraph>
      </Col>

      {address && (
        <Col xl={13} xs={22}>
          <PledgedReduceCO2 isPledged={isPledged} address={address} />
        </Col>
      )}
    </Row>
  )
}

export default Pledge
