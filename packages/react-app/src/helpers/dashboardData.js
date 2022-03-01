import CarbonFYI from '../components/common/CarbonFYI'

export const getFightData = (BTC, CO2, USDPrices) => [
  {
    id: 1,
    srcIcon: '/icon/tree.svg',
    quantity: '20',
    text: 'trees planted',
  },
  {
    id: 2,
    srcIcon: '/icon/co2.svg',
    quantity: ((BTC && BTC > 0 ? BTC : 0) / Math.pow(10, 18) + (CO2 && CO2 > 0 ? CO2 : 0) / Math.pow(10, 18)).toFixed(
      2,
    ),
    text: 'CO2 tons extracted/compensated',
  },
  {
    id: 3,
    srcIcon: '/icon/emoji-money.svg',
    quantity: (
      ((BTC && BTC > 0 ? BTC : 0) / Math.pow(10, 18)) *
        (USDPrices &&
          USDPrices['toucan-protocol-base-carbon-tonne'] &&
          USDPrices['toucan-protocol-base-carbon-tonne'].usd) +
      ((CO2 && CO2 > 0 ? CO2 : 0) / Math.pow(10, 18)) *
        (USDPrices && USDPrices['moss-carbon-credit'] && USDPrices['moss-carbon-credit'].usd)
    ).toFixed(2),
    text: 'USD invested/staked',
    isBold: true,
  },
]

export const getPlightData = (address, CO2, tonsPledged) => [
  {
    id: 1,
    srcIcon: '/icon/co2.svg',
    quantity: address && <CarbonFYI currentAddress={address} />,
    text: 'CO2 tons in transactions',
  },
  {
    id: 2,
    srcIcon: '/icon/emoji-zipper.svg',
    quantity: (CO2 / Math.pow(10, 18)).toFixed(2),
    text: 'CO2 tons dripped',
  },
  {
    id: 3,
    srcIcon: '/icon/emoji-confused.svg',
    quantity: tonsPledged,
    text: 'CO2 tons pledged',
    isBold: true,
  },
]
