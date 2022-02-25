import React from 'react'
import { Alert, Select } from 'antd'
import styled from 'styled-components'

import { NETWORKS } from '../../constants'
import { checkNetwork } from '../../helpers/checkNetwork'

const { Option } = Select
const networkOptions = [NETWORKS.polygon.name, 'mainnet', 'rinkeby']

const StyledSelect = styled(Select)`
  min-width: 7.5rem;
  width: 100%;
  margin-top: 0.188rem;
  text-transform: capitalize;
`
const NetworkSelect = ({ NETWORKCHECK, localChainId, selectedChainId, targetNetwork, setSelectedNetwork }) => {
  const networkError = checkNetwork(localChainId, selectedChainId, targetNetwork)

  return (
    <div style={{ position: 'relative', textAlign: 'right' }}>
      <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
        <div style={{ marginRight: 20 }}>
          <StyledSelect defaultValue={targetNetwork.name} onChange={value => setSelectedNetwork(value)}>
            {networkOptions.map(network => (
              <Option key={network} value={network}>
                {network}
              </Option>
            ))}
          </StyledSelect>
        </div>
      </div>
      {networkError && NETWORKCHECK && (
        <div style={{ zIndex: 2, position: 'absolute', right: 0, top: 60, padding: 16 }}>
          <Alert
            message={networkError.message}
            description={networkError.description}
            type="error"
            closable={false}
            style={{ width: 250, textAlign: 'center' }}
          />
        </div>
      )}
    </div>
  )
}

export default NetworkSelect
