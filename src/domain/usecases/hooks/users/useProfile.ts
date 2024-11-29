import { useAuth } from '@/context/authContext';
import axiosInstance from '@/domain/https/https';
import UserInfo from '@/domain/interfaces/user';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const fetchProfile = async () => {
  const {
    data: { payload },
  } = await axiosInstance.get('/users/profile');
  return { isAuthenticated: true, profile: new UserInfo(payload.user) };
};

export function useProfile() {
  const { setProfile, logout } = useAuth();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['useProfile'],
    queryFn: fetchProfile,
    retry: false,
  });

  useEffect(() => {
    if (data?.profile && setProfile) {
      setProfile(data.profile);
    }
  }, [data, setProfile]);

  useEffect(() => {
    if (isError && logout) {
      logout();
    }
  }, [isError, logout]);

  return { isLoading, isError, data, error };
}
