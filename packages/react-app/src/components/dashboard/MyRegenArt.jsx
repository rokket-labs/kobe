import React, { useState } from 'react'
import { Row, Typography } from 'antd'

import { Art } from '../common/Art'
import { StyledButton } from '../common/StyledButton'

const { Title } = Typography

const MyRegenArt = ({ artGallery }) => {
  const [showAll, setShowAll] = useState(false)

  return (
    <>
      <Row>
        <Title level={2}>Your regen art</Title>
      </Row>
      {!showAll ? (
        // only show 4 cards
        <Row justify="center" gutter={8}>
          {artGallery.slice(0, 5).map(item => {
            return <Art key={`${item.id}`} srcImg={item.image} title={item.name} />
          })}
        </Row>
      ) : (
        <Row justify="center" gutter={8}>
          {artGallery.map(item => {
            return <Art key={`${item.id}`} srcImg={item.image} title={item.name} />
          })}
        </Row>
      )}
      <Row justify="center" className="my-md">
        <StyledButton $type="primary" onClick={() => setShowAll(hiddenArt => !hiddenArt)}>
          {!showAll ? 'See all my art' : 'Hide my art'}
        </StyledButton>
      </Row>
    </>
  )
}

export default MyRegenArt
