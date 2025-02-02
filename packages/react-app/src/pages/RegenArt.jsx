/* eslint-disable max-lines-per-function */
import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Space, Typography } from 'antd'
import { useContractReader, useGasPrice } from 'eth-hooks'

import ConnectButton from '../components/common/ConnectButton'
import MyRegenArt from '../components/dashboard/MyRegenArt'
import EntTrees from '../components/RegenArt/EntTrees'
import KoyweTrees from '../components/RegenArt/KoyweTrees'
import NftCard from '../components/RegenArt/NftCard'
import NftCardEnt from '../components/RegenArt/NftCardEnt'
import { HOOK_OPTIONS } from '../constants'
import { NetworkContext } from '../contexts/NetworkContext'
import { WalletContext } from '../contexts/WalletContext'
import { Transactor } from '../helpers'
import { useTreejerGraph } from '../hooks/useTreejerGraph'

const { Title, Text } = Typography

const RegenArt = () => {
  const { address, targetNetwork, userSigner, isLoadingAccount } = useContext(NetworkContext)
  const { contracts, writeContracts, yourKTBalance, yourETBalance } = useContext(WalletContext)
  const [isBCTAmountApproved, setIsBCTAmountApproved] = useState()
  const [buying, setBuying] = useState()
  const [buyingEnt, setBuyingEnt] = useState()
  const [approving, setApproving] = useState()
  const { collection: artGallery, isLoading } = useTreejerGraph(address)
  const treeAddress = contracts?.KoyweCollectibles?.address

  console.log('contracts',contracts)

  const mintPrice = useContractReader(contracts, 'KoyweCollectibles', 'bctPrice', HOOK_OPTIONS)
  const isOpen = useContractReader(contracts, 'KoyweCollectibles', 'mintOpen', HOOK_OPTIONS)

  const mintPriceEnt = useContractReader(contracts, 'ENT', 'mintPrice', HOOK_OPTIONS)
  const isEntOpen = useContractReader(contracts, 'ENT', 'saleIsActive', HOOK_OPTIONS)

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

  const handleMintEnt = async () => {
    setBuyingEnt(true)
    await tx(writeContracts.ENT.discoverEnt({ value: mintPriceEnt }))
    setBuyingEnt(false)
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
          <Space direction="vertical" style={{ marginTop: '1rem', width: '100%' }}>
            <NftCardEnt
              title="Endangered Tokens"
              mintPrice={mintPriceEnt}
              address={address}
              buyingEnt={buyingEnt}
              handleMintEnt={handleMintEnt}
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
              <h2 style={{ padding: 8, marginTop: 32 }}>Endangered Keule Trees, by Ent Foundation</h2>
              <p>
                Also, check out your ENT collection.{' '}
                <a href="https://elders.tokents.org/" target="_blank">
                  If the list is empty or you want to get more, go here↗️
                </a>
                <br />This is very special project to protect endangered Keule trees in Chile. There will only be 25 NFTs, each of which represents a unique individual, ensuring its protection for a long time. Become a Keule Guardian.
              </p>
              <EntTrees address={'address'} yourETBalance={yourETBalance} contracts={contracts} />
            </>
          )}
          {address && (
            <>
              <h2 style={{ padding: 8, marginTop: 32 }}>Treejer Trees</h2>
              <p>
                Also, check out your Treejer collection.{' '}
                <a href="https://treejer.com/" target="_blank">
                  If the list is empty or you want to get more, go here↗️
                </a>
                <br />Treejer is an open protocol to fund trees around the world, initially in Perú and Argentina.
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
