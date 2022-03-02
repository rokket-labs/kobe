import { useEffect, useState } from 'react'
import { calculateAddressEmissions } from 'ethereum-emissions-calculator'
// import { ETHERSCAN_KEY } from "../constants";

const CarbonFYI = ({ currentAddress }) => {
  const [emissions, setEmissions] = useState(0)

  const typeTransaction = ['eth', 'erc20', 'erc721']

  const apiKey = process.env.ETHERSCAN_KEY || 'DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW'

  useEffect(() => {
    const getEmissions = async () => {
      let co2 = 0

      for (let i = 0; i < 3; i++) {
        const addr_emissions = await calculateAddressEmissions({
          transactionType: typeTransaction[i], // "eth" | "erc20" | "erc721"
          address: currentAddress,
          etherscanAPIKey: apiKey,
        })

        co2 += addr_emissions.kgCO2
      }
      setEmissions(co2 / 1000)
    }

    getEmissions()
  }, [currentAddress])

  return <>{emissions}</>
}

export default CarbonFYI
