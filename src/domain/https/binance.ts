import axios from 'axios';

const binanceInstance = axios.create({
  baseURL: 'https://www.binance.com/api/v3',
  timeout: 10000,
});

export const binanceApi = {
  getCurrentPrice: (symbol: string) =>
    binanceInstance.get('/ticker/price', {
      params: { symbol: `${symbol}USDT` },
    }),

  getKlines: (symbol: string) =>
    binanceInstance.get('/klines', {
      params: {
        symbol: `${symbol}USDT`,
        interval: '1d',
        limit: 2,
      },
    }),
};
