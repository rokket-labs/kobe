import React from 'react'
import { List } from 'antd'

import { TokenBalance } from '../components'
import Address from '../components/common/Address'

const Ranking = ({ pledgeEvents, mainnetProvider, readContracts, polyContracts }) => {
  return (
    <div style={{ width: 500, margin: 'auto', marginTop: 64 }}>
      <div>Ranking:</div>
      <List
        dataSource={pledgeEvents}
        renderItem={item => {
          return (
            <List.Item key={item.blockNumber}>
              <Address value={item.args[0]} ensProvider={mainnetProvider} fontSize={16} />
              | <TokenBalance contracts={readContracts} name={'CO2TokenContract'} address={item.args[0]} /> CO2 tons
              emmitted | &nbsp;{(item.args[1].toString() * 1) / 10 ** 9} CO2e tons/year committed |{' '}
              <TokenBalance contracts={polyContracts} name={'PBCT'} address={item.args[0]} /> BCT |{' '}
              <TokenBalance contracts={polyContracts} name={'PMCO2'} address={item.args[0]} /> MCO2
            </List.Item>
          )
        }}
      />
    </div>
  )
}

export default Ranking
