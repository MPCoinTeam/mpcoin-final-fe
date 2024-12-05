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

export interface Chain {
  chain_id: string;
  explorer_url: string;
  id: string;
  name: string;
  native_currency: string;
  rpc_url: string;
}

export interface TokenResponse {
  chain_id: string;
  contract_address: string;
  decimals: number;
  id: string;
  logo_url: string;
  name: string;
  symbol: string;
  type: string;
}
