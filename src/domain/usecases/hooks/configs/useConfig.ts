import { NODE_ENV_DEFAULT } from '@/common/constants/Environments';

const useConfig = () => ({
  nodeEnv: process.env.NODE_ENV || NODE_ENV_DEFAULT,
  apiUrl: process.env.API_URL || 'http://localhost:5001/api/v1',
  binanceApiUrl: process.env.BINANCE_API_URL || 'https://api.binance.com/api/v3',
});

export default useConfig;
