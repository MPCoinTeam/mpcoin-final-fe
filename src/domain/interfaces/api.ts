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
}

export interface CreateTransactionRequest {
  wallet_id: string;
  token_id: string;
  to: string;
  amount: string;
}
export interface CreateTransactionResponse {
  id: string;
  walletId: string;
  chainId: string;
  tokenId: string;
  txHash: string;
  createdAt: string;
  updatedAt: string;
}
