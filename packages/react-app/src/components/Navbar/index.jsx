import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Menu, Row } from 'antd'
import styled from 'styled-components'

import { WalletContext } from '../../contexts/WalletContext'

import Balance from './Balance'
import KoyweSubMenu from './KoyweSubMenu'
import NetworkSelect from './NetworkSelect'
import Wallet from './Wallet'

const Logo = styled.div`
  float: left;
  width: 8.463rem;
  height: 5.625rem;
  margin: 0.313rem 0 0.313rem 0;
  background: url(${({ url }) => url});
`

const Index = ({ navbarRef, NETWORKCHECK }) => {
  const router = useHistory()
  const [path, setPath] = useState(router.pathname)
  const { pledged } = useContext(WalletContext)

  useEffect(() => {
    setPath(router.pathname)
  }, [router.pathname])

  const handleMenu = url => {
    router.push(url)
  }

  return (
    <Row ref={navbarRef} className="menu-row" justify="space-between">
      <Col>
        <Logo url="/icon/logo.svg" />
      </Col>
      <Col style={{ display: 'flex' }}>
        <Menu mode="horizontal" defaultSelectedKeys={[path]} selectedKeys={[path]} disabledOverflow className="menu">
          <Menu.Item className="menu-item" key="/dashboard" onClick={() => handleMenu('/')}>
            Dashboard
          </Menu.Item>
          <Menu.Item className="menu-item" key="/regen-art" onClick={() => handleMenu('/regen-art')}>
            Regen art
          </Menu.Item>
          <Menu.Item className="menu-item" key="/defi" onClick={() => handleMenu('/refi')}>
            Regen defi
          </Menu.Item>
        </Menu>
      </Col>
      <Col className="menu-data">
        <Row gutter={10} justify="center">
          <Col>
            <NetworkSelect NETWORKCHECK={NETWORKCHECK} />
          </Col>
          <Col>
            <Balance />
          </Col>
          <Col>
            <Wallet isPlant={pledged} />
          </Col>
        </Row>
      </Col>
      <Col style={{ display: 'flex' }}>
        <KoyweSubMenu path={path} handleMenu={handleMenu} />
      </Col>
    </Row>
  )
}

export default Index
