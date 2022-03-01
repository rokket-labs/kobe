import React, { useContext, useState } from 'react'
import { Button, Card } from 'antd'
import { useContractLoader, useContractReader, useGasPrice, useOnBlock } from 'eth-hooks'

import { NetworkContext } from '../../contexts/NetworkContext'
import { WalletContext } from '../../contexts/WalletContext'
import { Transactor } from '../../helpers'
import TokenBalance from '../TokenBalance'

const DripBalance = ({ CO2TokenBalance }) => {
  const [dripping, setDripping] = useState()
  const { address, targetNetwork, userSigner } = useContext(NetworkContext)
  const { writeContracts } = useContext(WalletContext)

  const gasPrice = useGasPrice(targetNetwork, 'fast')
  const tx = Transactor(userSigner, gasPrice)

  return (
    <>
      {CO2TokenBalance === 0 ? (
        <Button
          type={CO2TokenBalance > 0 ? 'success' : 'primary'}
          size={'large'}
          loading={dripping}
          onClick={async () => {
            setDripping(true)
            await tx(writeContracts.CO2TokenContract.startDripping(address))
            setDripping(false)
          }}
        >
          💧 Start Dripping your CO2e 💧
        </Button>
      ) : (
        <div style={{ padding: 8, marginTop: 32, width: 300, margin: 'auto' }}>
          <Card title="🔥 Your CO2e Tons🔥">
            <div style={{ padding: 8 }}>
              <TokenBalance balance={CO2TokenBalance} fontSize={64} /> CO2e Tons emitted since pledging; the share of
              the problem you own
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

export default DripBalance
