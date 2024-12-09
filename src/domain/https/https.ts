import { AuthRequest, TransactionsResponse } from '../interfaces/api';
import { AuthResponse } from '../interfaces/api';
import { Token } from '../interfaces/assets';
import { Profile } from '../interfaces/profile';
import useConfig from '@/domain/usecases/hooks/configs/useConfig';
import { toCamelCase } from '@/utils/transformer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Chain } from 'viem';

// Function to determine if token should be attached to a request
const shouldAttachToken = (url: string): boolean => {
  const publicRoutes = ['/auth/login', '/auth/register']; // Define public routes
  return !publicRoutes.some((route) => url.includes(route));
};

// Configure Axios Instance
const configureAxiosInstance = () => {
  const { apiUrl } = useConfig();

  const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    async (config) => {
      // Attach token only if the route requires authentication
      if (shouldAttachToken(config.url || '')) {
        const accessToken = await AsyncStorage.getItem('access_token');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
          console.warn('No access token found, proceeding without Authorization header.');
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // Transform response data to camelCase
      if (response.data) {
        response.data = toCamelCase(response.data);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  return axiosInstance;
};

const axiosInstance = configureAxiosInstance();

export const apis = {
  login: (request: AuthRequest): Promise<AuthResponse> => axiosInstance.post('/auth/login', request).then((res) => res.data.payload),
  signup: (request: AuthRequest): Promise<AuthResponse> => axiosInstance.post('/auth/register', request).then((res) => res.data.payload),
  getProfile: (): Promise<Profile> => axiosInstance.get('/users/me').then((res) => res.data.payload),
  getChains: (): Promise<Chain[]> => axiosInstance.get('/chains').then((res) => res.data.payload),
  getTokens: (chainId: string): Promise<Token[]> => axiosInstance.get(`/chains/${chainId}/tokens`).then((res) => res.data.payload),
  getTransactions: (chainId: number, page: number): Promise<TransactionsResponse> =>
    axiosInstance.get('/transactions', { params: { chain_id: chainId, page, page_size: 10 } }).then((res) => res.data.payload),
};

export default axiosInstance;
