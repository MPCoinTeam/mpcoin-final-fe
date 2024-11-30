import { chains, getPublicClient } from '@/domain/blockchain/client';
import { Transaction } from '@/domain/interfaces/transaction';
import { useWallet } from '@/domain/usecases/hooks/wallets/useWallet';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { Address, formatEther, formatUnits } from 'viem';

const ITEMS_PER_PAGE = 10;

interface PaginationData {
  offset: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

interface UseTransactionsReturn {
  transactions?: Transaction[];
  pagination?: PaginationData;
  isLoading: boolean;
  fetchNextPage: () => void;
}

async function fetchTransactionReceipts(chainId: number, address: Address, txns: { hash: string; timestamp: string }[]): Promise<Transaction[]> {
  try {
    const client = getPublicClient(chainId);
    const receipts = await Promise.all(
      txns.map((tx) =>
        client.getTransactionReceipt({
          hash: tx.hash.startsWith('0x') ? (tx.hash as Address) : (`0x${tx.hash}` as Address),
        }),
      ),
    );

    return receipts.map((receipt, index) => {
      const tx = txns[index];
      return {
        id: Number(receipt.transactionIndex),
        type: receipt.from.toLowerCase() === address.toLowerCase() ? 'Sent' : 'Received',
        amount: `${formatEther(receipt.effectiveGasPrice * receipt.gasUsed)}`,
        token: 'ETH',
        date: tx.timestamp.split(',')[0],
        status: receipt.status === 'success' ? 'Confirmed' : 'Failed',
        txHash: receipt.transactionHash,
        from: receipt.from,
        to: receipt.to || '',
        gasLimit: receipt.gasUsed.toString(),
        gasPrice: formatUnits(receipt.effectiveGasPrice, 9),
        nonce: receipt.transactionIndex.toString(),
        timestamp: tx.timestamp,
        network: chains[chainId]?.name || 'Unknown',
      };
    });
  } catch (error) {
    console.error('Error fetching transaction receipts:', error);
    return [];
  }
}

export function useTransactions(): UseTransactionsReturn {
  const { wallet, transactions } = useWallet();
  const [page, setPage] = useState(1);

  const isQueryEnabled = useMemo(() => {
    return !!wallet?.chain_id && !!wallet?.wallet_address && Array.isArray(transactions) && transactions.length > 0;
  }, [wallet, transactions]);

  const { data: transactionReceipts = [], isLoading } = useQuery({
    queryKey: ['transactions', wallet?.chain_id, wallet?.wallet_address, transactions],
    queryFn: () => fetchTransactionReceipts(wallet?.chain_id!, wallet?.wallet_address as `0x${string}`, transactions!),
    enabled: isQueryEnabled,
    staleTime: 30_000,
  });

  const fetchNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const paginatedTransactions = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return transactionReceipts.slice(start, start + ITEMS_PER_PAGE);
  }, [transactionReceipts, page]);

  const pagination = useMemo(() => {
    const total = transactionReceipts.length;
    return {
      offset: (page - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
      total,
      hasMore: total > page * ITEMS_PER_PAGE,
    };
  }, [transactionReceipts, page]);

  return {
    transactions: paginatedTransactions,
    pagination,
    isLoading,
    fetchNextPage,
  };
}
