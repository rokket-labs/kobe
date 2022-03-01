import React, { useContext } from 'react'
import { List } from 'antd'
import { useEventListener } from 'eth-hooks/events/useEventListener'

import { TokenBalance } from '../components'
import Address from '../components/common/Address'
import { HOOK_OPTIONS } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'

const Ranking = () => {
  const { mainnetProvider } = useContext(NetworkContext)
  const { contracts, polygonContracts, localProvider } = useContext(WalletContext)

  const pledgeEvents = useEventListener(contracts, 'KoywePledge', 'NewPledge', localProvider, 1, HOOK_OPTIONS)

  return (
    <div style={{ width: 500, margin: 'auto', marginTop: 64 }}>
      <div>Ranking:</div>
      <List
        dataSource={pledgeEvents}
        renderItem={item => {
          return (
            <List.Item key={item.blockNumber}>
              <Address value={item.args[0]} ensProvider={mainnetProvider} fontSize={16} />
              | <TokenBalance contracts={contracts} name={'CO2TokenContract'} address={item.args[0]} /> CO2 tons
              emmitted | &nbsp;{(item.args[1].toString() * 1) / 10 ** 9} CO2e tons/year committed |{' '}
              <TokenBalance contracts={polygonContracts} name={'PBCT'} address={item.args[0]} /> BCT |{' '}
              <TokenBalance contracts={polygonContracts} name={'PMCO2'} address={item.args[0]} /> MCO2
            </List.Item>
          )
        }}
      />
    </div>
  )
}

export default Ranking
