import React, { useContext } from 'react'
import { useExchangeEthPrice } from 'eth-hooks/dapps/dex'

import { BCTVendor } from '../components'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'

const ReFi = ({ writeContracts, tx }) => {
  const { address, targetNetwork, mainnetProvider } = useContext(NetworkContext)
  const { contracts, polygonContracts } = useContext(WalletContext)
  const price = useExchangeEthPrice(targetNetwork, mainnetProvider)

  return (
    <>
      <div style={{ width: 500, margin: 'auto' }}>
        <h1 style={{ padding: 8, marginTop: 32 }}>ReFi positions and curated tokens</h1>
        <p>You can earn money and save the planet, AT THE SAME TIME!</p>
        <p>
          Such convinience, such wow. For now, you can just buy BCT Tokens.
          <a href="https://toucan.earth/" target="_blank" rel="noreferrer">
            Find more about this token and Toucan Protocol↗️
          </a>
        </p>
        <p>In the future, this will be the place to swap, trade, buy or sell the best regerative tokens.</p>
      </div>
      {/* <DexSwapper
            localProvider={localProvider}
            address={address}
            readContracts={readContracts}
            writeContracts={writeContracts}
            tx={tx}
          />
          <DexSwapperLP
            localProvider={localProvider}
            address={address}
            readContracts={readContracts}
            writeContracts={writeContracts}
            tx={tx}
          /> */}
      <h1 style={{ padding: 8, marginTop: 32 }}>BCT Centralized Vendor</h1>
      {address ? (
        <BCTVendor
          address={address}
          readContracts={contracts}
          writeContracts={writeContracts}
          polyContracts={polygonContracts}
          tx={tx}
          price={price}
        />
      ) : (
        'Loading'
      )}
    </>
  )
}

export default ReFi
