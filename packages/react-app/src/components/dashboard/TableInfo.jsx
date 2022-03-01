import { Image, Row, Table, Typography } from 'antd'
import styled from 'styled-components'

const { Text } = Typography
const StyledTable = styled(Table)`
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
`

export const TableInfo = () => {
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
  ]

  const data = [
    {
      key: '1',
      token: {
        title: 'Moss CO2 Token',
        icon: 'icon/moss.svg',
      },
      position: '$0.00',
      co2: '0.00',
      description: 'Moss Certified CO2 Token',
    },
    {
      key: '2',
      token: {
        title: 'Toucan CO2 Tokens',
        icon: 'icon/toucan.svg',
      },
      position: '$0.00',
      co2: '0.00',
      description: 'Toucan vera standard credits bridged to blockchain.',
    },
    {
      key: '3',
      token: {
        title: 'Koywe CO2 Tokens',
        icon: 'icon/koywe.svg',
      },
      position: '$0.00',
      co2: '0.00',
      description: 'Koywe certified CO2 Tokens.',
    },
  ]

  return <StyledTable columns={columns} dataSource={data} pagination={false} />
}
