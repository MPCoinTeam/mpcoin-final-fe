import { BaseToken } from '@/domain/interfaces/token';

export const defaltTokens = [
  {
    token_id: 'token_id1',
    token_name: 'ETH',
    price: 2345.67,
    balance: 2.73,
    totalValue: 6413.63,
    inflationRate: -4.37,
  },
  {
    token_id: 'token_id2',
    token_name: 'USDC',
    price: 1.0,
    balance: 0,
    totalValue: 0,
    inflationRate: -0.0,
  },
];

export const TOKENS: BaseToken[] = [
  {
    address: '0x0000000000000000000000000000000000000000',
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  },
  {
    address: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
    symbol: 'LINK',
    name: 'Chainlink',
    decimals: 18,
    logoURI: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
  },
];
