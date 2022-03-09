import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Image, Row, Table, Typography } from 'antd'
import { useContractLoader, useContractReader } from 'eth-hooks'
import { useEventListener } from 'eth-hooks/events/useEventListener'
import styled from 'styled-components'

import { TokenBalance } from '../components'
import Address from '../components/common/Address'
import { HOOK_OPTIONS, NETWORKS } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'

import { Balance, Dripped, Emmited, Pledge } from './balance'

const { ethers } = require('ethers')

const { Text } = Typography

const StyledTable = styled(Table)`
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
`

const getData = data => {
  return data
}

// eslint-disable-next-line max-lines-per-function
export const TableRanking = ({ rankingData }) => {
  const { contractConfig, contracts, walletBalance } = useContext(WalletContext)
  const { mainnetProvider, address, localProvider } = useContext(NetworkContext)

  const polyNetwork = NETWORKS.polygon

  const polyProviderUrl = polyNetwork.rpcUrl
  const polyProvider = new ethers.providers.StaticJsonRpcProvider(polyProviderUrl)

  const polyContracts = useContractLoader(polyProvider, contractConfig)
  const readContracts = useContractLoader(localProvider, contractConfig)
  /*
  const pledgeEvents = useEventListener(readContracts, 'KoywePledge', 'NewPledge', localProvider, 1, HOOK_OPTIONS)

  const CO2TokenBalance = useContractReader(readContracts, 'CO2TokenContract', 'balanceOf', [address], HOOK_OPTIONS)

   const testBlanace = Balance('0x40f9bf922c23c43acdad71Ab4425280C0ffBD697')

  console.log('testBlanace', testBlanace) */

  /*   const vendorTokenBalance = useContractReader(
    readContracts,
    'PMCO2',
    'balanceOf',
    ['0x2760A7AC4ca336FB4B92a7225eEb0998c371580F'],
    HOOK_OPTIONS,
  )

  // const fullBalance = Balance('0x52694167465aBAD66B9E4ED9d5e0Dfd29aB75fa4', polyContracts)

  const pledged =
    useContractReader(
      contracts,
      'KoywePledge',
      'getCommitment',
      ['0x2760A7AC4ca336FB4B92a7225eEb0998c371580F'],
      HOOK_OPTIONS,
    ) /
    10 ** 9 */

  // console.log('walletBalance', vendorTokenBalance)

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
      dataIndex: 'blockNumber',
      key: 'blockNumber',
      align: 'center',
      render: blockNumber => (
        <Row justify="center">
          <Text style={{ fontWeight: 'bold', fontSize: '24px' }}>{blockNumber}</Text>
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

    /*     {
      title: 'Staked',
      dataIndex: 'args',
      key: 'blockNumber',
      align: 'center',
      render: args => (
        <Row justify="space-around" align="middle">
          <TokenBalance contracts={readContracts} name={'PMCO2'} address={args[0]} />
        </Row>
      ),
    }, */
    {
      title: 'Dripped',
      dataIndex: 'args',
      key: 'blockNumber',
      align: 'center',
      render: args => (
        <Row justify="space-around" align="middle">
          <Dripped contracts={readContracts} name={'CO2TokenContract'} address={args[0]} />
        </Row>
      ),
    },
    {
      title: 'Emmited',
      dataIndex: 'args',
      key: 'blockNumber',
      align: 'center',
      render: args => (
        <Row justify="space-around" align="middle">
          <Emmited contracts={readContracts} name={'CO2TokenContract'} address={args[0]} />
        </Row>
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'args',
      key: 'blockNumber',
      align: 'center',
      render: args => (
        <Row justify="space-around" align="middle">
          <Balance address={args[0]} />
        </Row>
      ),
    },
  ]
  const data = getData(rankingData)

  return <StyledTable columns={columns} dataSource={data} pagination={false} />
}
