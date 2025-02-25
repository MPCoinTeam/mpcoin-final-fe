import { useAuth } from '@/context/authContext';
import { useViem } from '@/context/viemContext';
import { apis } from '@/domain/https/apis/internal';
import { Transaction } from '@/domain/interfaces/transaction';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
  refetchTransactions: () => void;
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
    refetch: refetchTxns,
  } = useQuery({
    queryKey: ['transactions', profile?.wallet?.address ?? '', currentChain?.id?.toString() ?? '', page],
    queryFn: () => apis.getTransactions(profile?.wallet?.address ?? '', currentChain?.id ?? '', page),
    enabled: isQueryEnabled,
    staleTime: 30_000,
  });

  const {
    data: transactionReceipts,
    isLoading: isLoadingReceipts,
    error: receiptsError,
    refetch: refetchReceipts,
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
    // refetchOnMount: true, // <-- Thêm cái này
    // refetchOnWindowFocus: true, // <-- Thêm cái này
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

  const queryClient = useQueryClient(); // <-- Lấy queryClient

  const refetchTransactions = useCallback(async () => {
    try {
      await refetchTxns();
      await refetchReceipts();
      console.log('Transactions and receipts successfully refetched!');
    } catch (error) {
      console.error('Failed to refetch transactions:', error);
    }
  }, [queryClient, profile, currentChain, page]);

  return {
    transactions: transactionReceipts || [],
    pagination,
    isLoading: isLoadingTxns || isLoadingReceipts,
    error: txnError || receiptsError || undefined,
    fetchNextPage,
    refetchTransactions,
  };
}
