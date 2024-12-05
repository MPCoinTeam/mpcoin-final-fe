import { TOKENS } from '@/common/constants/Assets';
import { REFRESH_INTERVAL } from '@/common/constants/Environments';
import { useAssetsContext } from '@/context/assetsContext';
import { binanceApi } from '@/domain/https/binance';
import { TokenPrice } from '@/types/token';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

interface PriceData {
  currentPrice: number;
  yesterdayPrice: number;
}

async function fetchPriceData(symbol: string): Promise<PriceData> {
  const [currentData, klineData] = await Promise.all([binanceApi.getCurrentPrice(symbol), binanceApi.getKlines(symbol)]);

  return {
    currentPrice: parseFloat(currentData.data.price ?? '0'),
    yesterdayPrice: parseFloat(klineData.data[0]?.[4] ?? '0'),
  };
}

function calculateTokenPrice(data: PriceData): TokenPrice {
  if (!data.currentPrice || !data.yesterdayPrice) {
    return { currentPrice: 0, inflationRate: 0 };
  }

  const inflationRate = ((data.currentPrice - data.yesterdayPrice) / data.yesterdayPrice) * 100;

  return {
    currentPrice: data.currentPrice,
    inflationRate: parseFloat(inflationRate.toFixed(2)),
  };
}

async function fetchTokenPrices(tokens: typeof TOKENS): Promise<Record<string, TokenPrice>> {
  const results = await Promise.allSettled(
    tokens.map(async (token) => {
      try {
        const priceData = await fetchPriceData(token.symbol);
        return calculateTokenPrice(priceData);
      } catch (error) {
        console.warn(`Error fetching price data for ${token.symbol}:`, error);
        return { currentPrice: 0, inflationRate: 0 };
      }
    }),
  );

  return tokens.reduce(
    (acc, token, index) => {
      acc[token.symbol] = results[index].status === 'fulfilled' ? results[index].value : { currentPrice: 0, inflationRate: 0 };
      return acc;
    },
    {} as Record<string, TokenPrice>,
  );
}

export function useTokenPrices() {
  const { tokens } = useAssetsContext();

  return useQuery({
    queryKey: ['tokenPrices'],
    queryFn: () => fetchTokenPrices(tokens),
    staleTime: REFRESH_INTERVAL,
    refetchInterval: REFRESH_INTERVAL,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  } as UseQueryOptions<Record<string, TokenPrice>, Error>);
}
