import React, { useState } from 'react'
import { Button, Modal, Tooltip } from 'antd'

import { StyledButton } from '../common/StyledButton'

const { utils } = require('ethers')

export default function BuySetModal({ tokenSet, modalUp, setModalUp, setName, address }) {
  const type = 'default'

  return (
    <div>
      <Modal title={`Buy ${setName}`}
        visible={modalUp === 'up'}
        onCancel={() => {
          setModalUp('down')
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setModalUp('down')
            }}
          >
            cancel
          </Button>,
        ]}>
          <Button
              // loading={staking}
              onClick={async () => {
                // setStaking(true);
                await tokenSet.issuance.issueAsync('0x0765425b334D7DB1f374D03f4261aC191172BEF7',utils.parseEther('0.1'),address,address)
                // setStaking(false);
              }}
              // disabled={isTokenAmountApproved && proposal && tokenAmount ? false : true}
            >
              Buy CNBED
            </Button>
      </Modal>
    </div>
  )
}
