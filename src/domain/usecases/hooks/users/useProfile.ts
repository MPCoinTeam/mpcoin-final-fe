import { useAuth } from '@/context/authContext';
import axiosInstance from '@/domain/https/https';
import { Profile } from '@/domain/interfaces/profile';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const fetchProfile = async (): Promise<Profile> => {
  const {
    data: { payload },
  } = await axiosInstance.get('/users/me');
  return payload;
};

export function useProfile(): {
  isLoading: boolean;
  isError: boolean;
  data: Profile | null;
  error: Error | null;
} {
  const { setProfile, logout, profile } = useAuth();

  const query = useQuery<Profile, Error, Profile, string[]>({
    queryKey: ['useProfile'],
    queryFn: fetchProfile,
    retry: false,
    enabled: !profile,
    onSuccess: (data: Profile) => {
      if (data && !profile) {
        setProfile(data);
      }
    },
    onError: () => {
      logout();
    },
  } as UseQueryOptions<Profile, Error, Profile, string[]>);

  return {
    isLoading: query.isFetching,
    isError: query.isError,
    data: profile,
    error: query.error,
  };
}
