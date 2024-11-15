import axiosInstance from '@/domain/https/https';
import { useQuery } from '@tanstack/react-query';

const fetchTokens = async () => {
  const { data: { payload } } = await axiosInstance.get('/balances');
  return { balances: payload };
};

export function useTokens() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['useTokens'],
    queryFn: fetchTokens,
    retry: false,
  });
  console.log(2212, isLoading, isError, data, error);
  return { isLoading, isError, data, error };
}
