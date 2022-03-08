import React, { useContext } from 'react'

import { NetworkContext } from '../../contexts/NetworkContext'
import { StyledButton } from '../common/StyledButton'

import InfoText from './InfoText'

const Wallet = ({ isPledged }) => {
  const { address, connectToWallet } = useContext(NetworkContext)

  return (
    <>
      {!address ? (
        <StyledButton $type="secondary" style={{ marginTop: '4px' }} onClick={() => connectToWallet()}>
          Connect
        </StyledButton>
      ) : (
        <InfoText backgroundColor={'#4299E1'} text={address} isPlant={isPledged} />
      )}
    </>
  )
}

export default Wallet
