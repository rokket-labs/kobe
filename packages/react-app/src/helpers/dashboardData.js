import CarbonFYI from '../components/common/CarbonFYI'

// eslint-disable-next-line max-params
export const getFightData = (BTC = 0, CO2 = 0, trees = 0, USDPrices = 0, isPledged, totalBalance) => [
  {
    id: 1,
    srcIcon: '/icon/tree.svg',
    quantity: !trees ? '0' : trees,
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
    quantity: totalBalance.toString(),
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
    quantity: tonsPledged > 0 ? (CO2 / Math.pow(10, 18)).toFixed(2) : '',
    text: tonsPledged > 0 ? 'CO2 tons dripped' : 'Start dripping CO2 tokens',
  },
  {
    id: 3,
    srcIcon: '/icon/emoji-confused.svg',
    quantity: tonsPledged > 0 ? tonsPledged.toString() : '',
    text: tonsPledged > 0 ? 'CO2 tons isPledged' : 'Take the pledge to own your share of the problem.',
    isBold: true,
  },
]
