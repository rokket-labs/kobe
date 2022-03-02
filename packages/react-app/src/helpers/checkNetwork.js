import { Button } from 'antd'

import { NETWORK } from '../constants'

export const checkNetwork = (localChainId, selectedChainId, targetNetwork) => {
  if (localChainId && selectedChainId && localChainId !== selectedChainId) {
    const networkSelected = NETWORK(selectedChainId)
    const networkLocal = NETWORK(localChainId)

    if (selectedChainId === 1337 && localChainId === 31337)
      return {
        message: '⚠️ Wrong Network ID',
        description: `You have chain id 1337 for localhost and you need to change it to 31337 to work with HardHat. 
              (MetaMask -&gt; Settings -&gt; Networks -&gt; Chain ID -&gt; 31337)`,
      }
    else
      return {
        message: '⚠️ Wrong Network ID',
        description: (
          <div>
            You have <b>{networkSelected && networkSelected.name}</b> selected and you need to be on{' '}
            <Button
              onClick={async () => {
                const { ethereum } = window
                const data = [
                  {
                    chainId: `0x${targetNetwork.chainId.toString(16)}`,
                    chainName: targetNetwork.name,
                    nativeCurrency: targetNetwork.nativeCurrency,
                    rpcUrls: [targetNetwork.rpcUrl],
                    blockExplorerUrls: [targetNetwork.blockExplorer],
                  },
                ]

                // https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
                try {
                  await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: data[0].chainId }],
                  })
                } catch (switchError) {
                  // not checking specific error code, because maybe we're not using MetaMask
                  try {
                    await ethereum.request({
                      method: 'wallet_addEthereumChain',
                      params: data,
                    })
                  } catch (addError) {
                    // handle "add" error
                  }
                }
              }}
            >
              <b>{networkLocal && networkLocal.name}</b>
            </Button>
          </div>
        ),
      }
  } else return false
}
