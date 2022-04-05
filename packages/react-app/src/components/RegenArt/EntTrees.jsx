import { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { List, Row, Spin, Typography } from 'antd'

import { Art } from '../common/Art'
import { StyledButton } from '../common/StyledButton'

const { Title } = Typography
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const EntTrees = ({ address, contracts, yourETBalance }) => {
  const [showAll, setShowAll] = useState(false)
  const [yourCollectibles, setYourCollectibles] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    const updateYourCollectibles = async () => {
      const collectibleUpdate = []

      for (let tokenIndex = 0; tokenIndex < yourETBalance; tokenIndex++)
        try {
          const tokenId = await contracts.ENT.tokenOfOwnerByIndex(address, tokenIndex)

          const tokenURI = await contracts.ENT.tokenURI(tokenId)

          console.log('tokenURI',tokenURI)

          try {
            const response = await fetch(
              tokenURI,
            )
            const data = await response.json()

            console.log('response',data)

            collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: address, ...data })
          } catch (e) {
            console.log(e)
          }
        } catch (e) {
          console.log(e)
        }

      setYourCollectibles(collectibleUpdate.reverse())
      setIsLoading(false)
    }

    updateYourCollectibles()
  }, [address, contracts.ENT, yourETBalance])

  return (
    <>
      {/* <Row>
        <Title level={2}>Ent Trees</Title>
      </Row> */}
      {isLoading ? (
        <Row justify="center" gutter={8}>
          <Spin indicator={antIcon} />
        </Row>
      ) : (
        <>
          <Row justify="center" gutter={8}>
            <List
              style={{ width: '100%' }}
              dataSource={showAll ? yourCollectibles : yourCollectibles.slice(0, 5)}
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
          {yourCollectibles.length > 5 && (
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

export default EntTrees
