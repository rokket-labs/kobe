import { useEffect, useRef, useState } from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'

import Navbar from '../Navbar'

const { Header, Content, Footer } = Layout

const StyledHeader = styled(Header)`
  position: absolute;
  z-index: 1;
  width: 100%;
  min-height: 6.25rem;
  padding: 0;

  @media only screen and (min-width: 633px) {
    position: fixed;
  }
`

const StyledContent = styled(Content)`
  padding: 0 3.125rem;
  min-height: 25rem;
  padding-top: ${({ nav }) => `${nav + 48}px`};
  background-color: #ffffff;
`

const GeneralLayout = ({
  children,
  NETWORKCHECK,
  localChainId,
  selectedChainId,
  targetNetwork,
  setSelectedNetwork,
  logoutOfWeb3Modal,
  USE_NETWORK_SELECTOR,
  USE_BURNER_WALLET,
  address,
  localProvider,
  userSigner,
  mainnetProvider,
  price,
  web3Modal,
  loadWeb3Modal,
  blockExplorer,
  yourLocalBalance,
}) => {
  const navbarRef = useRef(null)
  const [height, setHeight] = useState(100)

  useEffect(() => {
    if (navbarRef.current) {
      setHeight(navbarRef.current.offsetHeight)

      const handleWindowResize = () => setHeight(navbarRef.current?.offsetHeight ?? 164)

      window.addEventListener('resize', handleWindowResize)

      return () => window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <StyledHeader>
        <Navbar
          navbarRef={navbarRef}
          NETWORKCHECK={NETWORKCHECK}
          localChainId={localChainId}
          selectedChainId={selectedChainId}
          targetNetwork={targetNetwork}
          setSelectedNetwork={setSelectedNetwork}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
          USE_NETWORK_SELECTOR={USE_NETWORK_SELECTOR}
          useBurner={USE_BURNER_WALLET}
          address={address}
          localProvider={localProvider}
          userSigner={userSigner}
          mainnetProvider={mainnetProvider}
          price={price}
          web3Modal={web3Modal}
          loadWeb3Modal={loadWeb3Modal}
          blockExplorer={blockExplorer}
          yourLocalBalance={yourLocalBalance}
        />
      </StyledHeader>
      <StyledContent nav={height}>{children}</StyledContent>
      <Footer style={{ textAlign: 'center' }}>© Rokketlabs - 2022</Footer>
    </Layout>
  )
}

export default GeneralLayout
