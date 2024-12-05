import { BaseToken } from '@/domain/interfaces/assets';
import { Chain, sepolia } from 'viem/chains';

export const DEFAULT_CHAIN_ID = sepolia.id;

export const CHAINS: Chain[] = [sepolia];

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
