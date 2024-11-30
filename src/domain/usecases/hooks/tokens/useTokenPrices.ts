import { REFRESH_INTERVAL } from '@/common/constants/Environments';
import { TOKENS } from '@/common/constants/Tokens';
import { binanceApi } from '@/domain/https/binance';
import { TokenPrice } from '@/types/token';
import { useQuery } from '@tanstack/react-query';

/** Fetch token price data from Binance API */
async function fetchTokenPrice(symbol: string): Promise<TokenPrice> {
  try {
    // Concurrently fetch current price and historical kline data
    const [currentData, klineData] = await Promise.all([binanceApi.getCurrentPrice(symbol), binanceApi.getKlines(symbol)]);

    const currentPrice = parseFloat(currentData.data.price ?? '0');
    const yesterdayPrice = parseFloat(klineData.data[0]?.[4] ?? '0');

    if (!currentPrice || !yesterdayPrice) throw new Error('Invalid price data');

    // Calculate inflation rate
    const inflationRate = ((currentPrice - yesterdayPrice) / yesterdayPrice) * 100;

    return {
      currentPrice,
      inflationRate: parseFloat(inflationRate.toFixed(2)),
    };
  } catch (error) {
    console.warn(`Error fetching price data for ${symbol}:`, error);
    return { currentPrice: 0, inflationRate: 0 };
  }
}

/** Hook: Fetch and cache token prices */
export function useTokenPrices() {
  return useQuery({
    queryKey: ['tokenPrices'],
    queryFn: async (): Promise<Record<string, TokenPrice>> => {
      // Fetch price data for all tokens concurrently
      const results = await Promise.allSettled(TOKENS.map((token) => fetchTokenPrice(token.symbol)));

      // Construct price record with safe fallback for failed requests
      return TOKENS.reduce(
        (acc, token, index) => {
          const result = results[index];
          acc[token.symbol] = result.status === 'fulfilled' ? result.value : { currentPrice: 0, inflationRate: 0 }; // Default value on error
          return acc;
        },
        {} as Record<string, TokenPrice>,
      );
    },
    staleTime: REFRESH_INTERVAL,
    refetchInterval: REFRESH_INTERVAL,
  });
}
