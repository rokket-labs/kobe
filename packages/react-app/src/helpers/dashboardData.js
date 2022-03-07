import CarbonFYI from '../components/common/CarbonFYI'

const { utils } = require('ethers')

// eslint-disable-next-line max-params
export const getFightData = (BTC = 0, CO2 = 0, NCT = 0, trees = 0, USDPrices = 0, isPledged) => [
  {
    id: 1,
    srcIcon: '/icon/tree.svg',
    quantity: !trees ? '0' : trees,
    text: 'trees planted',
  },
  {
    id: 2,
    srcIcon: '/icon/co2.svg',
    quantity: !isPledged
      ? '0.00'
      : (
          (BTC && BTC > 0 ? BTC : 0) / Math.pow(10, 18) +
          (CO2 && CO2 > 0 ? CO2 : 0) / Math.pow(10, 18) +
          (NCT && NCT > 0 ? NCT : 0) / Math.pow(10, 18)
        ).toFixed(2),
    text: 'CO2 tons extracted/compensated',
  },
  {
    // TODO: Agregar sKLIMA y KLIMA a esta suma de precios (NCT aún no tiene precio público, queda pendiente)
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
    srcIcon: !isPledged ? '/icon/emoji-zipper.svg' : '/icon/dashing-away.svg',
    quantity: !isPledged ? '0' : (CO2 / Math.pow(10, 18)).toFixed(2),
    text: !isPledged ? 'Start dripping CO2 tokens' : 'CO2e tons dripped',
  },
  {
    id: 3,
    srcIcon: !isPledged ? '/icon/emoji-zipper.svg' : '/icon/pledge.svg',
    quantity: !isPledged ? '' : utils.formatUnits(tonsPledged, 9),
    text: !isPledged ? 'Take the pledge to own your share of the problem.' : 'CO2e tons/year Pledged ',
    isBold: true,
  },
]
