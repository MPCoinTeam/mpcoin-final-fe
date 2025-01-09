import { createAxiosInstance } from '../axios';
import useConfig from '@/domain/usecases/hooks/configs/useConfig';

interface PriceResponse {
  symbol: string;
  price: string;
}

type BinanceKline = [
  number, // timestamp: Open time of the Kline
  string, // open: Open price
  string, // high: Highest price
  string, // low: Lowest price
  string, // close: Close price
  string, // volume: Total traded volume
  number, // closeTimestamp: Close time of the Kline
  string, // quoteAssetVolume: Quote asset volume
  number, // numberOfTrades: Number of trades
  string, // takerBuyBaseAssetVolume: Taker buy base asset volume
  string, // takerBuyQuoteAssetVolume: Taker buy quote asset volume
  string, // ignore: Unused value
];

type BinanceKlineResponse = BinanceKline[];

// Helper function to handle API responses
const handleResponse = async <T>(promise: Promise<any>): Promise<T> => {
  const { data } = await promise;
  return data;
};

// Create Axios instance
const { binanceApiUrl } = useConfig();
const axiosInstance = createAxiosInstance(binanceApiUrl, []);

// Binance APIs
export const apis = {
  getCurrentPrice: (symbol: string): Promise<PriceResponse> =>
    handleResponse(axiosInstance.get('/ticker/price', { params: { symbol: `${symbol}USDT` } })),

  getKlines: (symbol: string): Promise<BinanceKlineResponse> =>
    handleResponse(
      axiosInstance.get('/klines', {
        params: {
          symbol: `${symbol}USDT`,
          interval: '1d',
          limit: 2,
        },
      }),
    ),
};
