import { useEffect, useState } from 'react'
import { Card, List } from 'antd'

const KoyweTrees = (contracts, yourKTBalance, address) => {
  const [yourCollectibles, setYourCollectibles] = useState()

  useEffect(() => {
    const updateYourCollectibles = async () => {
      const collectibleUpdate = []

      for (let tokenIndex = 0; tokenIndex < yourKTBalance; tokenIndex++)
        try {
          console.log('GEtting token index', tokenIndex)

          const tokenId = await contracts.KoyweCollectibles.tokenOfOwnerByIndex(address, tokenIndex)

          console.log('tokenId', tokenId)

          const tokenURI = await contracts.KoyweCollectibles.tokenURI(tokenId)
          const jsonManifestString = atob(tokenURI.substring(29))

          console.log('jsonManifestString', jsonManifestString)

          try {
            const jsonManifest = JSON.parse(jsonManifestString)

            console.log('jsonManifest', jsonManifest)
            collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: address, ...jsonManifest })
          } catch (e) {
            console.log(e)
          }
        } catch (e) {
          console.log(e)
        }

      setYourCollectibles(collectibleUpdate.reverse())
    }

    updateYourCollectibles()
  }, [address, contracts.KoyweCollectibles, yourKTBalance])

  return (
    <div style={{ width: '100%', margin: 'auto', marginTop: 32, paddingBottom: 32 }}>
      <List
        grid={3}
        dataSource={yourCollectibles}
        renderItem={item => {
          const id = parseInt(item.id, 16)
          const { name } = item

          return (
            <List.Item key={id}>
              <Card
                title={
                  <div>
                    <span style={{ fontSize: 16, marginRight: 8 }}>{name}</span>
                  </div>
                }
              >
                <div>
                  <a href={item.external_url} target="_blank">
                    <img src={item.image} style={{ maxWidth: 150 }} />
                  </a>
                </div>
                <div style={{ maxWidth: 150 }}>{item.description}</div>
              </Card>
            </List.Item>
          )
        }}
      />
    </div>
  )
}

export default KoyweTrees
