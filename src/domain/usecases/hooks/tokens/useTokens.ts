import axiosInstance from '@/domain/https/https';
import { useQuery } from '@tanstack/react-query';

const fetchTokens = async () => {
  const { data: { payload } } = await axiosInstance.get('/balances/');
  return { balances: payload.balances };
};

export function useTokens() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['useTokens'],
    queryFn: fetchTokens,
    retry: false,
  });
  return { isLoading, isError, data, error };
}
