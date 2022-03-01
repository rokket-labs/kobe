import React, { useContext, useEffect } from 'react'
import { Col, Row, Typography } from 'antd'

import { WalletContext } from '../../contexts/WalletContext'
import { createTableData } from '../../helpers/createTableData'
import { StyledButton } from '../common/StyledButton'

import { TableInfo } from './TableInfo'

const { Title } = Typography
const MyRegenPositions = () => {
  const { USDPrices, walletBalance } = useContext(WalletContext)
  const { polygonBCTBalance: BTC, polygonMCO2Balance: MCO2, polygonNCTBalance: NCT } = walletBalance
  const [tableData, setTableData] = React.useState([])

  useEffect(() => {
    if (USDPrices && BTC && MCO2 && NCT) {
      const tableData = createTableData(USDPrices, BTC, MCO2, NCT)

      setTableData(tableData)
    }
  }, [USDPrices, BTC, MCO2, NCT])

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Your regen positions</Title>
          <TableInfo data={tableData} />
        </Col>
      </Row>
      <Row justify="center" className="my-md">
        <StyledButton $type="primary">See all my tokens</StyledButton>
      </Row>
    </>
  )
}

export default MyRegenPositions
