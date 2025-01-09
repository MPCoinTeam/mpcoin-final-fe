import { apis } from '@/domain/https/apis/internal';
import { useQuery } from '@tanstack/react-query';

const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function useAssets() {
  // First query to fetch chains - cached indefinitely
  const chainsQuery = useQuery({
    queryKey: ['chains'],
    queryFn: apis.getChains,
    staleTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const chainId = chainsQuery.data?.[0]?.chainId;
  // Second query to fetch tokens - cached for 1 day
  const tokensQuery = useQuery({
    queryKey: ['tokens', chainId],
    queryFn: () => apis.getTokens(chainId!),
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
