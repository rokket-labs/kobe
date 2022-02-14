import { useEffect, useState } from "react";
import { Table } from "antd";
import {
  TokenBalance,
} from "../components";

export default function GreenTokenTable({address, prices, readContracts, localContracts}) {
  
  const tokenColumns = [
    {
      title: 'Token',
      dataIndex: 'name',
    },
    {
      title: 'Holding',
      dataIndex: 'hold',
    },
    {
      title: 'CO2 Value (Tons)',
      dataIndex: 'co2',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
    },
    
  ];

  const tokenData = [
    {
      key: '1',
      name: 'Moss CO2 Token (MCO2)',
      hold: <TokenBalance 
              contracts = {readContracts}
              name = {"PMCO2"}
              address = {address}
              dollarMultiplier = {prices && prices["moss-carbon-credit"] && prices["moss-carbon-credit"].usd}
            />,
      desc: 'Moss Certified CO2 Token on Polygon',
      co2: <TokenBalance 
              contracts = {readContracts}
              name = {"PMCO2"}
              address = {address}
            />,
    },
    {
      key: '2',
      name: 'Toucan CO2 Tokens (BCT)',
      hold: <TokenBalance 
              contracts = {readContracts}
              name = {"PBCT"}
              address = {address}
              dollarMultiplier = {prices && prices["toucan-protocol-base-carbon-tonne"] && prices["toucan-protocol-base-carbon-tonne"].usd}
            />,
      desc: 'Base Carbon Ton: Toucan credits bridged to blockchain on Polygon',
      co2: <TokenBalance 
              contracts = {readContracts}
              name = {"PBCT"}
              address = {address}
            />,
    },
    {
      key: '3',
      name: 'Toucan CO2 Tokens (NCT)',
      hold: <TokenBalance 
              contracts = {readContracts}
              name = {"NCT"}
              address = {address}
            />,
      desc: 'Nature Carbon Ton: Toucan premium credits bridged to blockchain on Polygon',
      co2: <TokenBalance 
              contracts = {localContracts}
              name = {"NCT"}
              address = {address}
            />,
    },
    {
      key: '4',
      name: 'Klima Tokens (KLIMA)',
      hold: <TokenBalance 
              contracts = {readContracts}
              name = {"KLIMA"}
              address = {address}
              dollarMultiplier = {prices && prices["klima-dao"] && prices["klima-dao"].usd}
            />,
      desc: 'Klima DAO Tokens, unstaked on Polygon',
      co2: "N/A",
    },
    {
      key: '5',
      name: 'Staked Klima (sKLIMA)',
      hold: <TokenBalance 
              contracts = {readContracts}
              name = {"sKLIMA"}
              address = {address}
              dollarMultiplier = {prices && prices["staked-klima"] && prices["staked-klima"].usd}
            />,
      desc: 'Staked Klima DAO Tokens on Polygon',
      co2: "N/A",
    },
  ];

  return (
    <div style={{ width: 900, margin: "auto"}}>
      <Table columns={tokenColumns} dataSource={tokenData} />
    </div>
  );
}