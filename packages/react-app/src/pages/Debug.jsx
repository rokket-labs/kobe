import React from 'react'

import { Contract } from '../components/Contract'

const Debug = ({ price, userSigner, localProvider, address, blockExplorer, contractConfig }) => {
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
        provider={localProvider}
        address={address}
        blockExplorer={blockExplorer}
        contractConfig={contractConfig}
      />
      <Contract
        name="CO2TokenContract"
        price={price}
        signer={userSigner}
        provider={localProvider}
        address={address}
        blockExplorer={blockExplorer}
        contractConfig={contractConfig}
      />
      {/* <Contract
            name="KoyweToken"
            price={price}
            signer={userSigner}
            provider={localProvider}
            address={address}
            blockExplorer={blockExplorer}
            contractConfig={contractConfig}
          /> */}
      <Contract
        name="BCTVendor"
        price={price}
        signer={userSigner}
        provider={localProvider}
        address={address}
        blockExplorer={blockExplorer}
        contractConfig={contractConfig}
      />
      {/* <Contract
            name="Dex"
            price={price}
            signer={userSigner}
            provider={localProvider}
            address={address}
            blockExplorer={blockExplorer}
            contractConfig={contractConfig}
          /> */}
    </>
  )
}

export default Debug
