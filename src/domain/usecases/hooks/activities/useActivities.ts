import { NODE_ENV_DEFAULT } from '@/common/constants/Environments';
import useConfig from '@/domain/usecases/hooks/configs/useConfig';
import { TransactionStatus } from '@/types/transaction';
import { useCallback, useState } from 'react';

export interface Activity {
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

interface PaginationData {
  offset: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

interface UseActivitiesReturn {
  activities?: Activity[];
  pagination?: PaginationData;
  isLoading: boolean;
  fetchNextPage: () => void;
}

export function useActivities(): UseActivitiesReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchNextPage = useCallback(() => {
    setIsLoading(true);
    // Implement your pagination logic here
    setPage((prev) => prev + 1);
    setIsLoading(false);
  }, []);

  return {
    activities: [
      {
        id: 1,
        type: 'Sent',
        amount: '0.022102518168627793 ETH',
        token: 'ETH',
        date: '2024-04-10',
        status: 'Confirmed',
        txHash: '0xd05b2407cebbed9e83c9f9f2d14cfba589f9606a665b1014b77cbc408ca7c1fc',
        from: '0x13CB6AE34A13a0977F4d7101eBc24B87Bb23F0d5',
        to: '0x13CB6AE34A13a0977F4d7101eBc24B87Bb23F0d5',
        gasLimit: '21181',
        gasPrice: '4.951320776',
        nonce: '393',
        timestamp: '4/10/2024, 07:36:19',
        network: 'Sepolia',
      },
    ],
    pagination: {
      offset: 0,
      limit: 10,
      total: 0,
      hasMore: true,
    },
    isLoading,
    fetchNextPage,
  };
}
