import React from 'react'

import { TreejerGraph } from '../components'

const RegenArt = ({ address }) => {
  return (
    <div>
      <div style={{ width: 500, margin: 'auto' }}>
        <h1 style={{ padding: 8, marginTop: 32 }}>Regenerative Art Collections</h1>
        <p>Check out your collection or add more items to help fight climate change.</p>
        <p>
          Some cool things you can fund: planting trees, direct capture CO2 from the air, help local communities, and
          more!
        </p>
        <p>
          For now, you can only view your Treejer collection.{' '}
          <a href="https://treejer.com/" target="_blank" rel="noreferrer">
            You cant mint trees here↗️
          </a>
        </p>
      </div>
      <h2 style={{ padding: 8, marginTop: 32 }}>Treejer Trees</h2>
      {address && <TreejerGraph address={address} />}
    </div>
  )
}

export default RegenArt
