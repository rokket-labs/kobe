import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Row, Spin, Typography } from 'antd'

import { StyledButton } from '../components/buttons/StyledButton'
import { TableInfo } from '../components/RegenDefi/TableInfo'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'
import { createTableData } from '../helpers/createTableData'

const { Title } = Typography

// import { useContractReader, useGasPrice } from 'eth-hooks'
// import { useExchangeEthPrice } from 'eth-hooks/dapps/dex'

// import { BCTVendor } from '../components'
// import { TableToken } from '../components/RegenDefi/TableToken'
// import { HOOK_OPTIONS } from '../constants'

// import { Transactor } from '../helpers'

const ReFi = () => {
  const { address, isLoadingAccount } = useContext(NetworkContext)

  const [showAll, setShowAll] = useState(false)
  const { USDPrices, walletBalance } = useContext(WalletContext)

  const {
    polygonBCTBalance: BTC,
    polygonMCO2Balance: MCO2,
    polygonNCTBalance: NCT,
    polygonKlimaBalance: KLIMA,
    polygonSKlimaBalance: sKLIMA,
  } = walletBalance
  const [tableData, setTableData] = React.useState([])

  useEffect(() => {
    if (USDPrices && BTC && MCO2 && NCT && KLIMA && sKLIMA) {
      const tableData = createTableData(USDPrices, BTC, MCO2, NCT, KLIMA, sKLIMA)

      setTableData(tableData)
    }
  }, [USDPrices, BTC, MCO2, NCT, KLIMA, sKLIMA])

  return (
    <>
      <Row className="mb-md" width="100%" span={24}>
        {!address && isLoadingAccount ? (
          <Row style={{ flex: 1, minHeight: 200 }} justify="center" align="middle">
            <Spin />
          </Row>
        ) : (
          <Row style={{ width: '100%' }}>
            <Col span={24}>
              <Row>
                <Col span={24}>
                  <Title level={2}>Your regen positions</Title>
                  <TableInfo data={showAll ? tableData : tableData.slice(0, 3)} />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row justify="center" className="my-md" style={{ width: '100%' }}>
                <Col span={24}>
                  <StyledButton $type="primary" onClick={() => setShowAll(showAll => !showAll)}>
                    {!showAll ? 'See all my tokens' : 'Hidden my tokens'}
                  </StyledButton>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Row>
      {tableData.length === 0 && (
        <Row style={{ flex: 1, minHeight: 200 }} justify="center" align="middle">
          <Card size="small" title="Without connection" justify="center">
            <p>Please connect your wallet to see the tokens</p>
          </Card>
        </Row>
      )}
    </>
  )
}

export default ReFi
