import React, { useState } from 'react'
import { Button, Input, Modal, Tooltip } from 'antd'

import { StyledButton } from '../common/StyledButton'

const { utils } = require('ethers')

export default function BuySetModal({ handleApproveTokens, tokensApproved, handleIssuance, modalUp, handleModalDown, setName, address, approving, buying }) {
  const tokenTexts = {
    'Buy CNBED' : ['CNBED','Our first index, Carbon Negative BED combines the main names in crypto (BTC, ETH, and DeFi Pulse) with the best carbon token: NCT.','https://www.tokensets.com/v2/set/polygon/0x0765425b334d7db1f374d03f4261ac191172bef7'],
    'Buy CBTC' : ['CBTC', 'A fan favorite, Clean Bitcoin lets you invest in the greatest store of value of our time, net-zero! The 1% of NCT tokens assures, at current prices, 38 years of green BTC hodling.','https://www.tokensets.com/v2/set/polygon/0x7958e9fa5cf56aebedd820df4299e733f7e8e5dd'],
  }
  const [tokenAmount,setTokenAmount] = useState()

  return (
    <div>
      <Modal title={setName}
        visible={modalUp === true}
        onCancel={() => {
          handleModalDown()
        }}
        footer={[
          <Button
            key='back'
            onClick={() => {
              handleModalDown()
            }}
          >
            Close
          </Button>,
        ]}>
          {/* <Input
            style={{ textAlign: 'center' }}
            placeholder={'shares of the index to issue'}
            value={tokenAmount}
            onChange={e => {
              setTokenAmount(e.target.value)
            }}
          /> */}
          {setName && tokenTexts[setName][1]}
          <br />
          <StyledButton href={setName && tokenTexts[setName][2]} target='_blank' $type='primary'>Learn more and buy shares</StyledButton>
          {/* <StyledButton loading={approving} $type="primary" disabled={tokensApproved} onClick={handleApproveTokens}>
            Approve Tokens
          </StyledButton>
          <StyledButton loading={buying} $type="primary" disabled={!tokensApproved} onClick={handleIssuance}>
            Issue Index Tokens
          </StyledButton> */}
      </Modal>
    </div>
  )
}
