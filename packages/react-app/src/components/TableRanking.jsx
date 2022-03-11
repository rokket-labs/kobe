import React, { useContext, useState } from 'react'
import { Row, Table, Typography } from 'antd'
import { useContractLoader, useContractReader } from 'eth-hooks'
import styled from 'styled-components'

import { TokenBalance } from '../components'
import Address from '../components/common/Address'
import CarbonFYI from '../components/common/CarbonFYI'
import { HOOK_OPTIONS, NETWORKS } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'

import { Balance, Pledge, Staked, TokenTotal } from './Balance'

import '../styles/ranking.css'

const { ethers } = require('ethers')

const { Text } = Typography

const StyledTable = styled(Table)`
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  background: #9ae6b4;
`

const getData = data => {
  return data
}

// eslint-disable-next-line max-lines-per-function
export const TableRanking = ({ rankingData, USDPrices, mainnetProvider, readContracts, polyContracts, address }) => {
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
          {/*           <Link to={`/${address}`}>
            <a>
              <Image src={address.icon} preview={false} height={42} />
            </a>
          </Link>
          <Text style={{ alignSelf: 'center', marginLeft: '10px' }}>{address}</Text>
          <Link to={`/${address}`}>
            <a>
              <Image src="icon/leave.svg" preview={false} height={24} />
            </a>
          </Link>{' '} */}
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
          <Staked address={args[0]} polyContracts={polyContracts} /> BCT
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
          <TokenTotal readContracts={readContracts} address={args[0]} />
        </Row>
      ),
    },
    {
      title: 'Emmited',
      dataIndex: 'args',
      key: 'blockNumber',
      align: 'center',
      render: args => <Row justify="space-around" align="middle"></Row>,
    },
    {
      title: 'Balance',
      dataIndex: 'args',
      key: 'blockNumber',
      align: 'center',
      render: args => (
        <Row justify="space-around" align="middle">
          <Balance address={args[0]} polyContracts={polyContracts} USDPrices={USDPrices} />
        </Row>
      ),
    },
  ]
  const data = getData(rankingData)

  return (
    <StyledTable
      columns={columns}
      dataSource={data}
      pagination={false}
      rowClassName={(record, index) => (record.args[0] === address ? 'ranking-color' : '')}
    />
  )
}
