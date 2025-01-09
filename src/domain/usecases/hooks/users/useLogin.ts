import { useAuth } from '@/context/authContext';
import { apis } from '@/domain/https/apis/internal';
import { AuthRequest, AuthResponse } from '@/domain/interfaces/api';
import { Profile } from '@/domain/interfaces/profile';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export function useLogin() {
  const { login, setProfile } = useAuth();

  const mutation = useMutation<AuthResponse, Error, AuthRequest>({
    mutationFn: apis.login,
    onSuccess: (data) => {
      const profile: Profile = {
        user: data.user,
        wallet: data.wallet,
      };
      setProfile(profile);
      login(data.accessToken, data.refreshToken);
    },
    retry: false,
    cacheTime: 0,
  } as UseMutationOptions<AuthResponse, Error, AuthRequest>);

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
