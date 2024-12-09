import { useAuth } from '@/context/authContext';
import { useViem } from '@/context/viemContext';
import { apis } from '@/domain/https/https';
import { Transaction } from '@/domain/interfaces/transaction';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { Address } from 'viem';

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
  error?: Error;
  fetchNextPage: () => void;
}

export function useTransactions(): UseTransactionsReturn {
  const [page, setPage] = useState(1);
  const { profile } = useAuth();
  const { fetchTransactionReceipts, currentChain } = useViem();

  const isQueryEnabled = useMemo(() => {
    return Boolean(profile?.wallet?.address && currentChain?.id);
  }, [profile, currentChain]);

  const {
    data: txnResponse,
    isLoading: isLoadingTxns,
    error: txnError,
  } = useQuery({
    queryKey: ['transactions', currentChain?.id, page],
    queryFn: () => apis.getTransactions(currentChain.id, page),
    enabled: isQueryEnabled,
  });

  const {
    data: transactionReceipts,
    isLoading: isLoadingReceipts,
    error: receiptsError,
  } = useQuery({
    queryKey: ['transactionReceipts', currentChain?.id, profile?.wallet?.address, txnResponse?.transactions],
    queryFn: () =>
      fetchTransactionReceipts(
        currentChain.id,
        profile!.wallet.address as Address,
        txnResponse?.transactions.map((tx) => ({ hash: tx.txHash, timestamp: tx.updatedAt })) ?? [],
      ),
    enabled: isQueryEnabled && !!txnResponse?.transactions?.length,
    staleTime: 30_000,
  });

  const fetchNextPage = useCallback(() => {
    if (txnResponse && page < txnResponse.totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [txnResponse, page]);

  const pagination = useMemo(() => {
    if (!txnResponse) return undefined;

    return {
      offset: (page - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
      total: txnResponse.total,
      hasMore: page < txnResponse.totalPages,
    };
  }, [txnResponse, page]);

  return {
    transactions: transactionReceipts || [],
    pagination,
    isLoading: isLoadingTxns || isLoadingReceipts,
    error: txnError || receiptsError || undefined,
    fetchNextPage,
  };
}
