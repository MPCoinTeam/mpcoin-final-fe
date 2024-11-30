import { TransactionStatus } from '@/types/transaction';

export interface Transaction {
  id: number;
  type: 'Sent' | 'Received';
  amount: string;
  token: string;
  date: string;
  status: TransactionStatus;
  txHash: string;
  from: string;
  to: string;
  gasLimit: string;
  gasPrice: string;
  nonce: string;
  timestamp: string;
  network: string;
}
