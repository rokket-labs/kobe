import React, { useContext } from 'react'

import Contract from '../components/Contract'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'


const DebugPage = () => {
  const price = 2600
  const { address, userSigner, polygonProvider, blockExplorer } = useContext(NetworkContext)
  const { contractConfig } = useContext(WalletContext)

  return (
    <>
      {/*
                🎛 this scaffolding is full of commonly used components
                this <Contract/> component will automatically parse your ABI
                and give you a form to interact with it locally
            */}

      <Contract
        name="KoywePledge"
        price={price}
        signer={userSigner}
        provider={polygonProvider}
        address={address}
        blockExplorer={blockExplorer}
        contractConfig={contractConfig}
      />
      <Contract
        name="CO2TokenContract"
        price={price}
        signer={userSigner}
        provider={polygonProvider}
        address={address}
        blockExplorer={blockExplorer}
        contractConfig={contractConfig}
      />
      <Contract
            name="KoyweCollectibles"
            price={price}
            signer={userSigner}
            provider={polygonProvider}
            address={address}
            blockExplorer={blockExplorer}
            contractConfig={contractConfig}
          />
      <Contract
        name="BCTVendor"
        price={price}
        signer={userSigner}
        provider={polygonProvider}
        address={address}
        blockExplorer={blockExplorer}
        contractConfig={contractConfig}
      />
      {/* <Contract
            name="Dex"
            price={price}
            signer={userSigner}
            provider={polygonProvider}
            address={address}
            blockExplorer={blockExplorer}
            contractConfig={contractConfig}
          /> */}
    </>
  )
}

export default DebugPage
