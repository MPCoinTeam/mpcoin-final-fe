import { Wallet } from '@/domain/interfaces/wallet';
import { mockTransactions } from '@/domain/mocks/transactions';
import { useQuery } from '@tanstack/react-query';

async function fetchWallet(): Promise<Wallet> {
  return {
    id: '1',
    user_id: '1',
    wallet_address: '0x9b6bE46ed05EE77a22928ba88cA46d9FFf09e3f8',
    chain_id: 11155111,
  };
}

async function fetchTransactions(): Promise<{ hash: string; timestamp: string }[]> {
  return mockTransactions;
}

export function useWallet() {
  const wallet = useQuery({
    queryKey: ['wallet'],
    queryFn: fetchWallet,
  });

  const transactions = useQuery({
    queryKey: ['wallet-transactions', wallet.data?.id],
    queryFn: fetchTransactions,
    enabled: !!wallet.data?.id,
  });

  return {
    isLoading: wallet.isLoading || transactions.isLoading,
    isError: wallet.isError || transactions.isError,
    error: wallet.error || transactions.error,
    wallet: wallet.data,
    transactions: transactions.data,
  };
}
