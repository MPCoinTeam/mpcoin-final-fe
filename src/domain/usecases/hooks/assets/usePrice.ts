import { REFRESH_INTERVAL } from '@/common/constants/Environments';
import { useAssetsContext } from '@/context/assetsContext';
import { apis } from '@/domain/https/apis/binance';
import { PriceData, Token, TokenRate } from '@/domain/interfaces/assets';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const klineCache: Record<string, { price: number; timestamp: number }> = {};

async function fetchPriceData(symbol: string): Promise<PriceData> {
  const [currentData] = await Promise.all([
    apis.getCurrentPrice(symbol), // Luôn lấy giá mới nhất
  ]);

  let yesterdayPrice = klineCache[symbol]?.price;
  const now = Date.now();

  if (!yesterdayPrice || now - klineCache[symbol].timestamp > 60 * 60 * 1000) {
    try {
      const klineData = await apis.getKlines(symbol);
      yesterdayPrice = parseFloat(klineData[0][4] ?? '0');
      klineCache[symbol] = { price: yesterdayPrice, timestamp: now }; // Lưu vào cache
    } catch (error) {
      console.warn(`Error fetching kline for ${symbol}:`, error);
    }
  }

  return {
    currentPrice: parseFloat(currentData.price ?? '0'),
    yesterdayPrice: yesterdayPrice ?? 0,
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
    tokens.map(async (token, index) => {
      if (token.symbol === 'USDT') {
        return { currentPrice: 1, inflationRate: 0 };
      }

      // Delay nhỏ giữa các request để tránh spam API (ví dụ: 100ms mỗi request)
      await new Promise((resolve) => setTimeout(resolve, index * 100));

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
    queryKey: ['tokenPrices', tokens.map((t) => t.symbol).join(',')],
    queryFn: () => fetchTokenPrices(tokens),
    staleTime: REFRESH_INTERVAL * 2, // Giữ dữ liệu lâu hơn
    refetchInterval: REFRESH_INTERVAL * 3, // Giảm số lần gọi API
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  } as UseQueryOptions<Record<string, TokenRate>, Error>);
}
