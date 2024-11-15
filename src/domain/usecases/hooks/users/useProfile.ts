import axiosInstance from '@/domain/https/https';
import UserInfo from '@/domain/interfaces/user';
import { useQuery } from '@tanstack/react-query';

const fetcProfile = async () => {
  const { data: { payload } } = await axiosInstance.get('/users/profile');
  return { isAuthenticated: true, profile: new UserInfo(payload) };
};

export function useProfile() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['useProfile'],
    queryFn: fetcProfile,
    retry: false,
  });
  return { isLoading, isError, data, error };
}
