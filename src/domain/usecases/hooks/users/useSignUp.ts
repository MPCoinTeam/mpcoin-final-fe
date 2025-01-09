import { useAuth } from '@/context/authContext';
import { apis } from '@/domain/https/apis/internal';
import { AuthRequest, AuthResponse } from '@/domain/interfaces/api';
import { Profile } from '@/domain/interfaces/profile';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export function useSignup() {
  const { login, setProfile } = useAuth();

  const mutation = useMutation<AuthResponse, Error, AuthRequest>({
    mutationFn: apis.signup,
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
    signup: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
