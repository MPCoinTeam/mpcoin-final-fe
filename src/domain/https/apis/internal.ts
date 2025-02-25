import { createAxiosInstance } from '../axios';
import { AuthRequest, AuthResponse, CreateTransactionRequest, CreateTransactionResponse, TransactionsResponse } from '@/domain/interfaces/api';
import { Chain, Token } from '@/domain/interfaces/assets';
import { Profile } from '@/domain/interfaces/profile';
import useConfig from '@/domain/usecases/hooks/configs/useConfig';

// Helper function to handle API responses
const handleResponse = async <T>(promise: Promise<any>): Promise<T> => {
  const { data } = await promise;
  return data.payload;
};

// Create Axios instance
const { apiUrl } = useConfig();
console.log('apiUrl', apiUrl);
export const axiosInstance = createAxiosInstance(apiUrl, ['/auth/login', '/auth/register']);

// APIs
export const apis = {
  login: (request: AuthRequest): Promise<AuthResponse> => handleResponse<AuthResponse>(axiosInstance.post('/auth/login', request)),
  signup: (request: AuthRequest): Promise<AuthResponse> => handleResponse<AuthResponse>(axiosInstance.post('/auth/signup', request)),
  getProfile: (): Promise<Profile> => handleResponse<Profile>(axiosInstance.get('/users/me')),
  getChains: (): Promise<Chain[]> => handleResponse<Chain[]>(axiosInstance.get('/assets/chains')),
  getTokens: (chainId: string): Promise<Token[]> => handleResponse<Token[]>(axiosInstance.get(`/assets/chains/${chainId}/tokens`)),
  getTransactions: (walletAddress: string, chainId: number, page: number): Promise<TransactionsResponse> =>
    handleResponse<TransactionsResponse>(
      axiosInstance.get('/transactions', { params: { wallet_address: walletAddress, chain_id: chainId, page, page_size: 10 } }),
    ),
  createTransaction: (request: CreateTransactionRequest): Promise<CreateTransactionResponse> =>
    handleResponse<CreateTransactionResponse>(axiosInstance.post('/transactions/', request)),
};
