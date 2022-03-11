/* eslint-disable max-lines-per-function */
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

import { NetworkContext } from '../../contexts/NetworkContext'
import { WalletContext } from '../../contexts/WalletContext'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

require('dotenv').config()

export default function PortfolioChart() {

  const oldestTimeStamp = Math.round((new Date()). getTime() / 1000) - 30*24*60*60
  const [oldestBlockN, setOldestBlockN] = useState(1)

  useEffect(() => {
    const url = `https://api.polygonscan.com/api?module=block&action=getblocknobytime&timestamp=${oldestTimeStamp}&closest=before&apikey=${process.env.REACT_APP_POLYGONSCAN_KEY}`
    const getData = async () => {
      const response = await fetch(
        url,
      )
      const data = await response.json()

      setOldestBlockN(data.result)
    }

    getData()
  }, [])

  const { USDPrices, isLoadingBalances } = useContext(WalletContext)
  const { address } = useContext(NetworkContext)

  const [chartData, setChartData] = useState()

  useEffect(() => {
    const url = `https://api.polygonscan.com/api?module=account&action=tokentx&address=${address}&startblock=${oldestBlockN}&endblock=9999999999&page=1&offset=100&sort=asc&apikey=${process.env.REACT_APP_POLYGONSCAN_KEY}`

    const getData = async () => {
      if(address && oldestBlockN) {
        const response = await fetch(
          url,
        )
        const data = await response.json()

        const filteredTransactions = data.result.filter(t => {
          return t.tokenSymbol === 'BCT' || t.tokenSymbol === 'MCO2' || t.tokenSymbol === 'NCT' || t.tokenSymbol === 'KLIMA' || t.tokenSymbol === 'sKLIMA'
        })

        filteredTransactions.sort((a,b) => {
          return a.timeStamp*1 - b.timeStamp*1
        })

        const dates = filteredTransactions.map(transaction => {
          return transaction.blockNumber
        })

        let originalBalance = 0

        const values = filteredTransactions.map(transaction => {
          let price

          switch(transaction.tokenSymbol) {
            case 'BCT':
              price = USDPrices && USDPrices['toucan-protocol-base-carbon-tonne']?.usd
              break
            case 'MCO2':
              price = USDPrices && USDPrices['moss-carbon-credit']?.usd
              break
            case 'NCT':
              price = USDPrices && USDPrices['toucan-protocol-base-carbon-tonne']?.usd * 2
              break
            case 'KLIMA':
              price = USDPrices && USDPrices['klima-dao']?.usd
              break
            case 'sKLIMA':
              price = USDPrices && USDPrices['staked-klima']?.usd
              break
            default:
              price = 1
          }

          const value = (transaction.value / (10**transaction.tokenDecimal) * price).toFixed(2)

          originalBalance += transaction.to === address ? value : -value

          return transaction.to === address ? value : -value
        })

        const totals = values.map(value => {
          return originalBalance + value
        })

        const newChartData = {
          labels: dates,
          datasets: [
            {
              label: 'Portfolio Value',
              data: totals,
              borderColor: '#3f9c49',
              backgroundColor: '#48BB78',
            },
          ],
        }

        setChartData(newChartData)
      }
    }

    getData()

  }, [address, isLoadingBalances])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Portfolio Over Time',
      },
    },
  }

  return (
    <div style={{ width: 600, margin: 'auto' }}>
      {chartData ? <Line data={chartData} options={options}/> : '' }
    </div>
  )
}
