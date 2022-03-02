import React, { useContext } from 'react'
import { Button } from 'antd'

import { NetworkContext } from '../../contexts/NetworkContext'

import InfoText from './InfoText'

const Wallet = ({ isPledged }) => {
  const { address, connectToWallet } = useContext(NetworkContext)

  return (
    <>
      {!address ? (
        <Button style={{ marginTop: '4px' }} onClick={() => connectToWallet()}>
          Connect
        </Button>
      ) : (
        <InfoText backgroundColor={'#4299E1'} text={address} isPlant={isPledged} />
      )}
    </>
  )
}

export default Wallet
