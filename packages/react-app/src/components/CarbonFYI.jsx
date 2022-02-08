import { calculateAddressEmissions } from "ethereum-emissions-calculator";
import { useEffect, useState } from "react";
// import { ETHERSCAN_KEY } from "../constants";

export default function CarbonFYI({currentAddress}) {
  const [emissions,setEmissions]=useState(0);
  var typeTransaction = ['eth', 'erc20', 'erc721'];
  var gas = 0;
  var co2 = 0;
  var transactions = 0;
  var apiKey = process.env.ETHERSCAN_KEY || "DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW";
  
  useEffect(() => {
    async function getEmissions(){
      for(var i = 0; i < 3; i++) {
        console.log("CurAddress "+currentAddress);
        const addr_emissions = await calculateAddressEmissions({
          transactionType: typeTransaction[i], // "eth" | "erc20" | "erc721"
          address: currentAddress,
          etherscanAPIKey: apiKey,
        });
        gas += addr_emissions['gasUsed'];
        co2 += addr_emissions['kgCO2'];
        transactions += addr_emissions['transactionsCount'];
      }
      setEmissions(co2/1000);
    }
    getEmissions();
  },[currentAddress]);

  return (
    <>{emissions}</>
  );
}