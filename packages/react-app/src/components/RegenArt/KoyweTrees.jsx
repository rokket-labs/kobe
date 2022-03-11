import { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { List, Row, Spin, Typography } from 'antd'

import { StyledButton } from '../../components/common/StyledButton'
import { Art } from '../common/Art'

const { Title } = Typography
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const KoyweTrees = ({ address, contracts, yourKTBalance }) => {
  const [showAll, setShowAll] = useState(false)
  const [yourCollectibles, setYourCollectibles] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    const updateYourCollectibles = async () => {
      const collectibleUpdate = []

      for (let tokenIndex = 0; tokenIndex < yourKTBalance; tokenIndex++)
        try {
          const tokenId = await contracts.KoyweCollectibles.tokenOfOwnerByIndex(address, tokenIndex)

          const tokenURI = await contracts.KoyweCollectibles.tokenURI(tokenId)
          const jsonManifestString = atob(tokenURI.substring(29))

          try {
            const jsonManifest = JSON.parse(jsonManifestString)

            collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: address, ...jsonManifest })
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
  }, [address, contracts.KoyweCollectibles, yourKTBalance])

  return (
    <>
      <Row>
        <Title level={2}>Koywe Trees</Title>
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

export default KoyweTrees
