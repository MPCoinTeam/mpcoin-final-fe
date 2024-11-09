import axiosInstance from '@/domain/https/https';
import UserInfo from '@/domain/interfaces/user';
import { useQuery } from '@tanstack/react-query';

const fetcProfile = async () => {
  const { data } = await axiosInstance.get('/userinfo');
  return { isAuthenticated: true, profile: new UserInfo(data) };
};

export function useProfile() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['useProfile'],
    queryFn: fetcProfile,
    retry: false,
  });
  console.log(2212, isLoading, isError, data, error);
  return { isLoading, isError, data, error };
}
