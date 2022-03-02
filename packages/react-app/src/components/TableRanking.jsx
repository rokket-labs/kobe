import { Link } from 'react-router-dom'
import { Anchor, Image, Row, Table, Typography } from 'antd'
import styled from 'styled-components'

const { Text } = Typography

const StyledTable = styled(Table)`
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
`

const getData = data => {
  return data.data
}

export const TableRanking = ({ rankingData }) => {
  const columns = [
    {
      title: '',
      dataIndex: 'icon',
      key: 'icon',
      align: 'center',
      render: iconProp => (
        <Row justify="center">{iconProp.icon && <Image src={iconProp.icon} preview={false} height={42} />}</Row>
      ),
    },
    {
      title: 'Ranking',
      dataIndex: 'ranking',
      key: 'ranking',
      align: 'center',
      render: ranking => (
        <Row justify="center">
          <Text style={{ fontWeight: 'bold', fontSize: '24px' }}>{ranking}</Text>
        </Row>
      ),
    },
    {
      title: 'Address/Profile',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      render: user => (
        <Row justify="space-around" align="middle">
          <Link href={`/${user.name}`} passHref>
            <a>
              <Image src={user.icon} preview={false} height={42} />
            </a>
          </Link>
          <Text style={{ alignSelf: 'center', marginLeft: '10px' }}>{user.name}</Text>
          <Link href={`/${user.name}`} passHref>
            <a>
              <Image src="icon/leave.svg" preview={false} height={24} />
            </a>
          </Link>
        </Row>
      ),
    },
    {
      title: 'Pledge',
      dataIndex: 'pledge',
      key: 'pledge',
      align: 'center',
      render: pledge => (
        <Row justify="center" align="middle">
          <Text>{pledge.quantity}</Text>
        </Row>
      ),
    },
    {
      title: 'Staked',
      dataIndex: 'staked',
      key: 'staked',
      align: 'center',
    },
    {
      title: 'Dripped',
      dataIndex: 'dripped',
      key: 'dripped',
      align: 'center',
    },
    {
      title: 'Emmited',
      dataIndex: 'emmited',
      key: 'emmited',
      align: 'center',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      align: 'center',
    },
  ]
  const data = getData(rankingData)

  return <StyledTable columns={columns} dataSource={data} pagination={false} />
}
