import React, { useContext } from 'react'

import { NetworkContext } from '../../contexts/NetworkContext'

import { StyledButton } from './StyledButton'

const ConnectButton = () => {
  const { address, connectToWallet } = useContext(NetworkContext)

  return (
    <>
      {!address ? (
        <StyledButton $type="secondary" style={{ marginTop: '4px' }} onClick={() => connectToWallet()}>
          Connect your Wallet to use Koywe
        </StyledButton>
      ) : (
        ''
      )}
    </>
  )
}

export default ConnectButton
