import React, { useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { List, Row, Spin, Typography } from 'antd'

import { StyledButton } from '../../components/common/StyledButton'
import { Art } from '../common/Art'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const { Title } = Typography

const MyRegenArt = ({ artGallery, isLoading, title = '' }) => {
  const [showAll, setShowAll] = useState(false)

  return (
    <>
      <Row>
        <Title level={2}>{title}</Title>
      </Row>
      {isLoading ? (
        <Row justify="center" gutter={8}>
          <Spin indicator={antIcon} />
        </Row>
      ) : (
        <>
          <Row justify="center" gutter={8}>
            <List
              style={{ width: '100%' }}
              dataSource={showAll ? artGallery : artGallery.slice(0, 5)}
              grid={{ gutter: 16, column: 5 }}
              renderItem={item => {
                return (
                  <List.Item key={`${item.id}`}>
                    <Art srcImg={item.image} title={item.name} />
                  </List.Item>
                )
              }}
            />
          </Row>
          {artGallery.length > 5 && (
            <Row justify="center" className="my-md">
              <StyledButton $type="primary" onClick={() => setShowAll(hiddenArt => !hiddenArt)}>
                {!showAll ? 'See all my art' : 'Hide my art'}
              </StyledButton>
            </Row>
          )}
        </>
      )}
    </>
  )
}

export default MyRegenArt
