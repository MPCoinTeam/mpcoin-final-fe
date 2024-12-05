import { useAuth } from '@/context/authContext';
import axiosInstance from '@/domain/https/https';
import { ProfileResponse } from '@/domain/interfaces/auth';
import { UserProfile } from '@/domain/interfaces/user';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const fetchProfile = async (): Promise<ProfileResponse> => {
  const {
    data: { payload },
  } = await axiosInstance.get<{ payload: ProfileResponse }>('/users/me');
  return payload;
};

export function useProfile(): {
  isLoading: boolean;
  isError: boolean;
  data: UserProfile | null;
  error: Error | null;
} {
  const { setProfile, logout, profile } = useAuth();

  const query = useQuery<ProfileResponse, Error, ProfileResponse, string[]>({
    queryKey: ['useProfile'],
    queryFn: fetchProfile,
    retry: false,
    enabled: !profile,
    onSuccess: (data: ProfileResponse) => {
      if (data && !profile) {
        setProfile(new UserProfile(data.profile, data.wallet));
      }
    },
    onError: () => {
      logout();
    },
  } as UseQueryOptions<ProfileResponse, Error, ProfileResponse, string[]>);

  return {
    isLoading: query.isFetching,
    isError: query.isError,
    data: profile,
    error: query.error,
  };
}
