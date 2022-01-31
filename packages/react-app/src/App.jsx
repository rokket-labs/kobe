import { Alert, Button, Card, Col, Menu, Row, Input, List, Divider, Steps, Space, Table } from "antd";
import "antd/dist/antd.css";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useGasPrice,
  useOnBlock,
  useUserProviderAndSigner,
} from "eth-hooks";
import { useEventListener } from "eth-hooks/events/useEventListener";
import { useExchangeEthPrice } from "eth-hooks/dapps/dex";
import React, { useCallback, useEffect, useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import "./App.css";
import {
  Account,
  Address,
  AddressInput,
  Balance,
  Contract,
  DexSwapper,
  DexSwapperLP,
  DropdownMenu,
  Faucet,
  GasGauge,
  Header,
  Ramp,
  ThemeSwitch,
  NetworkDisplay,
  FaucetHint,
  NetworkSwitch,
  TokenBalance,
  TreejerGraph
} from "./components";
import { NETWORKS, ALCHEMY_KEY } from "./constants";
import externalContracts from "./contracts/external_contracts";
// contracts
import deployedContracts from "./contracts/hardhat_contracts.json";
import { Transactor, Web3ModalSetup } from "./helpers";
import { Home, ExampleUI, Hints, Subgraph } from "./views";
import { useStaticJsonRPC } from "./hooks";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const { ethers } = require("ethers");
/*
    Welcome to 🏗 scaffold-eth !

    Code:
    https://github.com/scaffold-eth/scaffold-eth

    Support:
    https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA
    or DM @austingriffith on twitter or telegram

    You should get your own Alchemy.com & Infura.io ID and put it in `constants.js`
    (this is your connection to the main Ethereum network for ENS etc.)


    🌏 EXTERNAL CONTRACTS:
    You can also bring in contract artifacts in `constants.js`
    (and then use the `useExternalContractLoader()` hook!)
*/

/// 📡 What chain are your contracts deployed to?
const initialNetwork = NETWORKS.goerli; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
const polyNetwork = NETWORKS.polygon;

// 😬 Sorry for all the console logging
const DEBUG = true;
const NETWORKCHECK = true;
const USE_BURNER_WALLET = true; // toggle burner wallet feature
const USE_NETWORK_SELECTOR = false;

const web3Modal = Web3ModalSetup();

// 🛰 providers
const providers = [
  "https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406",
  `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
  "https://rpc.scaffoldeth.io:48544",
];

function App(props) {
  // specify all the chains your app is available on. Eg: ['localhost', 'mainnet', ...otherNetworks ]
  // reference './constants.js' for other networks
  const networkOptions = [initialNetwork.name, "mainnet", "rinkeby"];

  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();
  const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0]);
  const location = useLocation();

  const targetNetwork = NETWORKS[selectedNetwork];

  // 🔭 block explorer URL
  const blockExplorer = targetNetwork.blockExplorer;

  // load all your providers
  const localProvider = useStaticJsonRPC([
    process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : targetNetwork.rpcUrl,
  ]);
  const mainnetProvider = useStaticJsonRPC(providers);

  // Provider for Polygon Network
const polyProviderUrl = polyNetwork.rpcUrl;
const polyProvider = new ethers.providers.StaticJsonRpcProvider(polyProviderUrl);

  if (DEBUG) console.log(`Using ${selectedNetwork} network`);

  // 🛰 providers
  if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
      await injectedProvider.provider.disconnect();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangeEthPrice(targetNetwork, mainnetProvider);

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "fast");
  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProviderAndSigner = useUserProviderAndSigner(injectedProvider, localProvider, USE_BURNER_WALLET);
  const userSigner = userProviderAndSigner.signer;

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress();
        setAddress(newAddress);
      }
    }
    getAddress();
  }, [userSigner]);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId =
    userSigner && userSigner.provider && userSigner.provider._network && userSigner.provider._network.chainId;

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userSigner, gasPrice);

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address);

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address);
  const yourMaticBalance = useBalance(polyProvider, address);

  // const contractConfig = useContractConfig();

  const contractConfig = { deployedContracts: deployedContracts || {}, externalContracts: externalContracts || {} };

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractConfig);

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, contractConfig, localChainId);

  // EXTERNAL CONTRACT EXAMPLE:
  //
  // If you want to bring in the mainnet DAI contract it would look like:
  const mainnetContracts = useContractLoader(mainnetProvider, contractConfig);
  const polyContracts = useContractLoader(polyProvider, contractConfig);

  // If you want to call a function on a new block
  useOnBlock(mainnetProvider, () => {
    console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`);
  });

  // Then read your DAI balance like:
  const myMainnetDAIBalance = useContractReader(mainnetContracts, "DAI", "balanceOf", [
    "0x34aA3F359A9D614239015126635CE7732c18fDF3",
  ]);

  // Polybalances
  const myPolyMCO2Balance = useContractReader(polyContracts, "PMCO2", "balanceOf", [
    address,
  ]);
  
  const myPolyBCTBalance = useContractReader(polyContracts, "PBCT", "balanceOf", [
    address,
  ]);

  const myPolySKlimaBalance = useContractReader(polyContracts, "sKLIMA", "balanceOf", [
    address,
  ]);

  const myPolyWethBalance = useContractReader(polyContracts, "WETH", "balanceOf", [
    address,
  ]);

  const koyweTokenBalance = useContractReader(readContracts, "KoyweToken", "balanceOf", [address]);

  //keep track of contract balance to know how much has been staked total:
  const kpledgeContractBalance = useBalance(
    localProvider,
    readContracts && readContracts.KoywePledge ? readContracts.KoywePledge.address : null,
  );
  if (DEBUG) console.log("💵 kpledgeContractBalance", kpledgeContractBalance);

  // ** keep track of a variable from the contract in the local React state:
  const pledged = useContractReader(readContracts, "KoywePledge", "isPledged", [address]);
  console.log("💸 pledged:", pledged);

  // ** keep track of a variable from the contract in the local React state:
  const tonsPledged = useContractReader(readContracts, "KoywePledge", "getCommitment", [address]);
  console.log("💸 tons pledged:", tonsPledged ? tonsPledged.toString() : "...");

  // ** 📟 Listen for broadcast events
  const pledgeEvents = useEventListener(readContracts, "KoywePledge", "NewPledge", localProvider, 1);
  console.log("📟 pledge events:", pledgeEvents);

  const CO2TokenBalance = useContractReader(readContracts, "CO2TokenContract", "balanceOf", [address]);
  console.log("🏵 CO2TokenBalance:", CO2TokenBalance ? ethers.utils.formatEther(CO2TokenBalance) : "...");

  const vendorAddress = readContracts && readContracts.KoyweVendor && readContracts.KoyweVendor.address;

  const vendorTokenBalance = useContractReader(readContracts, "KoyweToken", "balanceOf", [vendorAddress]);
  console.log("🏵 vendorTokenBalance:", vendorTokenBalance ? ethers.utils.formatEther(vendorTokenBalance) : "...");

  const tokensPerEth = useContractReader(readContracts, "KoyweVendor", "tokensPerEth");
  console.log("🏦 tokensPerEth:", tokensPerEth ? tokensPerEth.toString() : "...");


  const [tokenBuyAmount, setTokenBuyAmount] = useState();
  const [tokenSellAmount, setTokenSellAmount] = useState();
  
  const [isSellAmountApproved, setIsSellAmountApproved] = useState();
  const ethCostToPurchaseTokens =
    tokenBuyAmount && tokensPerEth && ethers.utils.parseEther("" + tokenBuyAmount / parseFloat(tokensPerEth));
  const ethCostToSellTokens =
    tokenSellAmount && tokensPerEth && ethers.utils.parseEther("" + tokenSellAmount / parseFloat(tokensPerEth));

  const vendorApproval = useContractReader(readContracts, "KoyweToken", "allowance", [
    address, vendorAddress
  ]);

  useEffect(()=>{
    const tokenSellAmountBN = tokenSellAmount && ethers.utils.parseEther("" + tokenSellAmount)
    setIsSellAmountApproved(vendorApproval && tokenSellAmount && vendorApproval.gte(tokenSellAmountBN))
  },[tokenSellAmount, readContracts])

  const [buying, setBuying] = useState();
  const [selling, setSelling] = useState();

  const [tonsCommitted, setTonsCommitted] = useState();
  const [pledging, setPledging] = useState();
  const [dripping, setDripping] = useState();

  let pledgeDisplay = "";
  if (pledged) {
    pledgeDisplay = (
      <div style={{ padding: 64, backgroundColor: "#eeffef", fontWeight: "bolder" }}>
        🌳🌳 - You have pledged to save the planet, you're now a part of the Koywe forest - 🌳🌳
        <p>Move on to step 3: the Forest</p>
      </div>
    );
  }

  let pledgeButton = (
    <div style={{ padding: 8, marginTop: 32, width: 300, margin: "auto" }}>
      <Input
        style={{ textAlign: "center" }}
        placeholder={"annual CO2e tons committed"}
        value={tonsCommitted}
        onChange={e => {
          setTonsCommitted(e.target.value);
        }}
      />
      <Button
        type={pledged ? "success" : "primary"}
        size={"large"}
        loading={pledging}
        onClick={async () => {
          setPledging(true);
          await tx(writeContracts.KoywePledge.newPledge(tonsCommitted));
          setPledging(false);
        }}
      >
        🌱 Pledge On-Chain 🌱
      </Button>
    </div>
  );
  
  if (pledged){
    pledgeButton = (
      <div>
        <p>You are now a part of something bigger: a forest.</p>
        <Link to="/journey">
          <Button size={"large"} >
            🌱 Grow the Forest 🌱
          </Button>
        </Link>
    </div>);
  };

  const millisToDate = function(milliseconds) {
    const date = new Date(milliseconds);
    return date.toString();
  };

  let pledgeBanner = "";
  if(pledged){
    pledgeBanner = (
      <div style={{ zIndex: -1, position: "absolute", right: 300, top: 32, padding: 16, color: targetNetwork.color }}>
          🌳  PLEDGED 🌳
      </div>
    );
  }

  let dripBalance = "";
  if(pledged){
    if(CO2TokenBalance == 0){
      dripBalance = (
        <Button
          type={CO2TokenBalance > 0 ? "success" : "primary"}
          size={"large"}
          loading={dripping}
          onClick={async () => {
            setDripping(true);
            await tx(writeContracts.CO2TokenContract.startDripping(address));
            setDripping(false);
          }}
        >
          💧 Start Dripping your CO2e 💧
        </Button>
      );
    } else{
      dripBalance = (
        <div style={{ padding: 8, marginTop: 32, width: 300, margin: "auto" }}>
          <Card title="🔥 Your CO2e Tons🔥" >
            <div style={{ padding: 8 }}>
              <Balance balance={CO2TokenBalance} fontSize={64} /> CO2e Tons emitted since pledging; the share of the problem you own
            </div>
          </Card>
        </div>
      );
    }
  }

  const buyTokensEvents = useEventListener(readContracts, "KoyweVendor", "BuyTokens", localProvider, 1);

  const { Step } = Steps;

  const [prices, setPrices] = useState(null);

  // read prices from coingecko
  useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=toucan-protocol-base-carbon-tonne,moss-carbon-credit,klima-dao,staked-klima&vs_currencies=usd");
      const data = await response.json();

      // store the data into our books variable
      setPrices(data) ;
    }
  }, [setPrices]);

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
              contracts = {polyContracts}
              name = {"PMCO2"}
              address = {address}
              dollarMultiplier = {prices && prices["moss-carbon-credit"] && prices["moss-carbon-credit"].usd}
            />,
      desc: 'Moss Certified CO2 Token on Polygon',
      co2: <TokenBalance 
              contracts = {polyContracts}
              name = {"PMCO2"}
              address = {address}
            />,
    },
    {
      key: '2',
      name: 'Toucan CO2 Tokens (BCT)',
      hold: <TokenBalance 
              contracts = {polyContracts}
              name = {"PBCT"}
              address = {address}
              dollarMultiplier = {prices && prices["toucan-protocol-base-carbon-tonne"] && prices["toucan-protocol-base-carbon-tonne"].usd}
            />,
      desc: 'Toucan credits bridged to blockchain on Polygon',
      co2: <TokenBalance 
              contracts = {polyContracts}
              name = {"PBCT"}
              address = {address}
            />,
    },
    {
      key: '3',
      name: 'Koywe CO2 Tokens (KOY)',
      hold: <TokenBalance 
              contracts = {readContracts}
              name = {"KoyweToken"}
              address = {address}
              dollarMultiplier = {7}
            />,
      desc: 'Koywe certified CO2 Tokens on Göerli',
      co2: <TokenBalance 
              contracts = {readContracts}
              name = {"KoyweToken"}
              address = {address}
            />,
    },
    {
      key: '4',
      name: 'Klima Tokens (KLIMA)',
      hold: <TokenBalance 
              contracts = {polyContracts}
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
              contracts = {polyContracts}
              name = {"sKLIMA"}
              address = {address}
              dollarMultiplier = {prices && prices["staked-klima"] && prices["staked-klima"].usd}
            />,
      desc: 'Staked Klima DAO Tokens on Polygon',
      co2: "N/A",
    },
  ];

  const chartData = {
    labels: ['Plight', 'Fight'],
    datasets: [
      {
        label: 'CO2 tons',
        data: [tonsPledged > 0 ? (CO2TokenBalance/Math.pow(10,18)).toFixed(2) : 0,
          (
            (myPolyBCTBalance && myPolyBCTBalance > 0 ? myPolyBCTBalance : 0)/(Math.pow(10,18))
          + (myPolyMCO2Balance && myPolyMCO2Balance > 0 ? myPolyMCO2Balance : 0)/(Math.pow(10,18))
          + (koyweTokenBalance && koyweTokenBalance > 0 ? koyweTokenBalance : 0)/(Math.pow(10,18))
          ).toFixed(2)
          ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  /*
  const addressFromENS = useResolveName(mainnetProvider, "austingriffith.eth");
  console.log("🏷 Resolved austingriffith.eth as:",addressFromENS)
  */

  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
  useEffect(() => {
    if (
      DEBUG &&
      mainnetProvider &&
      address &&
      selectedChainId &&
      yourLocalBalance &&
      yourMainnetBalance &&
      yourMaticBalance &&
      readContracts &&
      writeContracts &&
      polyContracts &&
      mainnetContracts
    ) {
      console.log("_____________________________________ 🏗 scaffold-eth _____________________________________");
      console.log("🌎 mainnetProvider", mainnetProvider);
      console.log("🌎 polyProvider", polyProvider);
      console.log("🏠 localChainId", localChainId);
      console.log("👩‍💼 selected address:", address);
      console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
      console.log("💵 yourLocalBalance", yourLocalBalance ? ethers.utils.formatEther(yourLocalBalance) : "...");
      console.log("💵 yourMainnetBalance", yourMainnetBalance ? ethers.utils.formatEther(yourMainnetBalance) : "...");
      console.log("💵 yourMaticBalance", yourMaticBalance ? ethers.utils.formatEther(yourMaticBalance) : "...");
      console.log("📝 readContracts", readContracts);
      console.log("📝 polyContracts", polyContracts);
      console.log("🌍 DAI contract on mainnet:", mainnetContracts);
      console.log("💵 yourMainnetDAIBalance", myMainnetDAIBalance ? ethers.utils.formatEther(myMainnetDAIBalance) : "...");
      console.log("💵 yourPolyMCO2Balance", myPolyMCO2Balance ? ethers.utils.formatEther(myPolyMCO2Balance) : "...");
      console.log("💵 yourPolyBCTBalance", myPolyBCTBalance ? ethers.utils.formatEther(myPolyBCTBalance) : "...");
      console.log("💵 myPolySKlimaBalance", myPolySKlimaBalance ? ethers.utils.formatEther(myPolySKlimaBalance) : "...");
      console.log("💵 myPolyWethBalance", myPolyWethBalance ? ethers.utils.formatEther(myPolyWethBalance) : "...");
      console.log("🔐 writeContracts", writeContracts);
    }
  }, [
    mainnetProvider,
    address,
    selectedChainId,
    yourLocalBalance,
    yourMainnetBalance,
    readContracts,
    writeContracts,
    mainnetContracts,
  ]);

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new ethers.providers.Web3Provider(provider));

    provider.on("chainChanged", chainId => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    provider.on("accountsChanged", () => {
      console.log(`account changed!`);
      setInjectedProvider(new ethers.providers.Web3Provider(provider));
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
    // eslint-disable-next-line
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name.indexOf("local") !== -1;

  return (
    <div className="App">
      {/* ✏️ Edit the header and change the title to your project name */}
      <Header />
      {pledgeBanner}
      <NetworkDisplay
        NETWORKCHECK={NETWORKCHECK}
        localChainId={localChainId}
        selectedChainId={selectedChainId}
        targetNetwork={targetNetwork}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
        USE_NETWORK_SELECTOR={USE_NETWORK_SELECTOR}
      />
      <Menu style={{ textAlign: "center", marginTop: 40 }} selectedKeys={[location.pathname]} mode="horizontal">
        <Menu.Item key="/">
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="/rart">
          <Link to="/rart">Regen Art</Link>
        </Menu.Item>
        <Menu.Item key="/refi">
          <Link to="/refi">ReFi</Link>
        </Menu.Item>
        <Menu.Item key="/pledge">
          <Link to="/pledge">Pledge</Link>
        </Menu.Item>
      </Menu>

      <Switch>
        <Route exact path="/">
          <div >
            <Space>
              
              <Card title="Your Fight" style={{ width: 400, textAlign: "left" }}>
                <p>🌳 0 trees planted</p>
                <p>💨 {((myPolyBCTBalance && myPolyBCTBalance > 0 ? myPolyBCTBalance : 0)/(Math.pow(10,18)) + (myPolyMCO2Balance && myPolyMCO2Balance > 0 ? myPolyMCO2Balance : 0)/(Math.pow(10,18)) + (koyweTokenBalance && koyweTokenBalance > 0 ? koyweTokenBalance : 0)/(Math.pow(10,18)) ).toFixed(2)} CO2e tons secuestered</p>
                <h2>🤑 {((myPolyBCTBalance && myPolyBCTBalance > 0 ? myPolyBCTBalance : 0)/(Math.pow(10,18))*(prices && prices["toucan-protocol-base-carbon-tonne"] && prices["toucan-protocol-base-carbon-tonne"].usd) + (myPolyMCO2Balance && myPolyMCO2Balance > 0 ? myPolyMCO2Balance : 0)/(Math.pow(10,18))*(prices && prices["moss-carbon-credit"] && prices["moss-carbon-credit"].usd) + (koyweTokenBalance && koyweTokenBalance > 0 ? koyweTokenBalance : 0)/(Math.pow(10,18))*7 ).toFixed(2)} USD invested</h2>
              </Card>
              <Card title="Your Plight" style={{ width: 400, textAlign: "right" }}>
                <p>🏭 1.5 CO2e tons in transactions</p>
                <p>{tonsPledged > 0 ? "🩸 "+(CO2TokenBalance/Math.pow(10,18)).toFixed(2)+" CO2e tons dripped" : "🤐 Start dripping CO2 tokens."}</p>
                <h2>{tonsPledged > 0 ? "🤞 "+tonsPledged.toString()+" CO2e tons/year pledged" : "🤐 Take the pledge to own your share of the problem."}</h2>
              </Card>
              
            </Space>
            <div style={{ width: 400, margin: "auto"}}>
              <Doughnut data={chartData} />
            </div>
            <h2>Your Regenerative Art</h2>
            {address ? <TreejerGraph address={address} /> : ""}
            <h2>Your ReFi Positions</h2>
            <div style={{ width: 900, margin: "auto"}}>
              <Table columns={tokenColumns} dataSource={tokenData} />
            </div>
            <Link to="/refi" >
              <Button size={"large"} >
                🌱 Put your money where your mouth is 🤑  Buy more! 🌱
              </Button>
            </Link>
          </div>
        </Route>
        <Route exact path="/ranking">
          <div style={{ width: 500, margin: "auto", marginTop: 64 }}>
            <div>Ranking:</div>
            <List
              dataSource={pledgeEvents}
              renderItem={item => {
                return (
                  <List.Item key={item.blockNumber}>
                    <Address value={item.args[0]} ensProvider={mainnetProvider} fontSize={16} />
                    | <TokenBalance 
                      contracts = {readContracts}
                      name = {"CO2TokenContract"}
                      address = {item.args[0]}
                    /> CO2 tons emmitted
                    | &nbsp;{item.args[1].toString()} CO2e tons/year committed
                    | &nbsp;<TokenBalance 
                      contracts = {readContracts}
                      name = {"KoyweToken"}
                      address = {item.args[0]}
                    /> KOYWE
                    | <TokenBalance 
                      contracts = {polyContracts}
                      name = {"PBCT"}
                      address = {item.args[0]}
                    /> BCT
                    | <TokenBalance 
                      contracts = {polyContracts}
                      name = {"PMCO2"}
                      address = {item.args[0]}
                    /> MCO2
                  </List.Item>
                );
              }}
            />
          </div>
        </Route>
        <Route exact path="/rart">
          <div style={{ width: 500, margin: "auto"}}>
            <h1 style={{ padding: 8, marginTop: 32 }}>Regenerative Art Collections</h1>
            <p>Check out your collection or add more items to help fight climate change.</p>
            <p>Some cool things you can fund: planting trees, direct capture CO2 from the air, help local communities, and more!</p>
          </div>
          {address ? <TreejerGraph address={address} /> : ""}
          {/* <TreejerGraph address={address} /> */}
        </Route>
        <Route exact path="/pledge">
          {pledgeDisplay}
          <div >
            <div style={{ width: 500, margin: "auto"}}>
              <h1 style={{ padding: 8, marginTop: 32 }}>First... The Pledge</h1>
              <p>This pledge is nothing more than a public commitment to do better. To be in charge of our emissions. To take ownership of a part of the effort.</p>
              <p>It doesn't need to be exact, but it does need to come from the heart.</p>
              <p>There are 60 million CO2e tons emitted every year.</p>
              <p>We ask you to make a commitment, just like our nation's leaders do, of annual CO2 tons that we will contribute to bring to zero (0).</p>
              <Divider/>
              <p>🌎 🌍 I hereby pledge to do my best to save the planet.</p>
              <p>🏬 🍔 I pledge to do my best to reduce emissions, by consuming less or by being more conscious about my decisions.</p>
              <p>👭 👬 I pledge to help others in their paths to help the planet.</p>
              <p>🤑 ⌛ I pledge to contribute, with money or time as long as I am able, to other people in my community.</p>
              <p>📝 🪧 I pledge to reduce or offset {tonsPledged > 0 ? tonsPledged.toString() : tonsCommitted} CO2e tons per year.</p>
              <h2>🌳 🌳 I pledge to grow a Forest, to be a Forest with my community, to take small, steady, and concrete steps to protect and help everyone adapt to the stormy weather 🌳 🌳</h2>
            </div>
            {pledgeButton}
            
            <Steps size="small" current={0}>
              <Step title="Pledge" />
              <Step title="Forest" />
            </Steps>
          </div>

        </Route>
        <Route exact path="/journey">
          <h1 style={{ padding: 8, marginTop: 32 }}>🌱🌿🪴🌳 Our Journey starts <b>here</b>🌳🪴🌿🌱</h1>
          {dripBalance}
          <h1 style={{ padding: 8, marginTop: 32 }}>You are not alone</h1>
          <h2>We are a Forest, the Koywe Forest</h2>
          <p>A group of committed individuals taking action, TODAY.</p>
          <p>Because words without actions are just wind, let's explore actionable steps to fight climate change, together...</p>
          <p>Start by investing in sustainable web3 projects.</p>

          <Steps size="small" current={2}>
              <Step title="Pledge" />
              <Step title="Forest" />
          </Steps>

        </Route>
        <Route path="/refi">
          <div style={{ width: 500, margin: "auto"}}>
            <h1 style={{ padding: 8, marginTop: 32 }}>ReFi positions and curated holdings</h1>
            <p>You can earn money and save the planet, AT THE SAME TIME!</p>
            <p>Such convinience, such wow. Use our dex or vendor to buy Göerli (testnet) Koywe Tokens or check out our curated selection of tokens.</p>
            <p>In the future, this will the place to swap, trade, buy or sell the best regerative tokens.</p>
          </div>
          <DexSwapper 
            localProvider={localProvider}
            address={address}
            readContracts={readContracts}
            writeContracts={writeContracts}
            tx={tx}
          />
          <DexSwapperLP 
            localProvider={localProvider}
            address={address}
            readContracts={readContracts}
            writeContracts={writeContracts}
            tx={tx}
          />
          <h1 style={{ padding: 8, marginTop: 32 }}>Koywe Tokens Centralized Vendor</h1>
          <Space>
              <div style={{ padding: 8 }}>
                <div>Available Supply to Buy:</div>
                <TokenBalance balance={vendorTokenBalance} fontSize={64} />
              </div>
            </Space>
            <div style={{ padding: 8 }}>{tokensPerEth && tokensPerEth.toNumber()} tokens per ETH</div>
            <Space>
              <div style={{ padding: 8, marginTop: 32, width: 300, margin: "auto" }}>
                <Card title="Buy Tokens" >
                  

                  <div style={{ padding: 8 }}>
                    <Input
                      style={{ textAlign: "center" }}
                      placeholder={"amount of tokens to buy"}
                      value={tokenBuyAmount}
                      onChange={e => {
                        setTokenBuyAmount(e.target.value);
                      }}
                    />
                    <Balance balance={ethCostToPurchaseTokens} dollarMultiplier={price} />
                  </div>

                  <div style={{ padding: 8 }}>
                    <Button
                      type={"primary"}
                      loading={buying}
                      onClick={async () => {
                        setBuying(true);
                        await tx(writeContracts.KoyweVendor.buyTokens({ value: ethCostToPurchaseTokens }));
                        setBuying(false);
                      }}
                    >
                      Buy Tokens
                    </Button>
                  </div>
                </Card>
              </div>
              <div style={{ padding: 8, marginTop: 32, width: 300, margin: "auto" }}>
                <Card title="Sell Tokens">
                  
                  <div style={{ padding: 8 }}>
                    <Input
                      style={{ textAlign: "center" }}
                      placeholder={"amount of tokens to sell"}
                      value={tokenSellAmount}
                      onChange={e => {
                        setTokenSellAmount(e.target.value);
                      }}
                    />
                    <Balance balance={ethCostToSellTokens} dollarMultiplier={price} />
                  </div>
                  {isSellAmountApproved?

                    <div style={{ padding: 8 }}>
                      <Button
                        type={"primary"}
                        loading={selling}
                        onClick={async () => {
                          setSelling(true);
                          await tx(writeContracts.KoyweVendor.sellTokens(tokenSellAmount && ethers.utils.parseEther(tokenSellAmount)));
                          setSelling(false);
                        }}
                      >
                        Sell Tokens
                      </Button>
                    </div>
                    :
                    <div style={{ padding: 8 }}>
                      <Button
                        type={"primary"}
                        loading={selling}
                        onClick={async () => {
                          setSelling(true);
                          await tx(writeContracts.KoyweToken.approve(readContracts.KoyweVendor.address, tokenSellAmount && ethers.utils.parseEther(tokenSellAmount)));
                          setSelling(false);
                        }}
                      >
                        Approve Tokens
                      </Button>
                    </div>
                  }


                </Card>
              </div>
            </Space>
        </Route>
        <Route exact path="/debug">
          {/*
                🎛 this scaffolding is full of commonly used components
                this <Contract/> component will automatically parse your ABI
                and give you a form to interact with it locally
            */}

          <Contract
            name="KoywePledge"
            price={price}
            signer={userSigner}
            provider={localProvider}
            address={address}
            blockExplorer={blockExplorer}
            contractConfig={contractConfig}
          />
          <Contract
            name="CO2TokenContract"
            price={price}
            signer={userSigner}
            provider={localProvider}
            address={address}
            blockExplorer={blockExplorer}
            contractConfig={contractConfig}
          />
          <Contract
            name="KoyweToken"
            price={price}
            signer={userSigner}
            provider={localProvider}
            address={address}
            blockExplorer={blockExplorer}
            contractConfig={contractConfig}
          />
          <Contract
            name="KoyweVendor"
            price={price}
            signer={userSigner}
            provider={localProvider}
            address={address}
            blockExplorer={blockExplorer}
            contractConfig={contractConfig}
          />
          <Contract
            name="Dex"
            price={price}
            signer={userSigner}
            provider={localProvider}
            address={address}
            blockExplorer={blockExplorer}
            contractConfig={contractConfig}
          />
        </Route>
      </Switch>

      <ThemeSwitch />

      {/* 👨‍💼 Your account is in the top right with a wallet at connect options */}
      <div style={{ position: "fixed", textAlign: "right", right: 0, top: 0, padding: 10 }}>
        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
          {USE_NETWORK_SELECTOR && (
            <div style={{ marginRight: 20 }}>
              <NetworkSwitch
                networkOptions={networkOptions}
                selectedNetwork={selectedNetwork}
                setSelectedNetwork={setSelectedNetwork}
              />
            </div>
          )}
          <Account
            useBurner={USE_BURNER_WALLET}
            address={address}
            localProvider={localProvider}
            userSigner={userSigner}
            mainnetProvider={mainnetProvider}
            price={price}
            web3Modal={web3Modal}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
            blockExplorer={blockExplorer}
          />
        </div>
        <DropdownMenu />
        {yourLocalBalance.lte(ethers.BigNumber.from("0")) && (
          <FaucetHint localProvider={localProvider} targetNetwork={targetNetwork} address={address} />
        )}
      </div>

      {/* 🗺 Extra UI like gas price, eth price, faucet, and support: */}
      <div style={{ position: "fixed", textAlign: "left", left: 0, bottom: 20, padding: 10 }}>
        <Row align="middle" gutter={[4, 4]}>
          <Col span={8}>
            <Ramp price={price} address={address} networks={NETWORKS} />
          </Col>

          <Col span={8} style={{ textAlign: "center", opacity: 0.8 }}>
            <GasGauge gasPrice={gasPrice} />
          </Col>
          <Col span={8} style={{ textAlign: "center", opacity: 1 }}>
            <Button
              onClick={() => {
                window.open("https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA");
              }}
              size="large"
              shape="round"
            >
              <span style={{ marginRight: 8 }} role="img" aria-label="support">
                💬
              </span>
              Support
            </Button>
          </Col>
        </Row>

        <Row align="middle" gutter={[4, 4]}>
          <Col span={24}>
            {
              /*  if the local provider has a signer, let's show the faucet:  */
              faucetAvailable ? (
                <Faucet localProvider={localProvider} price={price} ensProvider={mainnetProvider} />
              ) : (
                ""
              )
            }
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
