import { useEffect, useState } from 'react'
import { calculateAddressEmissions } from 'ethereum-emissions-calculator'
// import { ETHERSCAN_KEY } from "../constants";

const CarbonFYI = ({ currentAddress, metric }) => {
  const [emissions, setEmissions] = useState(0)
  const [transactions, setTransactions] = useState(0)
  const [gas, setGas] = useState(0)

  const typeTransaction = ['eth', 'erc20', 'erc721']

  const apiKey = process.env.ETHERSCAN_KEY || 'DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW'

  useEffect(() => {
    const getEmissions = async () => {
      let co2 = 0
      let curGas = 0
      let curTransactions = 0

      for (let i = 0; i < 3; i++) {
        const addr_emissions = await calculateAddressEmissions({
          transactionType: typeTransaction[i], // "eth" | "erc20" | "erc721"
          address: currentAddress,
          etherscanAPIKey: apiKey,
        })

        co2 += addr_emissions.kgCO2
        curTransactions += addr_emissions.transactionsCount
        curGas += addr_emissions.gasUsed
      }
      setEmissions(co2 / 1000)
      setTransactions(curTransactions)
      setGas(curGas)
    }

    getEmissions()
  }, [currentAddress])

  const results = metric === 'txs' ? transactions : metric === 'gas' ? gas : emissions

  return <>{results}</>
}

export default CarbonFYI
