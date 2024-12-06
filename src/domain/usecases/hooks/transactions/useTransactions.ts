import { useProfile } from '../users/useProfile';
import { useViem } from '@/context/viemContext';
import axiosInstance from '@/domain/https/https';
import { Transaction } from '@/domain/interfaces/transaction';
import { mockTransactions } from '@/domain/mocks/transactions';
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
  fetchNextPage: () => void;
}

interface TransactionsResponse {
  transactions: { hash: string; timestamp: string }[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

const fetchTransactions = async (chainId: number, page: number): Promise<TransactionsResponse> => {
  // const {
  //   data: { payload },
  // } = await axiosInstance.get(`/transactions?chain_id=${chainId}&page=${page}&page_size=${ITEMS_PER_PAGE}`);
  // return payload;
  return {
    transactions: mockTransactions,
    page,
    page_size: ITEMS_PER_PAGE,
    total: 0,
    total_pages: 0,
  };
};

export function useTransactions(): UseTransactionsReturn {
  const [page, setPage] = useState(1);
  const { data: profile } = useProfile();
  const { fetchTransactionReceipts, currentChain } = useViem();

  const isQueryEnabled = useMemo(() => {
    return Boolean(profile?.wallet?.address && currentChain.id);
  }, [profile, currentChain]);

  const { data: txnResponse, isLoading: isLoadingTxns } = useQuery({
    queryKey: ['transactions', currentChain.id, page],
    queryFn: () => fetchTransactions(currentChain.id, page),
    enabled: isQueryEnabled,
  });

  const { data: transactionReceipts, isLoading: isLoadingReceipts } = useQuery({
    queryKey: ['transactionReceipts', currentChain.id, profile?.wallet?.address, txnResponse?.transactions],
    queryFn: () =>
      fetchTransactionReceipts(
        currentChain.id,
        profile!.wallet.address as Address,
        txnResponse?.transactions.map((tx) => ({ hash: tx.hash, timestamp: tx.timestamp })) ?? [],
      ),
    enabled: isQueryEnabled && !!txnResponse?.transactions?.length,
    staleTime: 30_000,
  });

  const fetchNextPage = useCallback(() => {
    if (txnResponse && page < txnResponse.total_pages) {
      setPage((prev) => prev + 1);
    }
  }, [txnResponse, page]);

  const pagination = useMemo(() => {
    if (!txnResponse) return undefined;

    return {
      offset: (page - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
      total: txnResponse.total,
      hasMore: page < txnResponse.total_pages,
    };
  }, [txnResponse, page]);

  return {
    transactions: transactionReceipts,
    pagination,
    isLoading: isLoadingTxns || isLoadingReceipts,
    fetchNextPage,
  };
}
