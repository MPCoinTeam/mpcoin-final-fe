import axiosInstance from '@/domain/https/https';
import { BaseToken, Chain, TokenResponse } from '@/domain/interfaces/assets';
import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';

async function fetchChains(): Promise<Chain[]> {
  const {
    data: { payload },
  } = await axiosInstance.get('/assets/chains');
  return payload;
}

async function fetchChainsTokens(chainId: string): Promise<BaseToken[]> {
  const {
    data: { payload },
  } = await axiosInstance.get<{ payload: TokenResponse[] }>(`/assets/chains/${chainId}/tokens`);
  return payload.map((token: TokenResponse) => ({
    address: token.contract_address as Address,
    symbol: token.symbol,
    name: token.name,
    decimals: token.decimals,
    logoURI: token.logo_url,
  }));
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

  // Second query to fetch tokens - cached for 1 day
  const tokensQuery = useQuery({
    queryKey: ['tokens', chainsQuery.data?.[0]?.chain_id],
    queryFn: () => fetchChainsTokens(chainsQuery.data![0].chain_id),
    enabled: !!chainsQuery.data?.[0]?.chain_id,
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
