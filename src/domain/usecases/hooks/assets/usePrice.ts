import { REFRESH_INTERVAL } from '@/common/constants/Environments';
import { useAssetsContext } from '@/context/assetsContext';
import { apis } from '@/domain/https/apis/binance';
import { PriceData, Token, TokenRate } from '@/domain/interfaces/assets';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

async function fetchPriceData(symbol: string): Promise<PriceData> {
  const [currentData, klineData] = await Promise.all([apis.getCurrentPrice(symbol), apis.getKlines(symbol)]);
  return {
    currentPrice: parseFloat(currentData.price ?? '0'),
    yesterdayPrice: parseFloat(klineData[0][4] ?? '0'),
  };
}

function calculateTokenPrice(data: PriceData): TokenRate {
  if (!data.currentPrice || !data.yesterdayPrice) {
    return { currentPrice: 0, inflationRate: 0 };
  }

  const inflationRate = ((data.currentPrice - data.yesterdayPrice) / data.yesterdayPrice) * 100;

  return {
    currentPrice: data.currentPrice,
    inflationRate: parseFloat(inflationRate.toFixed(2)),
  };
}

async function fetchTokenPrices(tokens: Token[]): Promise<Record<string, TokenRate>> {
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
    {} as Record<string, TokenRate>,
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
  } as UseQueryOptions<Record<string, TokenRate>, Error>);
}
