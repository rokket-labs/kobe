import CarbonFYI from '../components/common/CarbonFYI'

const { utils } = require('ethers')

// eslint-disable-next-line max-params
export const getFightData = (BTC = 0, CO2 = 0, trees = 0, USDPrices = 0, isPledged) => [
  {
    id: 1,
    srcIcon: '/icon/tree.svg',
    quantity: !isPledged ? '0' : trees,
    text: 'trees planted',
  },
  {
    id: 2,
    srcIcon: '/icon/co2.svg',
    quantity: !isPledged
      ? '0.00'
      : ((BTC && BTC > 0 ? BTC : 0) / Math.pow(10, 18) + (CO2 && CO2 > 0 ? CO2 : 0) / Math.pow(10, 18)).toFixed(2),
    text: 'CO2 tons extracted/compensated',
  },
  {
    id: 3,
    srcIcon: '/icon/emoji-money.svg',
    quantity: !isPledged
      ? '0.00'
      : (
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

// eslint-disable-next-line max-params
export const getPlightData = (address, CO2 = 0, tonsPledged = 0, isPledged) => [
  {
    id: 1,
    srcIcon: '/icon/co2.svg',
    quantity: !isPledged ? '0.00' : address && <CarbonFYI currentAddress={address} />,
    text: 'CO2 tons in transactions',
  },
  {
    id: 2,
    srcIcon: '/icon/emoji-zipper.svg',
    quantity: !isPledged ? '' : (CO2 / Math.pow(10, 18)).toFixed(2),
    text: !isPledged ? 'Start dripping CO2 tokens' : 'CO2 tons dripped',
  },
  {
    id: 3,
    srcIcon: '/icon/emoji-confused.svg',
    quantity: !isPledged ? '' : utils.formatUnits(tonsPledged, 18),
    text: !isPledged ? 'Take the pledge to own your share of the problem.' : 'CO2 tons isPledged',
    isBold: true,
  },
]
