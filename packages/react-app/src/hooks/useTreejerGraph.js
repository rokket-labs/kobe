import { useEffect, useState } from 'react'
import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

const APIURL = 'https://api.thegraph.com/subgraphs/name/treejer/treejer-subgraph'
const TREEJER_BASE_URL = 'https://api.treejer.com/trees/'

export const useTreejerGraph = address => {
  const [collection, setCollection] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    const getTreejerCollection = async () => {
      if (address) {
        const client = new ApolloClient({
          uri: APIURL,
          cache: new InMemoryCache(),
        })
        const treejerCollection = []

        await client
          .query({
            query: gql(`
            {
              trees(first: 100, skip: 0, where:{ owner: "${address.toLowerCase()}" }, orderBy: "createdAt", orderDirection: "asc")
              {
                  id
                  createdAt
              }
            }
          `),
          })
          .then(data => {
            data.data.trees.forEach(async tree => {
              const tree_id = parseInt(tree.id, 16)

              try {
                const jsonResponse = await fetch(TREEJER_BASE_URL + tree_id)
                const json = await jsonResponse.json()

                if (data.data.trees.length >= treejerCollection.length)
                  /* setTreejerCollection(treejerCollection => [...treejerCollection, json]) */
                  treejerCollection.push(json)
              } catch (e) {
                console.log(`Error loading Treejer json. ${e}`)
              }
            })
            setCollection(treejerCollection)
          })
          .catch(err => {
            console.log('Error fetching data: ', err)
          })
        setIsLoading(false)
      }
    }

    getTreejerCollection()
  }, [address])

  return { collection, isLoading }
}
