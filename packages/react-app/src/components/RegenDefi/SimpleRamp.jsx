import React, { useState } from 'react'
import { CreditCardOutlined } from '@ant-design/icons'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import { Button, Tooltip } from 'antd'

import { StyledButton } from '../common/StyledButton'

export default function Ramp(props) {
  const type = 'default'

  return (
    <div>
      <Tooltip title="Fund your wallet with cash">
        <StyledButton
          size="large"
          shape="round"
          onClick={() => {
            new RampInstantSDK({
              hostAppName: 'Koywe',
              hostLogoUrl: 'https://staging.koywe.eco/logo512.png',
              // swapAmount: "100000000000000000", // 0.1 ETH in wei  ?
              defaultAsset: 'MATIC_ETH',
              swapAsset: 'MATIC_ETH,MATIC',
              userAddress: props.address,
            })
              .on('*', event => console.log(event))
              .show()
          }}
        >
          <CreditCardOutlined style={{ color: '#52c41a' }} />{' '}
          Fund Account
        </StyledButton>
      </Tooltip>
    </div>
  )
}
