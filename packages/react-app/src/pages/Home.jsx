import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Space } from 'antd'

import { CarbonFYI, GreenTokenTable, PositionChart } from '../components'
import { TreejerGraph } from '../components/common/TreejerGraph'

const Home = ({
  myPolyBCTBalance,
  myPolyNCTBalance,
  myPolyMCO2Balance,
  prices,
  address,
  tonsPledged,
  CO2TokenBalance,
  polyContracts,
  readContracts,
}) => {
  return (
    <div>
      <Space>
        <Card title="Your Fight" style={{ width: 400, textAlign: 'left' }}>
          <p>🌳 0 trees planted</p>
          <p>
            💨{' '}
            {(
              (myPolyBCTBalance && myPolyBCTBalance > 0 ? myPolyBCTBalance : 0) / Math.pow(10, 18) +
              (myPolyNCTBalance && myPolyNCTBalance > 0 ? myPolyNCTBalance : 0) / Math.pow(10, 18) +
              (myPolyMCO2Balance && myPolyMCO2Balance > 0 ? myPolyMCO2Balance : 0) / Math.pow(10, 18)
            ).toFixed(2)}
            CO2e tons secuestered
          </p>
          <h2>
            {(
              ((myPolyBCTBalance && myPolyBCTBalance > 0 ? myPolyBCTBalance : 0) / Math.pow(10, 18)) *
                (prices &&
                  prices['toucan-protocol-base-carbon-tonne'] &&
                  prices['toucan-protocol-base-carbon-tonne'].usd) +
              ((myPolyMCO2Balance && myPolyMCO2Balance > 0 ? myPolyMCO2Balance : 0) / Math.pow(10, 18)) *
                (prices && prices['moss-carbon-credit'] && prices['moss-carbon-credit'].usd)
            ).toFixed(2)}{' '}
            USD invested
          </h2>
        </Card>
        <Card title="Your Plight" style={{ width: 400, textAlign: 'right' }}>
          <p>
            🏭 {address && <CarbonFYI currentAddress={address} />} CO2e tons in{' '}
            <a href="https://carbon.fyi/" target="_blank" rel="noreferrer">
              transactions
            </a>
          </p>
          <p>
            {tonsPledged > 0
              ? `🩸 ${(CO2TokenBalance / Math.pow(10, 18)).toFixed(2)} CO2e tons dripped`
              : '🤐 Start dripping CO2 tokens.'}
          </p>
          <h2>
            {tonsPledged > 0
              ? `🤞 ${tonsPledged.toString()} CO2e tons/year pledged`
              : '🤐 Take the pledge to own your share of the problem.'}
          </h2>
        </Card>
      </Space>
      <PositionChart
        CO2TokenBalance={CO2TokenBalance}
        balances={[myPolyBCTBalance, myPolyMCO2Balance, myPolyNCTBalance]}
        tonsPledged={tonsPledged}
      />
      <h2>Your Regenerative Art</h2>
      {address ? <TreejerGraph address={address} /> : 'Loading'}
      <h2>Your ReFi Positions</h2>
      {address ? (
        <GreenTokenTable
          address={address}
          prices={prices}
          readContracts={polyContracts}
          localContracts={readContracts}
        />
      ) : (
        'Loading'
      )}
      <Link to="/refi">
        <Button size={'large'}>🌱 Put your money where your mouth is 🤑 Buy more! 🌱</Button>
      </Link>
    </div>
  )
}

export default Home
