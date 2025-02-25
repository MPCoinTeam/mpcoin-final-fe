import { User } from './user';
import { Wallet } from './wallet';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  wallet: Wallet;
  accessToken: string;
  refreshToken: string;
  shareData: string;
}

export interface CreateTransactionRequest {
  from_address: string;
  to_address: string;
  chain_id: number;
  symbol: string;
  amount: string;
  share_data: string;
}
export interface CreateTransactionResponse {
  id: string;
  chainId: number;
  fromAddress: string;
  toAddress: string;
  txHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionsResponse {
  transactions: { txHash: string; updatedAt: string }[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
