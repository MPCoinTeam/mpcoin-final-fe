export interface Chain {
  id: string;
  chainId: string;
  explorerUrl: string;
  name: string;
  nativeCurrency: string;
  rpcUrl: string;
}

export interface Token {
  id: string;
  chainId: string;
  contractAddress: string;
  decimals: number;
  logoUrl: string;
  name: string;
  symbol: string;
  type: string;
}

export interface TokenPrice extends Token {
  currentPrice: number;
  inflationRate: number;
}

export interface TokenBalance extends TokenPrice {
  balance: string;
  balanceInUSD: string;
}

export interface PriceData {
  currentPrice: number;
  yesterdayPrice: number;
}

export interface TokenRate {
  currentPrice: number;
  inflationRate: number;
}
