import React, { useContext } from 'react'
import { Row, Spin, Typography } from 'antd'
import { useContractReader, useGasPrice } from 'eth-hooks'
import { useExchangeEthPrice } from 'eth-hooks/dapps/dex'

import { BCTVendor } from '../components'
import { TableToken } from '../components/RegenDefi/TableToken'
import { HOOK_OPTIONS } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'
import { Transactor } from '../helpers'

const { utils } = require('ethers')
const { Title } = Typography

const ReFi = () => {
  const { targetNetwork, mainnetProvider, address, userSigner, isLoadingAccount } = useContext(NetworkContext)
  const { contracts, USDPrices, writeContracts, polygonContracts } = useContext(WalletContext)
  /*  const contractTotalLiquidity = useContractReader(contracts, 'Dex', 'totalLiquidity', []) */

  /* const price = useExchangeEthPrice(targetNetwork, mainnetProvider)
   */
  /*  const gasPrice = useGasPrice(targetNetwork, 'fast')
  const tx = Transactor(userSigner, gasPrice) */

  return (
    <Row className="mb-md">
      <Row style={{ width: '100%' }}>
        <Title level={2}>Current Tokens</Title>
      </Row>
      {!address && isLoadingAccount ? (
        <Row style={{ flex: 1, minHeight: 200 }} justify="center" align="middle">
          <Spin />
        </Row>
      ) : Object.values(contracts).length > 0 ? (
        <TableToken USDPrices={USDPrices} contracts={contracts}></TableToken>
      ) : (
        <div>Is Empty</div>
      )}
    </Row>
  )
}

export default ReFi
