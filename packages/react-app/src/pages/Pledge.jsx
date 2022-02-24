import React from 'react'
import { Divider, Steps } from 'antd'

const { Step } = Steps

const Pledge = ({ pledgeDisplay, tonsPledged, tonsCommitted, pledgeButton }) => {
  return (
    <>
      {pledgeDisplay}
      <div>
        <div style={{ width: 500, margin: 'auto' }}>
          <h1 style={{ padding: 8, marginTop: 32 }}>First... The Pledge</h1>
          <p>
            This pledge is nothing more than a public commitment to do better. To be in charge of our emissions. To take
            ownership of a part of the effort.
          </p>
          <p>It doesn&apos;t need to be exact, but it does need to come from the heart.</p>
          <p>There are 60 gigatons of CO2e emitted every year.</p>
          <p>
            We ask you to make a commitment, just like our nation&apos;s leaders do, of annual CO2 tons that we will
            contribute to bring to zero (0).
          </p>
          <Divider />
          <p>🌎 🌍 I hereby pledge to do my best to save the planet.</p>
          <p>
            🏬 🍔 I pledge to do my best to reduce emissions, by consuming less or by being more conscious about my
            decisions.
          </p>
          <p>👭 👬 I pledge to help others in their paths to help the planet.</p>
          <p>🤑 ⌛ I pledge to contribute, with money or time as long as I am able, to other people in my community.</p>
          <p>
            📝 🪧 I pledge to reduce or offset {tonsPledged > 0 ? tonsPledged.toString() : tonsCommitted} CO2e tons per
            year.
          </p>
          <h2>
            🌳 🌳 I pledge to grow a Forest, to be a Forest with my community, to take small, steady, and concrete steps
            to protect and help everyone adapt to the stormy weather 🌳 🌳
          </h2>
        </div>
        {pledgeButton}

        <Steps size="small" current={0}>
          <Step title="Pledge" />
          <Step title="Forest" />
        </Steps>
      </div>
    </>
  )
}

export default Pledge
