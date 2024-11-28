import { NODE_ENV_DEFAULT } from '@/common/constants/Environments';

const useConfig = () => ({
  nodeEnv: process.env.NODE_ENV || NODE_ENV_DEFAULT,
  apiUrl: process.env.API_URL || 'http://localhost:8080/api/v1',
});

export default useConfig;
