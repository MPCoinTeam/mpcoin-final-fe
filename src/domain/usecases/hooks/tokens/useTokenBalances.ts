import { useWallet } from '../wallets/useWallet';
import { useTokenPrices } from './useTokenPrices';
import { REFRESH_INTERVAL } from '@/common/constants/Environments';
import { TOKENS } from '@/common/constants/Tokens';
import { erc20Abi } from '@/common/constants/abis/erc20';
import { getPublicClient } from '@/domain/blockchain/client';
import { TokenBalance } from '@/types/token';
import { useQuery } from '@tanstack/react-query';
import { Address, formatUnits } from 'viem';

async function fetchTokenBalance(
  chainId: number,
  walletAddress: Address,
  token: (typeof TOKENS)[number],
): Promise<{ token: (typeof TOKENS)[number]; balance: string }> {
  try {
    const client = getPublicClient(chainId);

    const rawBalance =
      token.symbol === 'ETH'
        ? await client.getBalance({ address: walletAddress })
        : await client.readContract({
            address: token.address as Address,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [walletAddress],
          });

    const formattedBalance = formatUnits(rawBalance as bigint, token.decimals);
    return { token, balance: formattedBalance };
  } catch (error) {
    console.warn(`Error fetching balance for ${token.symbol}:`, error);
    return { token, balance: '0' };
  }
}

export function useTokenBalances() {
  const { wallet } = useWallet();
  const { data: tokenPrices } = useTokenPrices();

  const walletAddress = wallet?.wallet_address as Address;
  const chainId = wallet?.chain_id;

  const isQueryEnabled = Boolean(walletAddress && chainId && tokenPrices);

  return useQuery({
    queryKey: ['tokenBalances', walletAddress],
    queryFn: async (): Promise<TokenBalance[]> => {
      if (!isQueryEnabled) return [];

      // Fetch balances concurrently
      const results = await Promise.allSettled(TOKENS.map((token) => fetchTokenBalance(chainId!, walletAddress!, token)));

      // Process results and calculate balance in USD
      return results
        .filter((result): result is PromiseFulfilledResult<{ token: (typeof TOKENS)[number]; balance: string }> => result.status === 'fulfilled')
        .map(({ value }) => {
          const { token, balance } = value;
          const priceData = tokenPrices![token.symbol] ?? { currentPrice: 0, inflationRate: 0 };
          const balanceNumber = parseFloat(balance);

          return {
            ...token,
            balance,
            price: priceData.currentPrice,
            inflationRate: priceData.inflationRate,
            balanceInUSD: (balanceNumber * priceData.currentPrice).toFixed(2),
          };
        });
    },
    enabled: isQueryEnabled,
    staleTime: REFRESH_INTERVAL,
    refetchInterval: REFRESH_INTERVAL,
  });
}
