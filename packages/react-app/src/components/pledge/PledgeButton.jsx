import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from 'antd'
import { useGasPrice } from 'eth-hooks'

import { NetworkContext } from '../../contexts/NetworkContext'
import { WalletContext } from '../../contexts/WalletContext'
import { Transactor } from '../../helpers'

const PledgeButton = ({ isPledged }) => {
  const [pledging, setPledging] = useState(false)
  const [tonsCommitted, setTonsCommitted] = useState()
  const { targetNetwork, userSigner } = useContext(NetworkContext)
  const { writeContracts } = useContext(WalletContext)

  const gasPrice = useGasPrice(targetNetwork, 'fast')
  const tx = Transactor(userSigner, gasPrice)

  return (
    <>
      {!isPledged ? (
        <div style={{ padding: 8, marginTop: 32, width: 300, margin: 'auto' }}>
          <Input
            style={{ textAlign: 'center' }}
            placeholder={'annual CO2e tons committed'}
            value={tonsCommitted}
            onChange={e => {
              setTonsCommitted(e.target.value)
            }}
          />
          <Button
            type={isPledged ? 'success' : 'primary'}
            size={'large'}
            loading={pledging}
            onClick={async () => {
              setPledging(true)
              await tx(writeContracts.KoywePledge.newPledge(tonsCommitted * 10 ** 9))
              setPledging(false)
            }}
          >
            🌱 Pledge On-Chain 🌱
          </Button>
        </div>
      ) : (
        <div>
          <p>You are now a part of something bigger: a forest.</p>
          <Link to="/journey">
            <Button size={'large'}>🌱 Grow the Forest 🌱</Button>
          </Link>
        </div>
      )}
    </>
  )
}

export default PledgeButton
