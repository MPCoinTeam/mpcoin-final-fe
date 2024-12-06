import axiosInstance from '@/domain/https/https';
import { Chain, Token } from '@/domain/interfaces/assets';
import { useQuery } from '@tanstack/react-query';

async function fetchChains(): Promise<Chain[]> {
  const {
    data: { payload },
  } = await axiosInstance.get('/assets/chains');
  return payload;
}

async function fetchChainsTokens(chainId: string): Promise<Token[]> {
  const {
    data: { payload },
  } = await axiosInstance.get<{ payload: Token[] }>(`/assets/chains/${chainId}/tokens`);
  return payload;
}

const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function useAssets() {
  // First query to fetch chains - cached indefinitely
  const chainsQuery = useQuery({
    queryKey: ['chains'],
    queryFn: fetchChains,
    staleTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const chainId = chainsQuery.data?.[0]?.chainId;
  // Second query to fetch tokens - cached for 1 day
  const tokensQuery = useQuery({
    queryKey: ['tokens', chainId],
    queryFn: () => fetchChainsTokens(chainId!),
    enabled: !!chainId,
    staleTime: ONE_DAY,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    chains: chainsQuery.data ?? [],
    tokens: tokensQuery.data ?? [],
    isLoading: chainsQuery.isLoading || tokensQuery.isLoading,
    isError: chainsQuery.isError || tokensQuery.isError,
    error: chainsQuery.error || tokensQuery.error,
  };
}
