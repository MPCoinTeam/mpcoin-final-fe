import { useProfile } from '../users/useProfile';
import { useTokenPrices } from './usePrice';
import { REFRESH_INTERVAL } from '@/common/constants/Environments';
import { useAssetsContext } from '@/context/assetsContext';
import { useViem } from '@/context/viemContext';
import { BaseToken } from '@/domain/interfaces/assets';
import { TokenBalance } from '@/types/token';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { Address } from 'viem';

async function fetchBalances(
  chainId: number,
  walletAddress: Address,
  tokens: BaseToken[],
  fetchTokenBalance: Function,
  tokenPrices: Record<string, { currentPrice: number; inflationRate: number }>,
): Promise<TokenBalance[]> {
  const results = await Promise.allSettled(tokens.map((token) => fetchTokenBalance(chainId, walletAddress, token)));

  return results
    .filter((result): result is PromiseFulfilledResult<{ token: BaseToken; balance: string }> => result.status === 'fulfilled')
    .map(({ value }) => {
      const { token, balance } = value;
      const priceData = tokenPrices[token.symbol] ?? { currentPrice: 0, inflationRate: 0 };
      const balanceNumber = parseFloat(balance);

      return {
        ...token,
        balance,
        price: priceData.currentPrice,
        inflationRate: priceData.inflationRate,
        balanceInUSD: (balanceNumber * priceData.currentPrice).toFixed(2),
      };
    });
}

export function useBalance() {
  const { tokens } = useAssetsContext();
  const { fetchTokenBalance } = useViem();
  const { data: profile } = useProfile();
  const { data: tokenPrices } = useTokenPrices();

  const walletAddress = profile?.getWallet()?.getAddress() as Address;
  const chainId = profile?.getWallet()?.getChainId();

  const query = useQuery({
    queryKey: ['tokenBalances', walletAddress],
    queryFn: () => fetchBalances(chainId!, walletAddress!, tokens, fetchTokenBalance, tokenPrices!),
    enabled: Boolean(walletAddress && chainId && tokenPrices),
    staleTime: REFRESH_INTERVAL,
    refetchInterval: REFRESH_INTERVAL,
  } as UseQueryOptions<TokenBalance[], Error>);

  return {
    data: query.data ?? [],
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
  };
}
