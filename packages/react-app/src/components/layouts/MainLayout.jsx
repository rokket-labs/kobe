import { AnimateSharedLayout } from 'framer-motion'

import GeneralLayout from './GeneralLayout'

export const MainLayout = ({
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
  return (
    <AnimateSharedLayout>
      <GeneralLayout
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
      >
        {children}
      </GeneralLayout>
    </AnimateSharedLayout>
  )
}
