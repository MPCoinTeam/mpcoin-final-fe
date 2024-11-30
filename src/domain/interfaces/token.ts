import { Address } from 'viem';

// Base token type without balance-related fields
export interface BaseToken {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
}

// Full token type with all fields
export interface Token extends BaseToken {
  balance: string;
  balanceInUSD: string;
  price: number;
  inflationRate: number;
}
