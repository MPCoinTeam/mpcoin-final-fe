import { TOKENS } from '@/common/constants/Tokens';

// Types
export type TokenPrice = {
  currentPrice: number;
  inflationRate: number;
};

export type TokenBalance = (typeof TOKENS)[number] & {
  balance: string;
  price: number;
  inflationRate: number;
  balanceInUSD: string;
};
