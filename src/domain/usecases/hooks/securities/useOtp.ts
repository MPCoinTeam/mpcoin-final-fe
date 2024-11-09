import axiosInstance from '@/domain/https/https';
import UserInfo from '@/domain/interfaces/user';
import { useQuery } from '@tanstack/react-query';

const fetchOtp = async () => {};

export function useOtp() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['useOtp'],
    queryFn: fetchOtp,
  });
  return { isLoading, isError, data, error };
}
