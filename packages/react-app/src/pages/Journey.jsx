import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Steps } from 'antd'

const { Step } = Steps
const Journey = ({ dripBalance }) => {
  return (
    <>
      <h1 style={{ padding: 8, marginTop: 32 }}>
        🌱🌿🪴🌳 Our Journey starts <b>here</b>🌳🪴🌿🌱
      </h1>
      {dripBalance}
      <h1 style={{ padding: 8, marginTop: 32 }}>You are not alone</h1>
      <h2>We are a Forest, the Koywe Forest</h2>
      <p>A group of committed individuals taking action, TODAY.</p>
      <p>
        Because words without actions are just wind, let&apos;s explore actionable steps to fight climate change,
        together...
      </p>
      <p>Start by investing in sustainable web3 projects.</p>
      <Link to="/refi">
        <Button size={'large'}>🌱 Put your money where your mouth is 🤑 Buy more! 🌱</Button>
      </Link>

      <Steps size="small" current={2}>
        <Step title="Pledge" />
        <Step title="Forest" />
      </Steps>
    </>
  )
}

export default Journey
