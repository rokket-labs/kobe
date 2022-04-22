/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Card, Input, Modal, Row, Tooltip } from 'antd'
import { useContractReader } from 'eth-hooks'

import { StyledButton } from '../common/StyledButton'

const { utils } = require('ethers')

export default function BuySetModal({ writeContracts, contracts, tx, modalUp, handleModalDown, setName, address, set, gasPrice }) {
  const tokenTexts = {
    'Buy CNBED' : ['CNBED','Our first index, Carbon Negative BED combines the main names in crypto (BTC, ETH, and DeFi Pulse) with the best carbon token: NCT.','https://www.tokensets.com/v2/set/polygon/0x0765425b334d7db1f374d03f4261ac191172bef7','0x0765425b334d7db1f374d03f4261ac191172bef7'],
    'Buy CBTC' : ['CBTC', 'A fan favorite, Clean Bitcoin lets you invest in the greatest store of value of our time, net-zero! The 1% of NCT tokens assures, at current prices, 38 years of green BTC hodling.','https://www.tokensets.com/v2/set/polygon/0x7958e9fa5cf56aebedd820df4299e733f7e8e5dd','0x7958e9fa5cf56aebedd820df4299e733f7e8e5dd'],
  }
  const [tokenAmount,setTokenAmount] = useState()
  const [tradeQuotes,setTradeQuotes] = useState()
  const [quoting,setQuoting] = useState(false)
  const [setDetails,setSetDetails] = useState()
  const [indexAmount,setIndexAmount] = useState()
  const [approving, setApproving] = useState()
  const [buying, setBuying] = useState()
  const [buyWethAmount, setBuyWethAmount] = useState()
  const [isWethApproved, setIsWethApproved] = useState()

  const issuerAddress = contracts?.SETISSUER?.address
  const issuerApproval = useContractReader(contracts, 'WETH', 'allowance', [address, issuerAddress])

  const wethAddress = contracts?.WETH?.address

  const handleApproveTokens = async () => {
    setApproving(true)
    await tx(writeContracts.WETH.approve(issuerAddress, buyWethAmount && utils.parseEther(buyWethAmount)))
    setApproving(false)
  }

  const handleWETHQuotes = async _indexAmount => {
    setQuoting(true)
    setIndexAmount(_indexAmount)

    const _proportions = []

    if(setDetails && !isNaN(Number(_indexAmount)) && Number(_indexAmount) > 0) {
      for(const token of setDetails.positions) {
        const tokenDecimals = await set.erc20.getDecimalsAsync(token.component)

        _proportions.push({
          fromToken: wethAddress,
          toToken: token.component,
          rawAmount: utils.parseUnits(`${(utils.formatUnits(token.unit, tokenDecimals) * _indexAmount).toFixed(tokenDecimals)}`,tokenDecimals).toString(),
          ignore: wethAddress === token.component,
        })
        console.log((utils.formatUnits(token.unit, tokenDecimals) * _indexAmount))
      }

      console.log('_proportions',_proportions)

      const quotes = await set.utils.batchFetchSwapQuoteAsync(_proportions,true,tokenTexts[setName][3],set.setToken,gasPrice)

      setTradeQuotes(quotes.map(quote => {
        return quote.calldata
      }))

      let totalWeth = 0

      for(const quote of quotes) {
        const slippage = isNaN(parseFloat(quote.slippagePercentage)) ? 0 : parseFloat(quote.slippagePercentage)/100

        totalWeth += Number(utils.formatEther(quote.fromTokenAmount)) * (1 + slippage)
      }

      setBuyWethAmount(totalWeth.toFixed(18))

      console.log('quotes',quotes)
    } else {
      setBuyWethAmount(0)
      setTradeQuotes([])
    }
    setQuoting(false)
  }

  useEffect(() => {
    const getSetDetails = async () => {
      if(set && setName) {
        const details = set && await set.setToken
        .fetchSetDetailsAsync(
          tokenTexts[setName][3],
          ['0x38E5462BBE6A72F79606c1A0007468aA4334A92b'],
          address,
        )

        setSetDetails(details)
        console.log('details',details)
      }
    }

    getSetDetails()
  }, [address, set, setName])

  // const getQuote = async () => {
  //   const url = `https://polygon.api.0x.org/swap/v1/quote?buyToken=${token}&sellToken=WETH&buyAmount=${buyTokenAmount}`
  //   const getData = async () => {
  //     const response = await fetch(
  //       url,
  //     )
  //     const data = await response.json()

  //     setOldestBlockN(data.result)
  //   }
  // }

  useEffect(() => {
    const buyWethAmountBN = buyWethAmount && utils.parseEther(`${buyWethAmount}`)

    if (issuerApproval && buyWethAmountBN) setIsWethApproved(issuerApproval.gte(buyWethAmountBN))
  }, [buyWethAmount, issuerApproval])

  const handleIssuance = async () => {
    setBuying(true)// issueExactSetFromToken
    await tx(writeContracts.SETISSUER.issueExactSetFromToken(
      tokenTexts[setName][3],
      wethAddress,
      indexAmount && utils.parseEther(`${indexAmount}`),
      buyWethAmount && utils.parseEther(`${buyWethAmount}`),
      tradeQuotes,
      '0x38E5462BBE6A72F79606c1A0007468aA4334A92b',
      false,
    ))
    setBuying(false)
  }

  return (
    <div>
      <Modal title={setName}
        visible={modalUp === true}
        onCancel={() => {
          handleModalDown()
        }}
        footer={[
          <Button
            key='back'
            onClick={() => {
              handleModalDown()
            }}
          >
            Close
          </Button>,
        ]}>
          <Row justify="center" align="middle">
            {setName && tokenTexts[setName][1]}
          </Row>
          <Row justify="center" align="middle">
            <Card
              size="small"
              type="inner"
              title={`${setName && tokenTexts[setName][0]} tokens to issue:`}
              style={{ width: 400, textAlign: 'left' }}
            >
              <Input
                style={{ textAlign: 'center' }}
                placeholder={'shares of the index to issue'}
                value={indexAmount}
                onChange={e => {
                  handleWETHQuotes(e.target.value)
                }}
              />
            </Card>
          </Row>
          <Row justify="center" align="middle">
            <span>↓</span>
          </Row>
          <Row justify="center" align="middle">
            <Card
              size="small"
              type="inner"
              title={`Paying in WETH:`}
              extra={quoting && <LoadingOutlined />}
              style={{ width: 400, textAlign: 'left' }}
            >
              <Input
                style={{ textAlign: 'center' }}
                placeholder={'Cost in WETH'}
                value={buyWethAmount}
                disabled
              />
            </Card>
            <br />
            {/* <StyledButton href={setName && tokenTexts[setName][2]} target='_blank' $type='primary'>Learn more and buy shares</StyledButton> */}
            <StyledButton loading={approving} $type="primary" disabled={isWethApproved || !buyWethAmount} onClick={handleApproveTokens}>
              Approve WETH
            </StyledButton>
            <StyledButton loading={buying} $type="primary" disabled={!isWethApproved || !buyWethAmount} onClick={handleIssuance}>
              Issue Index Tokens
            </StyledButton>
          </Row>
      </Modal>
    </div>
  )
}
