import React from 'react'
import { Button } from 'antd'

import InfoText from './InfoText'

const Wallet = ({ address, isPledged, loadWeb3Modal }) => {
  return (
    <>
      {!address ? (
        <Button style={{ marginTop: '4px' }} onClick={() => loadWeb3Modal()}>
          Connect
        </Button>
      ) : (
        <InfoText backgroundColor={'#4299E1'} text={address} isPlant={isPledged} />
      )}
    </>
  )
}

export default Wallet
