import React from 'react'
import { Row, Table, Typography } from 'antd'
import { useContractLoader } from 'eth-hooks'
import styled from 'styled-components'

import Address from '../components/common/Address'
import CarbonFYI from '../components/common/CarbonFYI'

import { Balance, Pledge, TokenTotal } from './Balance'

import '../styles/ranking.css'

const { Text } = Typography

const StyledTable = styled(Table)`
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  background: #9ae6b4;
`

// eslint-disable-next-line max-lines-per-function
export const TableRanking = ({
  rankingData,
  USDPrices,
  polyProvider,
  contractConfig,
  mainnetProvider,
  readContracts,
  address,
  HOOK_OPTIONS,
}) => {
  const polyContracts = useContractLoader(polyProvider, contractConfig)

  const columns = [
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
      align: 'center',
      /*       render: iconProp => (
      <Row justify="center">{iconProp.icon && <Image src={iconProp.icon} preview={false} height={42} />}</Row>
    ), */
    },
    {
      title: 'Ranking',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      /*       sorter: (a, b) => a.key - b.key, */
      render: key => (
        <Row justify="center">
          <Text style={{ fontWeight: 'bold', fontSize: '24px' }}>{key + 1}</Text>
        </Row>
      ),
    },
    {
      title: 'Address/Profile',
      dataIndex: 'args',
      key: 'blockNumber',
      align: 'center',
      render: args => (
        <Row justify="space-around" align="middle">
          <Address value={args[0]} ensProvider={mainnetProvider} fontSize={16} />
        </Row>
      ),
    },
    {
      title: 'Pledge',
      dataIndex: 'args',
      key: 'blockNumber',
      align: 'center',
      render: args => (
        <Row justify="center" align="middle">
          <Pledge co2tons={args[1]} />
        </Row>
      ),
    },

    {
      title: 'Staked',
      dataIndex: 'args',
      key: 'blockNumber',
      align: 'center',
      render: args => (
        <Row justify="space-around" align="middle">
          {/* <TokenBalance contracts={polyContracts} name={'sKLIMA'} address={args[0]} /> */}
          <TokenTotal address={args[0]} tokenName="PBCT" contract={polyContracts} HOOK_OPTIONS={HOOK_OPTIONS} /> BCT
        </Row>
      ),
    },
    {
      title: 'Dripped',
      dataIndex: 'args',
      key: 'blockNumber',
      align: 'center',
      render: args => (
        <Row justify="space-around" align="middle">
          <TokenTotal
            contract={readContracts}
            tokenName="CO2TokenContract"
            address={args[0]}
            HOOK_OPTIONS={HOOK_OPTIONS}
          />{' '}
          CO2e tons dripped
        </Row>
      ),
    },
    /*     {
      title: 'Emmited',
      dataIndex: 'args',
      key: 'blockNumber',
      align: 'center',
      render: args => (
        <Row justify="space-around" align="middle">
          {console.log('testCallings')}
         <CarbonFYI currentAddress={args[0]} />
        </Row>
      ),
    }, */
    {
      title: 'Balance',
      dataIndex: 'args',
      key: 'blockNumber',
      align: 'center',
      render: args => (
        <Row justify="space-around" align="middle">
          <Balance address={args[0]} polyContracts={polyContracts} USDPrices={USDPrices} HOOK_OPTIONS={HOOK_OPTIONS} />
        </Row>
      ),
    },
  ]

  return (
    <StyledTable
      columns={columns}
      dataSource={rankingData}
      pagination={false}
      rowClassName={(record, index) => (record.args[0] === address ? 'ranking-color' : '')}
    />
  )
}
