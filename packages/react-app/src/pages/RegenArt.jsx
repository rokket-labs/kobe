import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Space, Typography } from 'antd'
import { useContractReader, useGasPrice } from 'eth-hooks'

import ConnectButton from '../components/common/ConnectButton'
import MyRegenArt from '../components/dashboard/MyRegenArt'
import KoyweTrees from '../components/RegenArt/KoyweTrees'
import NftCard from '../components/RegenArt/NftCard'
import { HOOK_OPTIONS } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'
import { Transactor } from '../helpers'
import { useTreejerGraph } from '../hooks/useTreejerGraph'

const { Title, Text } = Typography

const RegenArt = () => {
  const { address, targetNetwork, userSigner, isLoadingAccount } = useContext(NetworkContext)
  const { contracts, writeContracts, yourKTBalance } = useContext(WalletContext)
  const [isBCTAmountApproved, setIsBCTAmountApproved] = useState()
  const [buying, setBuying] = useState()
  const [approving, setApproving] = useState()
  const { collection: artGallery, isLoading } = useTreejerGraph(address)
  const treeAddress = contracts?.KoyweCollectibles?.address

  const mintPrice = useContractReader(contracts, 'KoyweCollectibles', 'bctPrice', HOOK_OPTIONS)
  const isOpen = useContractReader(contracts, 'KoyweCollectibles', 'mintOpen', HOOK_OPTIONS)

  const vendorApproval = useContractReader(contracts, 'PBCT', 'allowance', [address, treeAddress], HOOK_OPTIONS)

  const gasPrice = useGasPrice(targetNetwork, 'fast')
  const tx = Transactor(userSigner, gasPrice)

  const handleApproveBCT = async () => {
    setApproving(true)
    await tx(writeContracts.PBCT.approve(contracts.KoyweCollectibles.address, mintPrice))
    setApproving(false)
  }

  const handleMint = async () => {
    setBuying(true)
    await tx(writeContracts.KoyweCollectibles.mintItem())
    setBuying(false)
  }

  useEffect(() => {
    if (vendorApproval && mintPrice) setIsBCTAmountApproved(vendorApproval.gte(mintPrice))
  }, [mintPrice, vendorApproval])

  return (
    <Row className="flex-center">
      <Col span={20}>
        <Space direction="vertical" style={{ marginBottom: '1rem', marginTop: '1rem', width: '100%' }}>
          <Title>NFT Collections</Title>
          <Text>Choose your favorite collection and buy it from here</Text>
          <Space direction="vertical" style={{ marginTop: '1rem', width: '100%' }}>
            <NftCard
              title="Koywe Trees"
              mintPrice={mintPrice}
              address={address}
              isBCTAmountApproved={isBCTAmountApproved}
              buying={buying}
              handleApproveBCT={handleApproveBCT}
              handleMint={handleMint}
              approving={approving}
            />
          </Space>
          {address && (
            <>
              <h2 style={{ padding: 8, marginTop: 32 }}>Koywe Trees</h2>
              <KoyweTrees address={address} yourKTBalance={yourKTBalance} contracts={contracts} />
            </>
          )}
          {address && (
            <>
              <h2 style={{ padding: 8, marginTop: 32 }}>Treejer Trees</h2>
              <p>
                Also, check out your Treejer collection.{' '}
                <a href="https://treejer.com/" target="_blank">
                  You cant mint (more) trees here↗️
                </a>
              </p>
              {!isLoadingAccount && address && <MyRegenArt artGallery={artGallery} isLoading={isLoading} />}
            </>
          )}
        </Space>
      </Col>
      {isLoadingAccount && !address && <ConnectButton />}
    </Row>
  )
}

export default RegenArt
