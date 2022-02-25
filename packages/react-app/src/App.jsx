/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React, { useContext, useEffect, useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Button, Card, Input } from 'antd'
import { useContractLoader, useContractReader, useGasPrice, useOnBlock } from 'eth-hooks'
import { useExchangeEthPrice } from 'eth-hooks/dapps/dex'
import { useEventListener } from 'eth-hooks/events/useEventListener'

import { MainLayout } from './components/layouts/MainLayout'
import { NetworkContext } from './contexts/NetworkContext'
import externalContracts from './contracts/external_contracts'
import deployedContracts from './contracts/hardhat_contracts.json'
import DebugPage from './pages/DebugPage'
import Home from './pages/Home'
import Journey from './pages/Journey'
import Pledge from './pages/Pledge'
import Ranking from './pages/Ranking'
import ReFi from './pages/ReFi'
import RegenArt from './pages/RegenArt'
import { TokenBalance } from './components'
import { HOOK_OPTIONS, NETWORKS } from './constants'
import { Transactor } from './helpers'
import { useStaticJsonRPC } from './hooks'

import 'antd/dist/antd.css'
import './styles/index.css'

const { ethers } = require('ethers')

const polyNetwork = NETWORKS.polygon

const App = () => {
  const { address, localChainId, targetNetwork, mainnetProvider, userSigner } = useContext(NetworkContext)
  const [prices, setPrices] = useState(null)

  // load all your providers
  const localProvider = useStaticJsonRPC([
    process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : targetNetwork.rpcUrl,
  ])

  // Provider for Polygon Network
  const polyProviderUrl = polyNetwork.rpcUrl
  const polyProvider = new ethers.providers.StaticJsonRpcProvider(polyProviderUrl)

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangeEthPrice(targetNetwork, mainnetProvider)

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, 'fast')

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userSigner, gasPrice)

  // const contractConfig = useContractConfig();

  const contractConfig = { deployedContracts: deployedContracts || {}, externalContracts: externalContracts || {} }

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractConfig)

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, contractConfig, localChainId)

  // EXTERNAL CONTRACT EXAMPLE:
  //
  // If you want to bring in the mainnet DAI contract it would look like:
  const polyContracts = useContractLoader(polyProvider, contractConfig)

  // If you want to call a function on a new block
  useOnBlock(mainnetProvider, () => {
    console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`)
  })

  // Polybalances
  const myPolyMCO2Balance = useContractReader(polyContracts, 'PMCO2', 'balanceOf', [address], HOOK_OPTIONS)

  const myPolyBCTBalance = useContractReader(polyContracts, 'PBCT', 'balanceOf', [address], HOOK_OPTIONS)

  const myPolyNCTBalance = useContractReader(polyContracts, 'NCT', 'balanceOf', [address], HOOK_OPTIONS)

  /*   // keep track of contract balance to know how much has been staked total:
  const kpledgeContractBalance = useBalance(
    localProvider,
    readContracts && readContracts.KoywePledge ? readContracts.KoywePledge.address : null,
    HOOK_OPTIONS,
  ) */

  // ** keep track of a variable from the contract in the local React state:
  const pledged = useContractReader(readContracts, 'KoywePledge', 'isPledged', [address], HOOK_OPTIONS)

  console.log('💸 pledged:', pledged)

  // ** keep track of a variable from the contract in the local React state:
  const tonsPledged =
    useContractReader(readContracts, 'KoywePledge', 'getCommitment', [address], HOOK_OPTIONS) / 10 ** 9

  console.log('💸 tons pledged:', tonsPledged ? tonsPledged.toString() : '...')

  // ** 📟 Listen for broadcast events
  const pledgeEvents = useEventListener(readContracts, 'KoywePledge', 'NewPledge', localProvider, 1, HOOK_OPTIONS)

  console.log('📟 pledge events:', pledgeEvents)

  const CO2TokenBalance = useContractReader(readContracts, 'CO2TokenContract', 'balanceOf', [address], HOOK_OPTIONS)

  console.log('🏵 CO2TokenBalance:', CO2TokenBalance ? ethers.utils.formatEther(CO2TokenBalance) : '...')

  const [tonsCommitted, setTonsCommitted] = useState()
  const [pledging, setPledging] = useState()
  const [dripping, setDripping] = useState()

  let pledgeDisplay = ''

  if (pledged)
    pledgeDisplay = (
      <div style={{ padding: 64, backgroundColor: '#eeffef', fontWeight: 'bolder' }}>
        🌳🌳 - You have pledged to save the planet, you&apos;re now a part of the Koywe forest - 🌳🌳
        <p>Move on to step 3: the Forest</p>
      </div>
    )

  let pledgeButton = (
    <div style={{ padding: 8, marginTop: 32, width: 300, margin: 'auto' }}>
      <Input
        style={{ textAlign: 'center' }}
        placeholder={'annual CO2e tons committed'}
        value={tonsCommitted}
        onChange={e => {
          setTonsCommitted(e.target.value)
        }}
      />
      <Button
        type={pledged ? 'success' : 'primary'}
        size={'large'}
        loading={pledging}
        onClick={async () => {
          setPledging(true)
          await tx(writeContracts.KoywePledge.newPledge(tonsCommitted * 10 ** 9))
          setPledging(false)
        }}
      >
        🌱 Pledge On-Chain 🌱
      </Button>
    </div>
  )

  if (pledged)
    pledgeButton = (
      <div>
        <p>You are now a part of something bigger: a forest.</p>
        <Link to="/journey">
          <Button size={'large'}>🌱 Grow the Forest 🌱</Button>
        </Link>
      </div>
    )

  /*   const millisToDate = function(milliseconds) {
    const date = new Date(milliseconds)

    return date.toString()
  } */

  let dripBalance = ''

  if (pledged)
    if (CO2TokenBalance === 0)
      dripBalance = (
        <Button
          type={CO2TokenBalance > 0 ? 'success' : 'primary'}
          size={'large'}
          loading={dripping}
          onClick={async () => {
            setDripping(true)
            await tx(writeContracts.CO2TokenContract.startDripping(address))
            setDripping(false)
          }}
        >
          💧 Start Dripping your CO2e 💧
        </Button>
      )
    else
      dripBalance = (
        <div style={{ padding: 8, marginTop: 32, width: 300, margin: 'auto' }}>
          <Card title="🔥 Your CO2e Tons🔥">
            <div style={{ padding: 8 }}>
              <TokenBalance balance={CO2TokenBalance} fontSize={64} /> CO2e Tons emitted since pledging; the share of
              the problem you own
            </div>
          </Card>
        </div>
      )

  // read prices from coingecko
  useEffect(() => {
    // we will use async/await to fetch this data
    const getData = async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=toucan-protocol-base-carbon-tonne,moss-carbon-credit,klima-dao,staked-klima&vs_currencies=usd',
      )
      const data = await response.json()

      // store the data into our prices variable
      setPrices(data)
    }

    getData()
  }, [])

  return (
    <MainLayout price={price}>
      <Switch>
        <Route exact path="/">
          <Home
            myPolyBCTBalance={myPolyBCTBalance}
            myPolyNCTBalance={myPolyNCTBalance}
            myPolyMCO2Balance={myPolyMCO2Balance}
            prices={prices}
            address={address}
            tonsPledged={tonsPledged}
            CO2TokenBalance={CO2TokenBalance}
            polyContracts={polyContracts}
            readContracts={readContracts}
          />
        </Route>
        <Route exact path="/ranking">
          <Ranking
            pledgeEvents={pledgeEvents}
            mainnetProvider={mainnetProvider}
            readContracts={readContracts}
            polyContracts={polyContracts}
          />
        </Route>
        <Route exact path="/rart">
          <RegenArt />
        </Route>
        <Route exact path="/pledge">
          <Pledge
            pledgeDisplay={pledgeDisplay}
            tonsPledged={tonsPledged}
            tonsCommitted={tonsCommitted}
            pledgeButton={pledgeButton}
          />
        </Route>
        <Route exact path="/journey">
          <Journey dripBalance={dripBalance} />
        </Route>
        <Route path="/refi">
          <ReFi
            readContracts={readContracts}
            writeContracts={writeContracts}
            polyContracts={polyContracts}
            tx={tx}
            price={price}
          />
        </Route>
        <Route exact path="/debug">
          <DebugPage />
        </Route>
      </Switch>
    </MainLayout>
  )
}

export default App
