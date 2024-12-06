import { TransactionStatus, TransactionType } from '@/types/transaction';
import { Address } from 'viem';

export interface Transaction {
  id: number;
  type: TransactionType;
  amount: string;
  token: string;
  date: string;
  status: TransactionStatus;
  txHash: string;
  from: Address;
  to: Address;
  gasLimit: string;
  gasPrice: string;
  nonce: string;
  timestamp: string;
  network: string;
}
