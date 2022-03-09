import { Image, Row, Table, Typography } from 'antd'
import styled from 'styled-components'

import { StyledButton } from '../buttons/StyledButton'

const { Text } = Typography
const StyledTable = styled(Table)`
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  overflow: hidden;
  width: 100;
`

export const TableInfo = ({ data }) => {
  const columns = [
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
      render: tokenProp => (
        <Row justify="space-between" align="middle">
          <Text>{tokenProp.title}</Text>
          <Image src={tokenProp.icon} preview={false} height={42} />
        </Row>
      ),
    },
    {
      title: 'Position (USD)',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'CO2 value (tons)',
      dataIndex: 'co2',
      key: 'co2',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Value (USD)',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Buy token',
      dataIndex: 'buy',
      key: 'buy',
      render: () => <StyledButton $type="primary">Buy token</StyledButton>,
    },
  ]

  return <>{data.length > 0 && <StyledTable columns={columns} dataSource={data} pagination={false} />}</>
}
