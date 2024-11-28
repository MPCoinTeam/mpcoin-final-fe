import { useAuth } from '@/context/authContext';
import axiosInstance from '@/domain/https/https';
import UserInfo from '@/domain/interfaces/user';
import { useQuery } from '@tanstack/react-query';

const fetcProfile = async () => {
  const { data: { payload } } = await axiosInstance.get('/users/profile');
  return { isAuthenticated: true, profile: new UserInfo(payload.user) };
};

export function useProfile() {
  const { setProfile, logout } = useAuth();
  const { isLoading, isError, data, isSuccess, error } = useQuery({
    queryKey: ['useProfile'],
    queryFn: fetcProfile,
    retry: false,
  });
  if (isSuccess && setProfile) {
    setProfile(data.profile);
  }
  if (isError && logout) {
    logout();
  }
  return { isLoading, isError, data, error };
}
