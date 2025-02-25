import { useTokenPrices } from './usePrice';
import { REFRESH_INTERVAL } from '@/common/constants/Environments';
import { useAssetsContext } from '@/context/assetsContext';
import { useAuth } from '@/context/authContext';
import { useViem } from '@/context/viemContext';
import { Token, TokenBalance, TokenRate } from '@/domain/interfaces/assets';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { Address } from 'viem';

async function fetchBalances(
  chainId: number,
  walletAddress: Address,
  tokens: Token[],
  fetchTokenBalance: Function,
  tokenPrices: Record<string, TokenRate>,
): Promise<TokenBalance[]> {
  const results = await Promise.allSettled(tokens.map((token) => fetchTokenBalance(chainId, walletAddress, token)));

  return results
    .filter((result): result is PromiseFulfilledResult<{ token: Token; balance: string }> => result.status === 'fulfilled')
    .map(({ value }) => {
      const { token, balance } = value;
      const priceData = tokenPrices[token.symbol] ?? { currentPrice: 0, inflationRate: 0 };
      const balanceNumber = parseFloat(balance);

      return {
        ...token,
        balance,
        currentPrice: priceData.currentPrice,
        inflationRate: priceData.inflationRate,
        balanceInUSD: (balanceNumber * priceData.currentPrice).toFixed(2),
      };
    });
}

export function useBalance() {
  const { tokens } = useAssetsContext();
  const { fetchTokenBalance, currentChain } = useViem();
  const { profile } = useAuth();
  const { data: tokenPrices } = useTokenPrices();

  const chainId = currentChain.id;
  const walletAddress = profile?.wallet?.address as Address;

  const query = useQuery({
    queryKey: ['tokenBalances', walletAddress],
    queryFn: () => fetchBalances(chainId!, walletAddress!, tokens, fetchTokenBalance, tokenPrices!),
    enabled: Boolean(walletAddress && chainId && tokenPrices),
    staleTime: REFRESH_INTERVAL,
    refetchInterval: false,
  } as UseQueryOptions<TokenBalance[], Error>);

  return {
    data: query.data ?? [],
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
  };
}
